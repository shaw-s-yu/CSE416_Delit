import React from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars'
import MapGridController from '../../controller/MapGridController'
import MapImageController from '../../controller/MapImageController'
import TilesetImageController from '../../controller/TilesetImageController'
import * as handler from '../../../store/database/WorkScreenHandler';
import { v1 } from 'uuid';
import TOOLS from '../../tools/ToolbarTools'
import MapTransaction from '../../controller/LayerTransaction'

class ImageWrapper extends React.Component {

    state = {
        scale: 1,
        canvasWidth: 0,
        canvasHeight: 0,
    }

    scrollbar = React.createRef();
    mouseGridPosition = null
    mouseDown = false

    getToolName = () => {
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

    handleZoomEffect = (e) => {
        e.stopPropagation();
        const { selectedTool } = this.props;
        if (selectedTool !== TOOLS.ZOOM_IN && selectedTool !== TOOLS.ZOOM_OUT) return
        const { scale } = this.state
        const factor = selectedTool === TOOLS.ZOOM_IN ? 1 / 0.8 : selectedTool === TOOLS.ZOOM_OUT ? 0.8 : 1
        const nscale = scale * factor
        this.setState({ scale: nscale })

        let target = document.getElementById('map-display')
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

    handleDrawLayers = () => {

        const { layerList, tilesets } = this.props
        this.imageController.setTilesets(tilesets)

        let layersRefName = []
        this.layerRefs = {}
        this.layerList = {}
        for (let i = 0; i < layerList.length; i++) {
            const layerRefName = 'layer' + layerList[i]._id
            this.layerRefs[layerRefName] = this.refs[layerRefName]
            this.layerList[layerRefName] = layerList[i]
            layersRefName.push(layerRefName)
            this.imageController.clearLayerCanvas(this.layerRefs[layerRefName])
            this.handleDrawLayerByLayerData(layerList[i].data, this.layerRefs[layerRefName])
        }
    }

    handleMouseDown = e => {
        e.stopPropagation()
        const { selectedGrids, selectedLayer, selectedTool } = this.props
        if (selectedTool === TOOLS.ERASER) {
            if (selectedLayer === null) return
            const layerRefName = 'layer' + selectedLayer
            const layerRef = this.layerRefs[layerRefName]
            const layer = this.layerList[layerRefName]
            if (layer.locked) return
            this.imageController.storeLayerState(layerRef)
            this.mouseDown = true
        }
        if (selectedLayer === null || selectedGrids.length === 0)
            return
        this.mouseDown = true
    }

    handleMouseMove = e => {
        const { selectedGrids, selectedLayer, selectedTool } = this.props
        if (selectedLayer === null)
            return


        const { clientX, clientY } = e
        const { x, y } = this.handleFixPosition(clientX, clientY)


        const newMouseGridPosition = this.imageController.getGridPositionFromMouseXY(x, y)
        if (newMouseGridPosition === null || !this.layerRefs) return

        const layerRefName = 'layer' + selectedLayer
        const layerRef = this.layerRefs[layerRefName]
        const layer = this.layerList[layerRefName]
        if (layer.locked) return





        if (!this.mouseGridPosition) {
            this.imageController.storeLayerState(layerRef)
            this.handleMouseMoveDrawLayer(layerRef, layer, selectedGrids, newMouseGridPosition)
            return
        }


        if (this.mouseGridPosition.index === newMouseGridPosition.index) {
            return
        }

        if (!this.mouseDown && selectedTool !== TOOLS.ERASER) this.imageController.restoreLayerState(layerRef)
        this.handleMouseMoveDrawLayer(layerRef, layer, selectedGrids, newMouseGridPosition)

    }

    handleMouseMoveDrawLayer = (layerRef, layer, selectedGrids, gridPosition) => {

        const { selectedTool } = this.props
        this.mouseGridPosition = gridPosition


        if (selectedTool === TOOLS.ERASER && this.mouseDown) {
            const data = this.imageController.getMoveEraserData(gridPosition, layer.data)
            this.imageController.storeLayerState(layerRef)
            if (data) this.props.transactions.addTransaction(
                new MapTransaction(data, this.props.layerList, this.props.mapFillClick, this.props.restoreLayers)
            )
            return
        }

        if (selectedGrids.length === 0) return

        if (selectedTool === TOOLS.STAMP) {
            const data = this.imageController.getMoveSelectedTileData(selectedGrids, gridPosition)
            if (this.mouseDown) {
                this.imageController.storeLayerState(layerRef)
                if (data) this.props.transactions.addTransaction(
                    new MapTransaction(data, this.props.layerList, this.props.mapStampClick, this.props.restoreLayers)
                )
                return
            }
            this.handleDrawLayerByLayerData(data, layerRef)
        }
        else if (selectedTool === TOOLS.FILL) {
            const data = this.imageController.getMoveFillData(selectedGrids, gridPosition, layer.data)
            if (this.mouseDown) {
                this.imageController.storeLayerState(layerRef)
                if (data) this.props.transactions.addTransaction(
                    new MapTransaction(data, this.props.layerList, this.props.mapFillClick, this.props.restoreLayers)
                )
                return
            }
            this.handleDrawLayerByLayerData(data, layerRef)
        }
    }

    handleMouseLeave = () => {
        const { selectedLayer, selectedGrids, selectedTool } = this.props
        this.mouseGridPosition = null

        this.mouseDown = false
        if (selectedLayer === null || selectedGrids.length === 0 || selectedTool === TOOLS.ERASER)
            return
        const layerRefName = 'layer' + selectedLayer
        const layerRef = this.layerRefs[layerRefName]
        this.imageController.restoreLayerState(layerRef)
    }

    handleMouseClick = e => {
        this.mouseDown = false
        const { selectedTool, selectedGrids, selectedLayer } = this.props
        if (selectedTool === TOOLS.ZOOM_IN || selectedTool === TOOLS.ZOOM_OUT) {
            this.handleZoomEffect(e)
            return
        }
        if (selectedLayer === null) {
            this.props.propertySelectDisplay('map')
            return
        }

        if (selectedTool !== TOOLS.STAMP && selectedTool !== TOOLS.ERASER && selectedTool !== TOOLS.FILL) {
            this.props.propertySelectDisplay('map')
            return
        }
        e.stopPropagation()

        const { clientX, clientY } = e
        const { x, y } = this.handleFixPosition(clientX, clientY)
        const gridPosition = this.imageController.getGridPositionFromMouseXY(x, y)


        const layerRefName = 'layer' + selectedLayer
        const layerRef = this.layerRefs[layerRefName]
        const layer = this.layerList[layerRefName]
        if (layer.locked) return

        this.imageController.storeLayerState(layerRef)

        if (selectedTool === TOOLS.ERASER) {
            const data = this.imageController.getMoveEraserData(gridPosition, layer.data)
            this.props.transactions.addTransaction(
                new MapTransaction(data, this.props.layerList, this.props.mapFillClick, this.props.restoreLayers)
            )
        }

        if (selectedGrids.length === 0) return

        if (selectedTool === TOOLS.STAMP) {
            const data = this.imageController.getMoveSelectedTileData(selectedGrids, gridPosition)
            this.props.transactions.addTransaction(
                new MapTransaction(data, this.props.layerList, this.props.mapStampClick, this.props.restoreLayers)
            )
        } else if (selectedTool === TOOLS.FILL) {
            const data = this.imageController.getMoveFillData(selectedGrids, gridPosition, layer.data)
            this.props.transactions.addTransaction(
                new MapTransaction(data, this.props.layerList, this.props.mapFillClick, this.props.restoreLayers)
            )
        }
    }


    handleDrawLayerByLayerData = (data, layerCanvas) => {
        //data[i] is the gridid of tilesets, i is the grid index of a layer
        for (let i = 0; i < data.length; i++) {
            if (data[i] === 0)
                continue
            else {
                const tileset = this.imageController.getTilesetByGridId(data[i])
                if (!tileset) return
                const srcCanvas = document.getElementById(tileset.canvasId)

                const tilesetImageController = new TilesetImageController(tileset, srcCanvas)
                const tileData = tilesetImageController.getTileDataByGridId(data[i])
                this.imageController.drawLayerGridByGridIndex(i, tileData, layerCanvas)
            }
        }
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
        const { map, tilesets } = this.props
        const canvas = this.refs.backgroundCanvas
        this.gridController = new MapGridController(map)
        this.imageController = new MapImageController(canvas, map)
        this.imageController.setTilesets(tilesets)
        const { canvasWidth, canvasHeight } = this.imageController.getCanvasDimension()
        this.setState({ canvasWidth, canvasHeight }, () => {
            this.imageController.drawBackGround()
        })
    }

    componentDidUpdate() {
        const { tilesetLoaded, resizing } = this.props
        if (tilesetLoaded && !resizing)
            this.handleDrawLayers()
    }

    getTilesetJson = () => {
        const { tileset } = this.props
        // const dataJson = {}
        console.log(tileset)
        // dataJson.firstgid = 1
        // dataJson.image = "./tileset@DELIT.jpeg"
        // dataJson.imageheight = tileset.height
        // dataJson.imagewidth = tileset.width
        // dataJson.margin = tileset.margin
        // dataJson.name = tileset.name
        // dataJson.properties = {}
        // dataJson.spacing = tileset.spacing
        // dataJson.tileheight = tileset.tileHeight
        // dataJson.tilewidth = tileset.tileWidth
        // console.log(JSON.stringify(dataJson))
        // return JSON.stringify(dataJson)
    }

    render() {
        const { style, width, height, layerList } = this.props;
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

                <div id="map-display" className={"display-place " + this.getToolName()} style={totalStyle}
                    onClick={this.handleMouseClick}
                    onMouseDown={this.handleMouseDown}
                    onMouseMove={this.handleMouseMove}
                    onMouseLeave={this.handleMouseLeave}
                    onMouseUp={this.handleMouseClick}
                >
                    <canvas ref='backgroundCanvas' width={canvasWidth} height={canvasHeight}></canvas>
                    {layerList.map(e => (
                        <canvas ref={'layer' + e._id} width={canvasWidth} height={canvasHeight}
                            className={"layer-canvas " + (e.visible ? '' : 'layer-invisible')}
                            style={{ opacity: e.opacity }} key={v1()}
                        ></canvas>
                    ))}
                </div>
            </Scrollbars>

        )
    }

}

const mapStateToProps = (state) => {
    const { selected } = state.toolbar
    const { map } = state.map
    const { tilesets, loaded, selectedGrids } = state.tileset
    const { layerList } = state.layer
    return {
        selectedTool: selected,
        map, tilesets, layerList,
        tilesetLoaded: loaded,
        selectedGrids,
        selectedLayer: state.layer.selected
    }
};

const mapDispatchToProps = (dispatch) => ({
    mapStampClick: (data) => dispatch(handler.mapStampClick(data)),
    mapFillClick: (data) => dispatch(handler.mapFillClick(data)),
    propertySelectDisplay: (window) => dispatch(handler.propertySelectDisplay(window)),
    restoreLayers: (layerList) => dispatch(handler.restoreLayers(layerList)),
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageWrapper)
