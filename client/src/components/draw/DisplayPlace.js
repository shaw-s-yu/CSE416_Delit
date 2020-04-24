import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { connect } from 'react-redux';
import TOOLS from '../tools/ToolbarTools'
import CanvasController from './CanvasController'
import squirtle from '../../img/squirtle.jpg'
import drawTransaction from "./drawTransaction"

class DisplayPlace extends React.Component {

    state = {
        scale: 1,
        imgWidth: 0,
        imgHeight: 0,
        width: 0,
        height: 0,
        mouseDown: false,
        offsetLeft: 0,
        offsetTop: 0
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
            this.refs.scrollbar.scrollLeft(ddx + currX)
            this.refs.scrollbar.scrollTop(ddy + currY)
        }
    }

    getSelectedTools = () => {
        const { selectedTool } = this.props
        if (selectedTool === TOOLS.ZOOM_IN)
            return 'display-zoom-in'
        if (selectedTool === TOOLS.ZOOM_OUT)
            return 'display-zoom-out'
        if (selectedTool === TOOLS.PENCIL)
            return 'display-pencil'
        if (selectedTool === TOOLS.ERASER)
            return 'display-eraser'
        if (selectedTool === TOOLS.FILL)
            return 'display-fill'
        if (selectedTool)
            return 'display-cross-cursor'
        return ''
    }

    handleToolStart = (e) => {
        const { selectedTool, borderThic, fillColor, borderColor } = this.props
        if (!selectedTool) return
        this.painter.initDraw(selectedTool, borderThic, fillColor, borderColor)
        const { clientX, clientY } = e
        const { x, y } = this.handleFixPosition(clientX, clientY)
        this.painter.startDraw(x, y)

        this.setState({ mouseDown: true })
    }

    handleToolMove = (e) => {
        const { mouseDown } = this.state
        if (!mouseDown) return

        const { clientX, clientY } = e
        const { x, y } = this.handleFixPosition(clientX, clientY)
        this.painter.onDraw(x, y)
    }

    handleToolEnd = (e) => {
        const { selectedTool } = this.props
        if (selectedTool === TOOLS.ZOOM_IN || selectedTool === TOOLS.ZOOM_OUT || !selectedTool) return
        e.stopPropagation()

        const { clientX, clientY } = e
        const { x, y } = this.handleFixPosition(clientX, clientY)
        this.painter.endDraw(x, y)
        this.setState({ mouseDown: false })
        const data = this.refs.canvas.toDataURL('image/jpeg', 1)
        this.props.socket.emit('draw', data)
    }

    handleFixPosition = (clientX, clientY) => {
        const windowScrollX = window.scrollX
        const windowScrollY = window.scrollY
        let x = windowScrollX + clientX
        let y = windowScrollY + clientY
        const canvasX = this.refs.canvas.getBoundingClientRect().left
        const canvasY = this.refs.canvas.getBoundingClientRect().top
        x -= canvasX
        y -= canvasY
        const { scale } = this.state
        x /= scale
        y /= scale
        return { x, y }
    }


    drawImage = (src) => {
        let img = new Image()
        img.src = src
        img.onload = () => {
            const { width, height } = this.refs.painterBox.getBoundingClientRect()
            this.setState({
                imgWidth: img.width,
                imgHeight: img.height,
                width, height,
            }, () => {
                this.ctx.drawImage(img, 0, 0)
                this.painter.setDimension(img.width, img.height)
            })
        }
    }




    componentDidMount() {
        const { canvas } = this.refs;

        if (!canvas) return

        this.ctx = this.refs.canvas.getContext('2d')
        this.painter = new CanvasController(this)

        this.drawImage(squirtle)

        window.onresize = () => {
            const { width, height } = this.refs.painterBox.getBoundingClientRect()
            this.setState({
                width, height,
            })
        }
    }

    UNSAFE_componentWillMount() {
        this.props.socket.on('drawBack', data => {
            const old_img = this.refs.canvas.toDataURL('image/jpeg', 1)
            this.props.transactions.addTransaction(new drawTransaction(old_img, data, this.drawImage, this.props.socket, true))
        })
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
            <div className="painter-display" ref='painterBox'>
                <Scrollbars ref="scrollbar"
                    style={scrollStyle}
                    renderThumbHorizontal={props => <div {...props} className="thumb" />}
                    renderThumbVertical={props => <div {...props} className="thumb" />}
                >

                    <div className={"display " + this.getSelectedTools()} id='display' onClick={this.handleZoomEffect} style={displayStyle}>
                        <canvas className="display-background" ref='canvas' width={imgWidth} height={imgHeight}
                            onMouseDown={this.handleToolStart}
                            onMouseMove={this.handleToolMove}
                            onMouseOut={this.handleToolEnd}
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
    return {
        selectedTool: selected,
        socket: state.backend.socket
    }
};

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPlace)
