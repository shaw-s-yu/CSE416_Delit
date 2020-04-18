import React from 'react';
import { Rnd } from 'react-rnd';
import { connect } from 'react-redux';
import Titlebar from '../../tools/Titlebar'
import * as handler from '../../../store/database/WorkScreenHandler';
import Toolbar from '../../tools/Toolbar'
import ImageWrapper from '../canvas/ImageWrapper'


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
    FILL: "FILL",
    CROP: "CROP"
}

class MapWindow extends React.Component {

    state = {
        position: { x: width * 0.2, y: 0 },
        size: { width: width * 0.6, height: height * 0.7 < 442.867 ? 442.867 : height * 0.7 },
    }

    tileMap = React.createRef()

    handleOnResize = (e, direction, ref, delta, position) => {
        let { width, height } = ref.style
        width = parseInt(width)
        height = parseInt(height)
        this.setState({ size: { width, height } })
    }

    render() {
        const { size, position, selectedTool } = this.state
        const { width, height } = size;
        const style = {
            maxWidth: width,
            maxHeight: height - 90,
            marginTop: '20px'
        }
        return (
            <Rnd
                className="workscreen-window "
                id="map"
                size={size}
                default={position}
                onMouseDown={() => { this.props.handleToTop('map') }}
                onClick={this.props.handleUnselect}
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
                    ]}
                    secondaryContent={[
                        { name: TOOLS.STAMP, item: <i className={"fas fa-stamp"} style={{ fontSize: '24px' }} /> },
                        { name: TOOLS.ERASER, item: <i className={"fas fa-eraser"} style={{ fontSize: '24px' }} /> },
                        { name: TOOLS.FILL, item: <i className={"fas fa-fill"} style={{ fontSize: '24px' }} onClick={() => this.props.handleTest()} /> },
                        { name: TOOLS.CROP, item: <i className={"fas fa-vector-square"} style={{ fontSize: '24px' }} /> },
                    ]}
                    rightContent={[
                        { name: TOOLS.ZOOM_OUT, item: <i className={"fas fa-search-minus"} style={{ fontSize: '24px' }} /> },
                        { name: TOOLS.ZOOM_IN, item: <i className={"fas fa-search-plus"} style={{ fontSize: '24px' }} /> },
                    ]}
                />
                <ImageWrapper style={style} width={width} height={height - 70} window="map" childRef={ref => this.tileMap = ref} />
            </Rnd>

        )
    }

}

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleTest: () => dispatch({ type: "test", test: "hi" }),
    handleUnselect: () => dispatch(handler.toolbarUnselectHandler()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MapWindow)
