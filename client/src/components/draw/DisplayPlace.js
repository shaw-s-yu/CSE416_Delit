import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { connect } from 'react-redux';
import TOOLS from '../tools/ToolbarTools'

const squirtle = 'https://static.planetminecraft.com/files/resource_media/screenshot/1205/2012-02-06_011135_1377666.jpg'

class DisplayPlace extends React.Component {

    state = {
        scale: 1,
        imgWidth: 0,
        imgHeight: 0,
        width: 0,
        height: 0,
        mouseDown: false,
    }
    scrollbar = React.createRef();

    handleZoomEffect = (e) => {

        e.stopPropagation()
        const { selectedTool } = this.props;
        if (selectedTool !== TOOLS.ZOOM_IN && selectedTool !== TOOLS.ZOOM_OUT) return
        const { scale } = this.state
        const factor = selectedTool === TOOLS.ZOOM_IN ? 1 / 0.8 : selectedTool === TOOLS.ZOOM_OUT ? 0.8 : 1
        const nscale = scale * factor
        this.setState({ scale: nscale })

        let target = document.getElementById('display')
        const rect = target.getBoundingClientRect()
        const { clientX, clientY } = e
        const { left, top } = rect
        const dx = clientX - left
        const dy = clientY - top
        const ndy = dy * factor
        const ndx = dx * factor
        const ddy = ndy - dy
        const ddx = ndx - dx
        target.style.transform = "scale(" + nscale + ")"


        const currX = this.refs.scrollbar.getScrollLeft();
        const currY = this.refs.scrollbar.getScrollTop();

        if (nscale >= 1) {
            console.log(ddx, ddy)
            console.log(this.refs.scrollbar)
            this.refs.scrollbar.scrollLeft(ddx + currX)
            this.refs.scrollbar.scrollTop(ddy + currY)
        }
    }

    getSelectedTools = () => {
        const { selectedTool } = this.props
        return selectedTool === TOOLS.ZOOM_IN ? "display-zoom-in" : selectedTool === TOOLS.ZOOM_OUT ? "display-zoom-out" : ""
    }

    handleToolStart = (e) => {
        const { selectedTool } = this.props
        if (!selectedTool) return

        const { clientX, clientY } = e
        console.log('hi', clientX, clientY)
        this.setState({ mouseDown: true })
    }

    handleToolMove = (e) => {
        const { mouseDown } = this.state
        if (!mouseDown) return

        const { clientX, clientY } = e
        console.log(clientX, clientY)
    }

    handleToolEnd = (e) => {
        const { selectedTool } = this.props
        if (selectedTool === TOOLS.ZOOM_IN || selectedTool === TOOLS.ZOOM_OUT || !selectedTool) return

        const { clientX, clientY } = e
        e.stopPropagation()
        console.log('bye', clientX, clientY)
        this.setState({ mouseDown: false })
    }



    componentDidMount() {
        const { canvas } = this.refs;
        if (!canvas) return
        let img = new Image();
        img.src = squirtle;
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            const { width, height } = this.refs.painter.getBoundingClientRect()
            this.setState({
                imgWidth: img.width,
                imgHeight: img.height,
                width, height
            }, () => {
                this.ctx = canvas.getContext('2d')
                this.ctx.drawImage(img, 0, 0)
            })
        }
        window.onresize = () => {
            const { width, height } = this.refs.painter.getBoundingClientRect()
            this.setState({ width, height })
        }
    }

    render() {
        const { scale, imgWidth, imgHeight, width, height } = this.state;
        const scrollStyle = {
            width: '100%',
            height: '100%',
            backgroundColor: 'lightgray',
            paddingBottom: 6,
        }

        const displayStyle = {
            left: imgWidth ? imgWidth * scale >= width ? 6 : (width - imgWidth * scale) / 2 + 6 : 6,
            top: imgHeight ? imgHeight * scale >= height ? 6 : (height - imgHeight * scale) / 2 + 6 : 6
        }

        return (
            <div className="painter-display" ref='painter'>
                <Scrollbars ref="scrollbar"
                    style={scrollStyle}
                    renderThumbHorizontal={props => <div {...props} className="thumb" />}
                    renderThumbVertical={props => <div {...props} className="thumb" />}
                >

                    <div className={"display " + this.getSelectedTools()} id='display' onClick={this.handleZoomEffect} style={displayStyle}>
                        <canvas className="display-background" ref='canvas' width={imgWidth} height={imgHeight}
                            onMouseDown={this.handleToolStart}
                            onMouseMove={this.handleToolMove}
                            onClick={this.handleToolEnd}
                        >
                            Your Browser Does Not Support Canvas
                        </canvas>
                    </div>

                </ Scrollbars>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    const { selected } = state.toolbar
    return { selectedTool: selected }
};

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPlace)
