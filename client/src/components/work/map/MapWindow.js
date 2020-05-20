import React from 'react';
import { Rnd } from 'react-rnd';
import { connect } from 'react-redux';
import Titlebar from '../../tools/Titlebar'
import * as handler from '../../../store/database/WorkScreenHandler';
import Toolbar from '../../tools/Toolbar'
import MapDisplay from './MapDisplay'
import TOOLS from '../../tools/ToolbarTools'


class MapWindow extends React.Component {

    state = {
        resizing: false
    }

    tileMap = React.createRef()

    handleOnResize = (e, direction, ref, delta, position) => {
        this.setState({ resizing: true }, () => {
            this.props.handleOnResize(ref, position, 'map')
        })
    }

    handleOnResizeStop = (e, direction, ref, delta, position) => {
        this.setState({ resizing: false }, () => {
            this.props.handleOnResize(ref, position, 'map')
        })
    }

    doTransaction = e => {
        this.props.transactions.doTransaction()
    }

    undoTransaction = e => {
        this.props.transactions.undoTransaction()
    }

    render() {
        const { resizing } = this.state
        const { dimension, selectedTool, transactions, open } = this.props
        const { width, height } = dimension.size
        const style = {
            maxWidth: width,
            maxHeight: height - 90,
            marginTop: '20px'
        }
        return (
            <>
                {open ? <Rnd
                    className="workscreen-window "
                    id="map"
                    size={dimension.size}
                    position={dimension.position}
                    onMouseDown={() => { this.props.handleToTop('map') }}
                    onClick={this.props.handleUnselect}
                    onResizeStart={() => this.props.handleToTop('map')}
                    onResize={this.handleOnResize}
                    onResizeStop={this.handleOnResizeStop}
                    onDragStop={(e, d) => this.props.handleOnDragStop(e, d, 'map')}
                    style={{ zIndex: dimension.zIndex }}
                >
                    <Titlebar title="Map Window" handleClose={this.props.handleClose.bind(this, 'mapOpen')} handleResetWindow={this.props.handleResetWindow} handleMaxWindow={this.props.handleMaxWindow} />
                    <Toolbar
                        className="map-toolbar"
                        selected={selectedTool}
                        content={[
                            { name: TOOLS.UNDO, item: <i className={"fas fa-undo"} style={{ fontSize: '24px' }} onClick={this.undoTransaction} /> },
                            { name: TOOLS.REDO, item: <i className={"fas fa-redo"} style={{ fontSize: '24px' }} onClick={this.doTransaction} /> },
                            { name: TOOLS.DOWNLOAD, item: <i className={"fas fa-download"} style={{ fontSize: '24px' }} onClick={this.props.handleExport} /> },
                            { name: TOOLS.SAVE, item: <i className={"fas fa-save"} style={{ fontSize: '24px' }} onClick={this.props.handleSave} /> },
                            // { name: TOOLS.EXPORT_JSON, item: <i className={"fas fa-box"} style={{ fontSize: '24px' }} onClick={this.handleExportJson} /> },
                        ]}
                        secondaryContent={[
                            { name: TOOLS.STAMP, item: <i className={"fas fa-stamp"} style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.ERASER, item: <i className={"fas fa-eraser"} style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.FILL, item: <i className={"fas fa-fill"} style={{ fontSize: '24px' }} onClick={() => this.props.handleTest()} /> },
                        ]}
                        rightContent={[
                            { name: TOOLS.ZOOM_OUT, item: <i className={"fas fa-search-minus"} style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.ZOOM_IN, item: <i className={"fas fa-search-plus"} style={{ fontSize: '24px' }} /> },
                        ]}
                    />
                    <MapDisplay style={style} width={width} height={height - 70} window="map" resizing={resizing} transactions={transactions} />
                </Rnd> : null
                }
            </>


        )
    }

}

const mapStateToProps = (state) => {
    return {}
};

const mapDispatchToProps = (dispatch) => ({
    handleTest: () => dispatch({ type: "test", test: "hi" }),
    handleUnselect: () => dispatch(handler.toolbarUnselectHandler()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MapWindow)
