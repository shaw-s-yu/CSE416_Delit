import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { connect } from 'react-redux';
import TOOLS from '../tools/ToolbarTools'
import CanvasController from './CanvasController'
import DrawTransaction from "./DrawTransaction"
import GridController from '../controller/GridController'
import ImageController, { arrayBufferToBase64 } from '../controller/ImageController'
import axios from 'axios'

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
        if (selectedTool === TOOLS.FILL) return
        const { clientX, clientY } = e
        const { x, y } = this.handleFixPosition(clientX, clientY)
        const gridIndex = this.GridController.getGridPositionFromMouseXY(x, y)
        if (gridIndex) this.painter.startDraw(x, y)


        this.setState({
            mouseDown: true,
        })
    }

    handleToolMove = (e) => {
        const { mouseDown } = this.state
        if (!mouseDown) return


        const { clientX, clientY } = e
        const { x, y } = this.handleFixPosition(clientX, clientY)
        // const gridIndex = this.GridController.getGridPositionFromMouseXY(x, y)
        this.painter.onDraw(x, y)
        this.GridController.drawGridBorder()

    }

    handleToolEnd = (e) => {
        const { selectedTool } = this.props
        if (!selectedTool) return
        if (selectedTool === TOOLS.CROP) e.stopPropagation()
        if (this.state.mouseDown === false && selectedTool !== TOOLS.FILL) return
        if (selectedTool === TOOLS.ZOOM_IN || selectedTool === TOOLS.ZOOM_OUT) {
            this.props.handleZoomEffect(e)
            return
        }

        e.stopPropagation()
        const { clientX, clientY } = e
        const { x, y } = this.handleFixPosition(clientX, clientY)
        this.painter.endDraw(x, y)
        this.GridController.drawGridBorder()

        let cropData = (selectedTool === TOOLS.CROP ? this.painter.CROP.getCroppedData() : null);

        this.setState({
            mouseDown: false,
            cropData: cropData,
            cropping: selectedTool === TOOLS.CROP ? true : false
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
        this.painter.onDraw(this.state.canvasWidth, this.state.canvasHeight)
        this.painter.endDraw(this.state.canvasWidth, this.state.canvasHeight)
        this.GridController.drawGridBorder()
    }


    getImageData = () => {
        return this.refs.canvas.toDataURL('image/jpeg', 1)
    }

    handleHorizontalFlip = () => {
        this.ImageController.handleHorizontalFlip()
    }

    handleVerticalFlip = () => {
        this.ImageController.handleVerticalFlip()
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
        const canvasWidth = canvasDimension.width
        const canvasHeight = canvasDimension.height

        const gridPositions = this.GridController.getGridPositions()

        const DisplayBoxDimension = this.refs.painterBox.getBoundingClientRect()
        const DisplayBoxWidth = DisplayBoxDimension.width
        const DisplayBoxHeight = DisplayBoxDimension.height

        this.ImageController = new ImageController(this.ctx, this.helperCtx, canvasWidth, canvasHeight, tileWidth, tileHeight)

        this.setState({
            canvasWidth,
            canvasHeight,
            DisplayBoxWidth,
            DisplayBoxHeight
        }, () => {

            this.GridController.drawGrid()
            this.painter.setDimension(canvasWidth, canvasHeight)
            const { imageId } = this.props.tileset
            if (imageId !== '' && imageId !== '5eacb076d0ed064dec138c41')
                axios.get(`/data/image?imageId=${imageId}`).then(res => {
                    const { err, msg, data } = res
                    if (err)
                        console.log(msg)
                    else {
                        const base64Flag = 'data:image/jpeg;base64,';
                        const imageStr = arrayBufferToBase64(data.data.data)
                        this.ImageController.drawToGrid(base64Flag + imageStr, gridPositions)
                    }
                })


        })

        this.painter = new CanvasController(this)

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
