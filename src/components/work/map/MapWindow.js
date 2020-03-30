import React from 'react';
import { Rnd } from 'react-rnd';
import { connect } from 'react-redux';
import Titlebar from '../../tools/Titlebar'
import * as handler from '../../../store/database/WorkScreenHandler';
import Toolbar from '../../tools/Toolbar'
import TileMap from '../tileset/TileMap'


const rect = document.body.getBoundingClientRect();
const { width, height } = rect
const TOOLS = {
    ZOOM_IN: "ZOOM_IN",
    ZOOM_OUT: "ZOOM_OUT",
    UNDO: "UNDO",
    REDO: "REDO",
    UPLOAD: "UPLOAD",
    DOWNLOAD: "DOWNLOAD",
    SAVE: "SAVE",
    STAMP: "STAMP",
    ERASER: "ERASER",
    FILL: "FILL"
}

class MapWindow extends React.Component {

    state = {
        position: { x: width * 0.2, y: 0 },
        size: { width: width * 0.6, height: height * 0.7 < 442.867 ? 442.867 : height * 0.7 },
        selectedTool: null,
    }

    tileMap = React.createRef()

    handleOnResize = (e, direction, ref, delta, position) => {
        let { width, height } = ref.style
        width = parseInt(width)
        height = parseInt(height)
        this.setState({ size: { width, height } })
    }

    handleZoomIn = () => {
        let { selectedTool } = this.state;
        selectedTool = selectedTool === TOOLS.ZOOM_IN ? null : TOOLS.ZOOM_IN;
        this.setState({ selectedTool })
        this.props.handleSelectTool(selectedTool)
    }

    handleZoomOut = () => {
        let { selectedTool } = this.state;
        selectedTool = selectedTool === TOOLS.ZOOM_OUT ? null : TOOLS.ZOOM_OUT;
        this.setState({ selectedTool })
        this.props.handleSelectTool(selectedTool)
    }

    render() {
        const { size, position, selectedTool } = this.state
        const { width, height } = size;
        const style = {
            maxWidth: width,
            maxHeight: height - 70,
        }
        return (
            <Rnd
                className="workscreen-window"
                id="map"
                size={size}
                default={position}
                onMouseDown={() => { this.props.handleToTop('map') }}
                onResizeStart={() => this.props.handleToTop('map')}
                onResize={this.handleOnResize}
                onResizeStop={this.handleOnResize}
            >
                <Titlebar title="Map Window" />
                <Toolbar
                    className="map-toolbar"
                    selected={selectedTool}
                    content={[
                        { name: TOOLS.UNDO, item: <i className={"fas fa-undo"} style={{ fontSize: '24px' }} /> },
                        { name: TOOLS.REDO, item: <i className={"fas fa-redo"} style={{ fontSize: '24px' }} /> },
                        { name: TOOLS.UPLOAD, item: <i className={"fas fa-upload"} style={{ fontSize: '24px' }} /> },
                        { name: TOOLS.DOWNLOAD, item: <i className={"fas fa-download"} style={{ fontSize: '24px' }} /> },
                        { name: TOOLS.SAVE, item: <i className={"fas fa-save"} style={{ fontSize: '24px' }} /> },
                        { name: TOOLS.STAMP, item: <i className={"fas fa-stamp"} style={{ fontSize: '24px' }} /> },
                        { name: TOOLS.ERASER, item: <i className={"fas fa-eraser"} style={{ fontSize: '24px' }} /> },
                        { name: TOOLS.FILL, item: <i className={"fas fa-fill"} style={{ fontSize: '24px' }} /> },
                    ]}
                    rightContent={[
                        { name: TOOLS.ZOOM_OUT, item: <i className={"fas fa-search-minus"} style={{ fontSize: '24px' }} onClick={this.handleZoomOut} /> },
                        { name: TOOLS.ZOOM_IN, item: <i className={"fas fa-search-plus"} style={{ fontSize: '24px' }} onClick={this.handleZoomIn} /> },
                    ]}
                />
                <TileMap style={style} width={width} height={height - 70} window="map" childRef={ref => this.tileMap = ref} selectedTool={selectedTool} />
            </Rnd>

        )
    }

}

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleToTop: (window) => dispatch(handler.handleToTop(window)),
    handleSelectTool: (selectedTool) => dispatch(handler.handleSelectTool(selectedTool))
})

export default connect(mapStateToProps, mapDispatchToProps)(MapWindow)
