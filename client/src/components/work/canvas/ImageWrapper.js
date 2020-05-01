import React from 'react';
import LayerManager from './LayerManager'
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars'
import squirtle from '../../../img/squirtle.jpg'
import '../workscreen.css'

const TOOLS = {
    ZOOM_IN: "ZOOM_IN",
    ZOOM_OUT: "ZOOM_OUT"
}

class ImageWrapper extends React.Component {

    state = { scale: 1 }


    canvas = React.createRef();
    scrollbar = React.createRef();

    handleZoomEffect = (e) => {
        e.stopPropagation();
        const { selectedTool } = this.props;
        if (selectedTool !== TOOLS.ZOOM_IN && selectedTool !== TOOLS.ZOOM_OUT) return
        const { scale } = this.state
        const factor = selectedTool === TOOLS.ZOOM_IN ? 1 / 0.8 : selectedTool === TOOLS.ZOOM_OUT ? 0.8 : 1
        const nscale = scale * factor
        this.setState({ scale: nscale })

        let target = document.getElementById('display-place')
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

    componentDidMount() {
        this.props.childRef(this)
    }


    render() {
        const { style, width, imgWidth, height, imgHeight, window } = this.props;
        const { scale } = this.state;
        const totalStyle = {
            ...style,
            marginLeft: imgWidth ? imgWidth * scale >= width ? "auto" : (width - imgWidth * scale) / 2 : "auto",
            marginTop: imgHeight ? imgHeight * scale >= height ? "auto" : (height - imgHeight * scale) / 2 : "auto",
        }
        return (

            <Scrollbars style={{ ...style, width, height }} ref="scrollbar"
                renderThumbHorizontal={props => <div {...props} className="thumb" />}
                renderThumbVertical={props => <div {...props} className="thumb" />}>

                <div className="bg-content">
                    <div id="display-place" className={"display-place " + this.getSelectedTools()} style={totalStyle} onClick={this.handleZoomEffect}>
                        <LayerManager canvas={this.canvas} squirtle={squirtle} window={window} />
                    </div>
                </div>
            </Scrollbars>

        )
    }

}

const mapStateToProps = (state) => {
    const { squirtle } = state.tileset.imgs
    if (!squirtle) return {}
    const { imgWidth, imgHeight } = squirtle

    const { selected } = state.toolbar

    return {
        imgWidth, imgHeight,
        selectedTool: selected
    }
};

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageWrapper)
