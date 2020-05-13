import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import GridController from '../controller/GridController'
import ImageController, { arrayBufferToBase64 } from '../controller/ImageController'
import axios from 'axios'
import { connect } from 'react-redux';
import TOOLS from '../tools/ToolbarTools'



class ViewerDisplay extends React.Component {


    state = {
        canvasWidth: 0,
        canvasHeight: 0,
        DisplayBoxWidth: 0,
        DisplayBoxHeight: 0,
    }

    handleDrawImgToGrid = (src, callback) => {
        const gridPositions = this.GridController.getGridPositions()
        this.ImageController.drawToGrid(src, gridPositions, callback)

    }

    handleGetImageNoGrid = () => {
        const { width, height } = this.props.tileset
        const gridPositions = this.GridController.getGridPositions()
        const imageDimension = { width, height }
        return this.ImageController.getImageFromGrid(gridPositions, imageDimension)
    }

    getTileset = () => {
        return this.props.tileset
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

    handleExport = () => {
        const { name } = this.props.tileset
        const imgData = this.handleGetImageNoGrid();
        require("downloadjs")(imgData, `${name}.jpeg`, "image/jpeg");
    }


    componentDidMount() {
        const { canvas } = this.refs;
        if (!canvas) return

        const { tileset } = this.props
        const { width, height, tileWidth, tileHeight } = tileset
        this.ctx = this.refs.canvas.getContext('2d')

        this.GridController = new GridController(this.ctx, width, height, tileWidth, tileHeight)
        const canvasDimension = this.GridController.getCanvasDimension()
        const canvasWidth = canvasDimension.width
        const canvasHeight = canvasDimension.height

        const DisplayBoxDimension = this.refs.painterBox.getBoundingClientRect()
        const DisplayBoxWidth = DisplayBoxDimension.width
        const DisplayBoxHeight = DisplayBoxDimension.height

        this.ImageController = new ImageController(
            this.ctx, canvasWidth,
            canvasHeight, tileWidth,
            tileHeight, width, height
        )

        this.props.childRef(this)
        this.setState({
            canvasWidth,
            canvasHeight,
            DisplayBoxWidth,
            DisplayBoxHeight
        }, () => {
            this.GridController.getPositionsForNoGridsImage()

            this.GridController.drawGrid()
            const { imageId } = this.props.tileset
            if (imageId !== '' && imageId !== '5eacb076d0ed064dec138c41')
                axios.get(`/data/image?imageId=${imageId}`).then(res => {
                    const { err, msg, data } = res.data
                    if (err)
                        console.log(msg)
                    else {
                        const base64Flag = 'data:image/jpeg;base64,';
                        if (!data) return
                        const imageStr = arrayBufferToBase64(data.data)
                        this.handleDrawImgToGrid(base64Flag + imageStr)
                    }
                })


        })
        window.onresize = () => {
            const { width, height } = this.refs.painterBox.getBoundingClientRect()
            this.setState({
                DisplayBoxWidth: width,
                DisplayBoxHeight: height,
            })
        }
    }


    render() {

        const { canvasHeight, canvasWidth, DisplayBoxWidth, DisplayBoxHeight } = this.state
        const { scale } = this.props
        const scrollStyle = {
            width: '100%',
            height: '100%',
            backgroundColor: 'lightgray',
            paddingBottom: 6,
        }

        const displayStyle = {
            left: canvasWidth ? canvasWidth * scale >= DisplayBoxWidth ? 6 : (DisplayBoxWidth - canvasWidth * scale) / 2 + 6 : 6,
            top: canvasHeight ? canvasHeight * scale >= DisplayBoxHeight ? 6 : (DisplayBoxHeight - canvasHeight * scale) / 2 + 6 : 6,

        }

        return (
            <div className="viewer-display" ref='painterBox'>
                <Scrollbars ref="scrollbar"
                    style={scrollStyle}
                    renderThumbHorizontal={props => <div {...props} className="thumb" />}
                    renderThumbVertical={props => <div {...props} className="thumb" />}
                >

                    <div className={"display " + this.getSelectedTools()} id='display'
                        onClick={this.props.handleZoomEffect}
                        style={displayStyle}>
                        <canvas ref='canvas' width={canvasWidth} height={canvasHeight} className='draw-canvas'>
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
        socket: state.backend.socket,
    }
};

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ViewerDisplay)
