import React from 'react';
import { connect } from 'react-redux';
import { Scrollbars } from 'react-custom-scrollbars'
import MapGridController from '../../controller/MapGridController'
import MapImageController from '../../controller/MapImageController'
import TilesetImageController from '../../controller/TilesetImageController'

const TOOLS = {
    ZOOM_IN: "ZOOM_IN",
    ZOOM_OUT: "ZOOM_OUT"
}

class ImageWrapper extends React.Component {

    state = {
        scale: 1,
        canvasWidth: 0,
        canvasHeight: 0,
        mapLoaded: false,
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
        console.log('draw layers')


        const { layerList, tilesets } = this.props
        this.imageController.setTilesets(tilesets)

        let layersRefName = []
        this.layerRefs = {}
        for (let i = 0; i < layerList.length; i++) {
            const layerRefName = 'layer' + layerList[i].id
            this.layerRefs[layerRefName] = this.refs[layerRefName]
            layersRefName.push(layerRefName)
            this.handleDrawLayerByLayerData(layerList[i].data, this.layerRefs[layerRefName])
        }
    }

    handleDrawLayerByLayerData = (data, layerCanvas) => {

        //data[i] is the gridid of tilesets, i is the grid index of a layer
        for (let i = 0; i < data.length; i++) {
            if (data[i] === 0)
                continue
            else {
                const tileset = this.imageController.getTilesetByGridId(data[i])
                const srcCanvas = document.getElementById(tileset.canvasId)

                const tilesetImageController = new TilesetImageController(tileset, srcCanvas)
                const tileData = tilesetImageController.getTileDataByGridId(data[i])
                console.log(tileData)
                this.imageController.drawLayerGridByGridIndex(i, tileData, layerCanvas)
            }
        }
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
        const { tilesetLoaded } = this.props
        const { mapLoaded } = this.state
        if (tilesetLoaded && !mapLoaded)
            this.handleDrawLayers()
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

                <div id="map-display" className={"display-place " + this.getSelectedTools()} style={totalStyle} onClick={this.handleZoomEffect} onMouseDown={e => e.stopPropagation()}>
                    <canvas ref='backgroundCanvas' width={canvasWidth} height={canvasHeight}></canvas>
                    {layerList.map(e => (
                        <canvas ref={'layer' + e.id} width={canvasWidth} height={canvasHeight} className="layer-canvas"></canvas>
                    ))}
                </div>
            </Scrollbars>

        )
    }

}

const mapStateToProps = (state) => {
    const { selected } = state.toolbar
    const { map } = state.map
    const { tilesets, loaded } = state.tileset
    const { layerList } = state.layer
    return {
        selectedTool: selected,
        map, tilesets, layerList,
        tilesetLoaded: loaded
    }
};

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(ImageWrapper)
