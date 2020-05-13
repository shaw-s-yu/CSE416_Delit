import React from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars'
import TilesetImageController from '../../controller/TilesetImageController'
import { arrayBufferToBase64 } from '../../controller/ImageController'
import axios from 'axios'
import TOOLS from '../../tools/ToolbarTools'
import SelectedBoxes from './SelectedBoxes'
import Keyboard from '../../controller/KeyboardController'
import * as handler from '../../../store/database/WorkScreenHandler';


class TilesetDisplay extends React.Component {

    state = {
        scale: 1,
        canvasWidth: 0,
        canvasHeight: 0,
        selectedGrids: [],
        shiftSelecting: false,
        ctrlSelecting: false,
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

    handleOnClick = e => {
        const { selectedTool } = this.props
        if (selectedTool === TOOLS.ZOOM_IN || selectedTool === TOOLS.ZOOM_OUT) {
            this.handleZoomEffect(e)
            return
        }
        const { clientX, clientY } = e
        const { x, y } = this.handleFixPosition(clientX, clientY)
        const gridPosition = this.imageController.getGridPositionFromMouseXY(x, y)
        this.handleSelectGrid(gridPosition)
    }

    handleSelectGrid = gridPosition => {
        const { ctrlSelecting, shiftSelecting } = this.state
        let { selectedGrids } = this.state
        if (!ctrlSelecting && !shiftSelecting) {
            selectedGrids = []
            selectedGrids.push(gridPosition)
            this.handleGridStateChange(selectedGrids)
            return
        }
        else if (ctrlSelecting) {
            selectedGrids.push(gridPosition)
            this.handleGridStateChange(selectedGrids)
            return
        }
        else if (shiftSelecting) {
            selectedGrids = this.imageController.getBoxedGridPositionsFromGridPositions(selectedGrids, gridPosition)
            this.handleGridStateChange(selectedGrids)
            return
        }
        return
    }

    handleGridStateChange = selectedGrids => {
        this.setState({ selectedGrids }, () => {
            const { index } = this.props
            const returnGrids = this.imageController.handleConvertIndexToGID(selectedGrids)
            this.props.tilesetSelectGrids(returnGrids)
            this.props.propertySelectTile('tilesets', returnGrids[0].index, index)
        })
    }

    handleClearGrid = () => {
        this.setState({ selectedGrids: [] })
    }

    handleFixPosition = (clientX, clientY) => {
        const windowScrollX = window.scrollX
        const windowScrollY = window.scrollY
        let x = windowScrollX + clientX
        let y = windowScrollY + clientY
        const canvasX = this.refs.backgroundCanvas.getBoundingClientRect().left
        const canvasY = this.refs.backgroundCanvas.getBoundingClientRect().top
        x -= canvasX
        y -= canvasY
        const { scale } = this.state
        x /= scale
        y /= scale
        return { x, y }
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
                const { err, msg, data } = res.data
                if (err)
                    console.log(msg)
                else {
                    const base64Flag = 'data:image/jpeg;base64,';
                    if (!data) return
                    const imageStr = arrayBufferToBase64(data.data)
                    this.handleDrawImgToGrid(base64Flag + imageStr, () => {
                        this.props.handleTilesetLoaded()
                    })
                }
            })
        })

        window.onkeydown = e => {
            if (Keyboard.triggerLeftControll(e))
                this.setState({ ctrlSelecting: true })
            else if (Keyboard.triggerLeftShift(e))
                this.setState({ shiftSelecting: true })
            else if (Keyboard.triggerLeftCtrlZ(e)) {
                this.props.transactions.undoTransaction()
            }
            else if (Keyboard.triggerLeftCtrlY(e)) {
                this.props.transactions.doTransaction()
            }
        }
        window.onkeyup = e => {
            if (Keyboard.triggerLeftControll(e))
                this.setState({ ctrlSelecting: false })
            else if (Keyboard.triggerLeftShift(e))
                this.setState({ shiftSelecting: false })

        }
    }


    render() {
        const { style, width, height, index, tileset } = this.props;
        const { tileWidth, tileHeight } = tileset
        const { scale, canvasWidth, canvasHeight, selectedGrids, shiftSelecting } = this.state;
        const totalStyle = {
            ...style,
            marginLeft: canvasWidth ? canvasWidth * scale >= width ? "auto" : (width - canvasWidth * scale) / 2 : "auto",
            marginTop: canvasHeight ? canvasHeight * scale >= height ? "auto" : (height - canvasHeight * scale) / 2 : "auto",
        }
        return (

            <Scrollbars style={{ ...style, width, height }} ref="scrollbar"
                renderThumbHorizontal={props => <div {...props} className="thumb" />}
                renderThumbVertical={props => <div {...props} className="thumb" />}>

                <div ref='display'
                    className={"display-place " + this.getSelectedTools()}
                    style={totalStyle}
                    onClick={this.handleOnClick}
                    onMouseDown={e => e.stopPropagation()}
                >
                    <canvas ref='backgroundCanvas' id={'tileset' + index} width={canvasWidth} height={canvasHeight}></canvas>
                    <SelectedBoxes
                        selectedGrids={selectedGrids}
                        width={tileWidth}
                        height={tileHeight}
                        parent={this}
                        shiftSelecting={shiftSelecting}
                    />
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
    tilesetSelectGrids: (selectedGrids) => dispatch(handler.tilesetSelectGrids(selectedGrids)),
    propertySelectTile: (window, id, index) => dispatch(handler.propertySelectTile(window, id, index)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TilesetDisplay)
