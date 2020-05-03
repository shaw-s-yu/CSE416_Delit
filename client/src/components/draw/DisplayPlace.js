import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { connect } from 'react-redux';
import TOOLS from '../tools/ToolbarTools'
import CanvasController from './CanvasController'
import squirtle from '../../img/squirtle.jpg'
import DrawTransaction from "./DrawTransaction"
import GridController from '../controller/GridController'
import ImageController from '../controller/ImageController'

class DisplayPlace extends React.Component {

    state = {
        canvasWidth: 0,
        canvasHeight: 0,
        DisplayBoxWidth: 0,
        DisplayBoxHeight: 0,
        mouseDown: false,
    }

    cropBox = React.createRef();


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
        if (this.state.cropping)
            this.handleEndCrop()
        // console.log(this.state.cropping, this.state.cropData)
        this.painter.startDraw(x, y)


        this.setState({
            mouseDown: true,
            cropData: this.state.cropping ? null : this.state.cropData,
            cropping: selectedTool === TOOLS.CROP ? true : false
        })
    }

    handleToolMove = (e) => {
        const { mouseDown } = this.state
        if (!mouseDown) return


        const { clientX, clientY } = e
        const { x, y } = this.handleFixPosition(clientX, clientY)
        const gridIndex = this.GridController.getGridPositionFromMouseXY(x, y)
        console.log(gridIndex)
        this.painter.onDraw(x, y)
    }

    handleToolEnd = (e) => {
        const { selectedTool } = this.props
        if (!selectedTool) return
        if (selectedTool === TOOLS.CROP) e.stopPropagation()
        if (this.state.mouseDown === false) return
        if (selectedTool === TOOLS.ZOOM_IN || selectedTool === TOOLS.ZOOM_OUT)
            this.props.handleZoomEffect(e)

        e.stopPropagation()

        const { clientX, clientY } = e
        const { x, y } = this.handleFixPosition(clientX, clientY)
        this.painter.endDraw(x, y)

        let cropData = (selectedTool === TOOLS.CROP ? this.painter.CROP.getCroppedData() : null);

        this.setState({
            mouseDown: false,
            cropData: cropData,
            cropping: selectedTool === TOOLS.CROP ? true : false
        })
    }

    handleCropFlip = () => {
        console.log(this.state.cropping)
        if (this.state.cropping === false)
            return

        const oldImg = this.refs.canvas.toDataURL('image/jpeg', 1)
        const { imgData, left, top } = this.cropBox.getCropData()
        this.ctx.putImageData(imgData, left, top)
        this.painter.CROP.endCrop()
        this.setState({
            cropData: null,
            cropping: false
        })
        const newImg = this.refs.canvas.toDataURL('image/jpeg', 1)

        this.props.socket.emit('draw', { data: newImg, type: 'new' })
        this.props.transactions.addTransaction(new DrawTransaction(oldImg, newImg, this.drawImage))

    }

    handleEndCrop = () => {
        this.painter.CROP.endCrop()
        const { cropData } = this.state
        const { left, top } = cropData
        if (this.state.cropData !== null) {
            const old_img = this.refs.canvas.toDataURL('image/jpeg', 1)
            try {
                this.ctx.putImageData(this.state.cropData.imgData, left, top)
            }
            catch{
                return
            }
            const new_img = this.refs.canvas.toDataURL('image/jpeg', 1)
            this.props.socket.emit('draw', { data: new_img, type: 'new' })
            this.props.transactions.addTransaction(new DrawTransaction(old_img, new_img, this.drawImage))
        }
        this.setState({
            cropData: null,
            cropping: false
        })
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
        const { scale } = this.props
        x /= scale
        y /= scale
        return { x, y }
    }

    handleClear = () => {
        const color = { r: 211, g: 211, b: 211, a: 1 }
        this.painter.initDraw('SQUARE', 1, color, color)
        this.painter.startDraw(0, 0)
        this.painter.onDraw(this.state.imgWidth, this.state.imgHeight)
        this.painter.endDraw(this.state.imgWidth, this.state.imgHeight)
    }


    drawImage = (src, callback) => {
        let img = new Image()
        img.src = src
        img.onload = () => {
            const { width, height } = this.refs.painterBox.getBoundingClientRect()
            this.setState({
                imgWidth: img.width,
                imgHeight: img.height,
                DisplayBoxWidth: width,
                DisplayBoxHeight: height,
            }, () => {
                this.ctx.drawImage(img, 0, 0)
                this.painter.setDimension(img.width, img.height)
                if (callback) callback()
            })
        }
    }

    getImageData = () => {
        return this.refs.canvas.toDataURL('image/jpeg', 1)
    }

    handleHorizontalFlip = () => {
        const imgSrc = this.refs.canvas.toDataURL('image/jpeg', 1)
        this.ctx.scale(-1, 1)
        this.ctx.translate(-this.state.imgWidth, 0);
        this.drawImage(imgSrc, () => {
            this.ctx.scale(-1, 1)
            this.ctx.translate(-this.state.imgWidth, 0);
        })
    }

    handleVerticalFlip = () => {
        const imgSrc = this.refs.canvas.toDataURL('image/jpeg', 1)
        this.ctx.scale(1, -1)
        this.ctx.translate(0, -this.state.imgHeight);
        this.drawImage(imgSrc, () => {
            this.ctx.scale(1, -1)
            this.ctx.translate(0, -this.state.imgHeight);
        })
    }




    componentDidMount() {

        this.props.childRef(this)
        const { canvas } = this.refs;
        if (!canvas) return

        const { tileset } = this.props
        const { width, height, tileWidth, tileHeight } = tileset
        this.ctx = this.refs.canvas.getContext('2d')
        this.helperCtx = this.refs.helperCanvas.getContext('2d')

        this.GridController = new GridController(this.ctx, width, height, tileWidth, tileHeight)
        const canvasDimension = this.GridController.getCanvasDimension()
        const gridPositions = this.GridController.getGridPositions()

        const DisplayBoxDimension = this.refs.painterBox.getBoundingClientRect()

        this.ImageController = new ImageController(this.ctx, this.helperCtx, canvasDimension.width, canvasDimension.height, tileWidth, tileHeight)
        this.ImageController.drawToGrid(squirtle, gridPositions)

        this.setState({
            canvasWidth: canvasDimension.width,
            canvasHeight: canvasDimension.height,
            DisplayBoxWidth: DisplayBoxDimension.width,
            DisplayBoxHeight: DisplayBoxDimension.height,
        }, () => {
            this.GridController.drawGrid()
        })

        this.painter = new CanvasController(this)

        // this.drawImage(squirtle)

        window.onresize = () => {
            const { width, height } = this.refs.painterBox.getBoundingClientRect()
            this.setState({
                DisplayBoxWidth: width,
                DisplayBoxHeight: height,
            })
        }
    }

    UNSAFE_componentWillMount() {
        this.props.socket.on('drawBack', res => {
            const old_img = this.refs.canvas.toDataURL('image/jpeg', 1)
            const { transactions } = this.props
            const { data, type } = res

            if (type === 'new') {
                transactions.addTransaction(new DrawTransaction(old_img, data, this.drawImage))
            }
            else if (type === 'redo') {
                transactions.doTransaction()
            } else if (type === 'undo') {
                transactions.undoTransaction()
            }

        })
    }

    render() {
        const { canvasWidth, canvasHeight, DisplayBoxWidth, DisplayBoxHeight } = this.state;
        const { scale, tileset } = this.props
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
            <div className="painter-display" ref='painterBox'>
                <Scrollbars ref="scrollbar"
                    style={scrollStyle}
                    renderThumbHorizontal={props => <div {...props} className="thumb" />}
                    renderThumbVertical={props => <div {...props} className="thumb" />}
                >

                    <div className={"display " + this.getSelectedTools()} id='display'
                        onMouseDown={this.handleToolStart}
                        onMouseMove={this.handleToolMove}
                        onMouseOut={this.handleToolEnd}
                        onClick={this.handleToolEnd}
                        style={displayStyle}>
                        <canvas ref='helperCanvas' width={canvasWidth} height={canvasHeight} className='helper-canvas'>
                            Your Browser Does Not Support Canvas
                        </canvas>
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
        socket: state.backend.socket
    }
};

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPlace)
