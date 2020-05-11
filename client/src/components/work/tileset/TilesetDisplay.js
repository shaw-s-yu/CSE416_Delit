import React from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars'
import TilesetImageController from '../../controller/TilesetImageController'
import { arrayBufferToBase64 } from '../../controller/ImageController'
import axios from 'axios'

const TOOLS = {
    ZOOM_IN: "ZOOM_IN",
    ZOOM_OUT: "ZOOM_OUT"
}

class TilesetDisplay extends React.Component {

    state = {
        scale: 1,
        canvasWidth: 0,
        canvasHeight: 0
    }

    scrollbar = React.createRef();

    handleZoomEffect = (e) => {
        e.stopPropagation();
        const { selectedTool } = this.props;
        if (selectedTool !== TOOLS.ZOOM_IN && selectedTool !== TOOLS.ZOOM_OUT) return
        const { scale } = this.state
        const factor = selectedTool === TOOLS.ZOOM_IN ? 1 / 0.8 : selectedTool === TOOLS.ZOOM_OUT ? 0.8 : 1
        const nscale = scale * factor
        this.setState({ scale: nscale })

        let target = this.refs.display
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
        return selectedTool === TOOLS.ZOOM_IN ? "display-zoom-in" : selectedTool === TOOLS.ZOOM_OUT ? "display-zoom-out" : ""
    }

    handleDrawImgToGrid = (src, callback) => {
        this.imageController.drawImage(src, callback)
    }

    componentDidMount() {
        const { tileset } = this.props
        const canvas = this.refs.backgroundCanvas
        this.props.tilesetIdApplier(canvas.id)
        this.imageController = new TilesetImageController(tileset, canvas)
        const { canvasWidth, canvasHeight } = this.imageController.getCanvasDimension()
        this.setState({ canvasWidth, canvasHeight }, () => {
            this.imageController.drawBackGround()
            const { imageId } = tileset
            axios.get(`/data/image?imageId=${imageId}`).then(res => {
                const { err, msg, data } = res
                if (err)
                    console.log(msg)
                else {
                    const base64Flag = 'data:image/jpeg;base64,';
                    const imageStr = arrayBufferToBase64(data.data.data)
                    this.handleDrawImgToGrid(base64Flag + imageStr, () => {
                        this.props.handleTilesetLoaded()
                    })
                }
            })
        })
    }


    render() {
        const { style, width, height, index } = this.props;
        const { scale, canvasWidth, canvasHeight } = this.state;
        const totalStyle = {
            ...style,
            marginLeft: canvasWidth ? canvasWidth * scale >= width ? "auto" : (width - canvasWidth * scale) / 2 : "auto",
            marginTop: canvasHeight ? canvasHeight * scale >= height ? "auto" : (height - canvasHeight * scale) / 2 : "auto",
        }
        return (

            <Scrollbars style={{ ...style, width, height }} ref="scrollbar"
                renderThumbHorizontal={props => <div {...props} className="thumb" />}
                renderThumbVertical={props => <div {...props} className="thumb" />}>

                <div ref='display' className={"display-place " + this.getSelectedTools()} style={totalStyle} onClick={this.handleZoomEffect} onMouseDown={e => e.stopPropagation()}>
                    <canvas ref='backgroundCanvas' id={'tileset' + index} width={canvasWidth} height={canvasHeight}></canvas>
                </div>
            </Scrollbars>

        )
    }

}

const mapStateToProps = (state) => {
    return {
        socket: state.backend.socket,
    }
};

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(TilesetDisplay)
