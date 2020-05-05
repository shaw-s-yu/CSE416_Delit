import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { connect } from 'react-redux';
import TOOLS from '../tools/ToolbarTools'
import CanvasController from './CanvasController'
import DrawTransaction from "./DrawTransaction"
import GridController from '../controller/GridController'
import ImageController, { arrayBufferToBase64 } from '../controller/ImageController'
import CopyController from '../controller/CopyController'
import SelectedBoxes from './SelectedBoxes'
import axios from 'axios'
import Keyboard from '../controller/KeyboardController'
import Dialog from '../tools/Dialog'
import { Button } from 'react-bootstrap';

class DisplayPlace extends React.Component {

    state = {
        canvasWidth: 0,
        canvasHeight: 0,
        DisplayBoxWidth: 0,
        DisplayBoxHeight: 0,
        mouseDown: false,
        selectedGrid: [],
        ctrlSelecting: false,
        shiftSelecting: false,
        cropDimension: null,
        copying: false,
        dialogOpen: false,
    }

    selectedBoxes = React.createRef()

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
        const { shiftSelecting } = this.state
        if (shiftSelecting) return


        this.painter.initDraw(selectedTool, borderThic, fillColor, borderColor)
        if (selectedTool === TOOLS.FILL) return

        const { clientX, clientY } = e
        const { x, y } = this.handleFixPosition(clientX, clientY)

        if (selectedTool === TOOLS.CROP) {
            this.setState({
                cropDimension: {
                    start: { x, y }
                }
            })
        }

        this.painter.startDraw(x, y)


        this.setState({
            mouseDown: true,
        })
    }

    handleToolMove = (e) => {
        const { mouseDown, selectedGrid } = this.state
        const { clientX, clientY } = e
        const { x, y } = this.handleFixPosition(clientX, clientY)

        if (selectedGrid.length !== 0) {
            if (this.selectedBoxes.state.mouseDown) {
                this.selectedBoxes.handleMove(x, y)
            }
        }

        if (!mouseDown) return




        this.painter.onDraw(x, y)
        this.GridController.drawGridBorder()

    }

    handleToolEnd = (e, type) => {

        const { selectedTool } = this.props
        const { shiftSelecting } = this.state

        if ((!selectedTool || shiftSelecting) && type === 'click') {
            this.handleSelect(e)
            return
        }

        if ((selectedTool === TOOLS.ZOOM_IN || selectedTool === TOOLS.ZOOM_OUT || selectedTool === TOOLS.FILL) && type === 'out') return

        if (this.state.mouseDown === false && selectedTool !== TOOLS.FILL) return
        if (selectedTool === TOOLS.ZOOM_IN || selectedTool === TOOLS.ZOOM_OUT) {
            this.props.handleZoomEffect(e)
            return
        }

        e.stopPropagation()
        const { clientX, clientY } = e
        const { x, y } = this.handleFixPosition(clientX, clientY)

        if (selectedTool === TOOLS.CROP) {
            let { cropDimension } = this.state
            cropDimension.end = { x, y }
            this.setState(cropDimension, () => {
                this.handleCropSelect()
            })
        }

        this.painter.endDraw(x, y)
        this.GridController.drawGridBorder()

        this.setState({
            mouseDown: false,
        })
    }

    handleCropSelect = () => {
        let { ctrlSelecting, selectedGrid, cropDimension } = this.state
        const posistions = this.GridController.getGridPositionsFromCropMouse(cropDimension)
        if (!ctrlSelecting) {
            this.setState({ selectedGrid: posistions })
            return
        } else {
            for (let o = 0; o < posistions.length; o++) {
                let found = false
                for (let i = 0; i < selectedGrid.length; i++) {
                    if (posistions[o].x === selectedGrid[i].x && posistions[o].x === selectedGrid[i].x) {
                        found = true
                        break
                    }
                }
                if (!found) {
                    selectedGrid.push(posistions[o])
                }
            }
            this.setState(selectedGrid)
        }
    }

    handleSelect = (e) => {
        e.stopPropagation()
        const { clientX, clientY } = e
        const { x, y } = this.handleFixPosition(clientX, clientY)
        const gridIndex = this.GridController.getGridPositionFromMouseXY(x, y)
        if (!gridIndex) return

        let { ctrlSelecting, selectedGrid, shiftSelecting } = this.state
        if (ctrlSelecting === false && shiftSelecting === false) {
            selectedGrid = []
            selectedGrid.push(gridIndex)
            this.setState({ selectedGrid })
            return
        }


        let found = false
        for (let i = 0; i < selectedGrid.length; i++) {
            if (selectedGrid[i].x === gridIndex.x && selectedGrid[i].y === gridIndex.y) {
                found = true
                break
            }
        }

        if (!found && ctrlSelecting) {
            selectedGrid.push(gridIndex)
            this.setState({ selectedGrid })
            return
        }

        if (shiftSelecting) {
            if (selectedGrid.length === 0) {
                selectedGrid.push(gridIndex)
                this.setState({ selectedGrid })
            } else {
                selectedGrid = this.GridController.getMinRegionGridPositionsFromGridsAndGrid(selectedGrid, gridIndex)
                this.setState({ selectedGrid })
            }
        }
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

        const oldImg = this.refs.canvas.toDataURL('image/jpeg', 1)

        this.GridController.drawGrid()

        const newImg = this.refs.canvas.toDataURL('image/jpeg', 1)
        this.addNewTransaction(oldImg, newImg)
        this.sendSocketNewOperation()
    }


    getImageDataWithGrid = () => {
        return this.refs.canvas.toDataURL('image/jpeg', 1)
    }

    getImageDataNoGrid = () => {
        return this.ImageController.getImageFromGrid()
    }



    handleHorizontalFlip = () => {
        const { selectedGrid } = this.state
        const oldImg = this.getImageDataWithGrid()
        const callback = () => {
            const newImg = this.getImageDataWithGrid()
            this.addNewTransaction(oldImg, newImg)
            this.sendSocketNewOperation()
        }
        if (selectedGrid.length !== 0) {
            const dimension = this.GridController.getCropPositionFromGridPositions(selectedGrid)
            this.ImageController.handleSelectedHorizontalFlip(dimension, callback)
        } else
            this.ImageController.handleHorizontalFlip(callback)
    }

    handleVerticalFlip = () => {
        const { selectedGrid } = this.state
        const oldImg = this.getImageDataWithGrid()
        const callback = () => {
            const newImg = this.getImageDataWithGrid()
            this.addNewTransaction(oldImg, newImg)
            this.sendSocketNewOperation()
        }
        if (selectedGrid.length !== 0) {
            const dimension = this.GridController.getCropPositionFromGridPositions(selectedGrid)
            this.ImageController.handleSelectedVerticalFlip(dimension, callback)
        } else
            this.ImageController.handleVerticalFlip(callback)
    }

    handleUnselectGrid = () => {
        this.setState({
            selectedGrid: []
        })
    }

    handleGetImageNoGrid = () => {
        const { width, height } = this.props.tileset
        const gridPositions = this.GridController.getGridPositions()
        const imageDimension = { width, height }
        return this.ImageController.getImageFromGrid(gridPositions, imageDimension)
    }

    handleDrawImageNoGrid = () => {
        const { width, height } = this.props.tileset
        const gridPositions = this.GridController.getGridPositions()
        const imageDimension = { width, height }
        this.ImageController.drawImageFromGrid(gridPositions, imageDimension)
    }

    handleDrawImgToGrid = (src, callback) => {
        const gridPositions = this.GridController.getGridPositions()
        this.ImageController.drawToGrid(src, gridPositions, callback)

    }

    handleStopCopying = () => {
        this.GridController.drawGridBorder()
        this.setState({ copying: false })
    }

    startCopyGrid = () => {
        const { selectedGrid } = this.state
        const imgData = this.getImageDataWithGrid()
        this.CopyController = new CopyController(selectedGrid, imgData)
        const startGrids = this.CopyController.getStartGrids()
        this.GridController.drawCopiedGrid(startGrids)
        this.setState({ selectedGrid: [] })
    }


    pasteCopiedGrid = () => {
        const { copying, selectedGrid } = this.state
        if (!copying) return
        if (selectedGrid.length === 0) {
            this.setState({ dialogOpen: true })
        } else {
            const startGrids = this.CopyController.getStartGrids()
            const gridsDiff = this.GridController.getGridDiffFrom2Grids(startGrids, selectedGrid)
            this.GridController.drawGridsByGridsDiff(startGrids, gridsDiff)
            const newGrids = this.GridController.getGridsFromGridsDiffandGrids(startGrids, gridsDiff)

            const oldImg = this.CopyController.getStartImageData()

            const newImg = this.getImageDataWithGrid()
            this.addNewTransaction(oldImg, newImg)
            this.sendSocketNewOperation()

            this.setState({ selectedGrid: newGrids })
        }
    }


    componentDidMount() {

        if (this.userIsTeammember()) {
            this.room = `draw/${this.props.tileset._id}`
            this.props.socket.emit('join-room', this.room)
            this.props.socket.on('draw-back', res => {

                const old_img = this.refs.canvas.toDataURL('image/jpeg', 1)
                const { transactions } = this.props
                const { data, type } = res

                if (type === 'new') {
                    this.addNewTransaction(old_img, data)
                }
                else if (type === 'redo') {
                    transactions.doTransaction()
                } else if (type === 'undo') {
                    transactions.undoTransaction()
                }

            })
        }

        this.props.childRef(this)
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

        this.setState({
            canvasWidth,
            canvasHeight,
            DisplayBoxWidth,
            DisplayBoxHeight
        }, () => {
            this.GridController.getPositionsForNoGridsImage()

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
                        this.handleDrawImgToGrid(base64Flag + imageStr)
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

        window.onkeydown = e => {
            if (Keyboard.triggerLeftControll(e))
                this.setState({ ctrlSelecting: true })
            else if (Keyboard.triggerLeftShift(e))
                this.setState({ shiftSelecting: true })
            else if (Keyboard.triggerLeftCtrlC(e)) {
                if (this.state.selectedGrid.length === 0) return
                this.setState({ copying: true }, () => {
                    this.startCopyGrid()
                })
            } else if (Keyboard.triggerLeftCtrlV(e)) {
                if (this.state.copying === false) return
                this.pasteCopiedGrid()
            }
            else if (Keyboard.triggerLeftCtrlZ(e)) {
                this.undoTransaction()
            }
            else if (Keyboard.triggerLeftCtrlY(e)) {
                this.doTransaction()
            }
        }

        window.onkeyup = e => {
            if (Keyboard.triggerLeftControll(e))
                this.setState({ ctrlSelecting: false })
            else if (Keyboard.triggerLeftShift(e))
                this.setState({ shiftSelecting: false })

        }
    }

    userIsTeammember = () => {
        const { username } = this.props
        const { teamInfo } = this.props.tileset
        for (let i in teamInfo) {
            if (teamInfo[i].username === username)
                return true
        }
        return false
    }

    sendSocketNewOperation = () => {
        const imgData = this.refs.canvas.toDataURL('image/jpeg', 1)
        this.props.socket.emit('draw', {
            data: imgData,
            type: 'new',
            room: this.room
        })
    }

    addNewTransaction = (oldImg, newImg) => {
        this.props.transactions.addTransaction(
            new DrawTransaction(oldImg, newImg, this.ImageController.drawImage)
        )
    }

    doTransaction = () => {
        this.props.socket.emit('draw', {
            type: 'redo',
            room: this.room
        })
        this.props.transactions.doTransaction()
        this.handleUnselectGrid()
    }

    undoTransaction = () => {
        this.props.socket.emit('draw', {
            type: 'undo',
            room: this.room
        })
        this.props.transactions.undoTransaction()
        this.handleUnselectGrid()
    }

    UNSAFE_componentWillMount() {

    }

    render() {
        const { canvasWidth, canvasHeight, DisplayBoxWidth, DisplayBoxHeight, selectedGrid, copying, dialogOpen } = this.state;
        const { scale, tileset } = this.props
        const { tileWidth, tileHeight } = tileset
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
            <div className="painter-display" ref='painterBox' onClick={this.handleUnselectGrid}>
                <Scrollbars ref="scrollbar"
                    style={scrollStyle}
                    renderThumbHorizontal={props => <div {...props} className="thumb" />}
                    renderThumbVertical={props => <div {...props} className="thumb" />}
                >

                    <div className={"display " + this.getSelectedTools()} id='display'
                        onMouseDown={this.handleToolStart}
                        onMouseMove={this.handleToolMove}
                        onMouseLeave={e => this.handleToolEnd(e, 'out')}
                        onClick={e => this.handleToolEnd(e, 'click')}
                        style={displayStyle}>
                        <canvas ref='canvas' width={canvasWidth} height={canvasHeight} className='draw-canvas'>
                            Your Browser Does Not Support Canvas
                        </canvas>
                        <SelectedBoxes
                            selectedGrid={selectedGrid}
                            width={tileWidth}
                            height={tileHeight}
                            parent={this}
                            childRef={ref => this.selectedBoxes = ref}
                            copying={copying}
                        />

                    </div>

                </ Scrollbars>
                <Dialog
                    header={'Notice'}
                    open={dialogOpen}
                    fullWidth={true}
                    maxWidth="xs"
                    actions={[<Button key='f' onClick={e => this.setState({ dialogOpen: false })}>OK</Button>]}
                    content={
                        <p>You Select A Grid To Paste</p>
                    }
                />
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

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPlace)
