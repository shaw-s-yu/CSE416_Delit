import React from 'react';
import { Rnd } from 'react-rnd';
import * as handler from '../../../store/database/WorkScreenHandler';
import { connect } from 'react-redux';
import Titlebar from '../../tools/Titlebar'
import Collapsible from '../../tools/Collapsible'
import TilesetDisplay from './TilesetDisplay'
import SelectTilesetDialog from "./SelectTilesetDialog";
import TOOLS from '../../tools/ToolbarTools'


class TilesetWindow extends React.Component {

    constructor(props) {
        super(props);
        let loaded = []
        for (let i = 0; i < this.props.tilesets.length; i++)
            loaded.push(false)

        this.state = {
            resizing: false,
            loaded: loaded,
            selectTilesetDialogOpen: false,
            selectedTool: ''
        }
    }

    handleZoomIn = () => {
        // console.log(this.props)
        this.setState({ selectedTool: TOOLS.ZOOM_IN })
    }

    handleZoomOut = () => {
        this.setState({ selectedTool: TOOLS.ZOOM_OUT })
    }

    handleUnselectZoom = () => {
        this.setState({ selectedTool: '' })
    }

    handleOpenSelectTilesetDialog = () => {
        this.setState({ selectTilesetDialogOpen: true });
    };

    handleCloseSelectTilesetDialog = () => {
        this.setState({ selectTilesetDialogOpen: false });
    };

    tileMap = React.createRef()

    handleTilesetLoaded = (index) => {
        let loaded = [...this.state.loaded]
        loaded[index] = true
        this.setState({ loaded }, () => {
            this.handleCheckAllTilesetLoaded()
        })
    }

    handleCheckAllTilesetLoaded = () => {
        const { loaded } = this.state
        let allLoaded = true
        loaded.forEach(e => {
            if (!e) {
                allLoaded = false
            }
        })
        if (allLoaded)
            this.props.handleTilesetLoaded()
    }

    handleSelect = () => {
        this.props.handleUnselect()
        this.props.handleToTop('tileset');
    }


    handleOnResize = (e, direction, ref, delta, position) => {
        this.setState({ resizing: true }, () => {
            this.props.handleOnResize(ref, position, 'tileset')
        })
    }

    handleStopResize = (e, direction, ref, delta, position) => {
        this.setState({ resizing: false }, () => {
            this.props.handleOnResize(ref, 'tileset')
        })
    }

    getCollapsibleList = () => {
        const { dimension, tilesets } = this.props
        const { selectedTool } = this.state
        const { width, height } = dimension.size;
        const CollapsibleHeight = height - 86 - 24 * tilesets.length;
        const style = {
            maxWidth: width,
            maxHeight: CollapsibleHeight,
        }
        let li = []
        for (let i = 0; i < tilesets.length; i++) {
            li.push({
                title: tilesets[i].name,
                content: <TilesetDisplay
                    handleTilesetLoaded={() => this.handleTilesetLoaded(i)}
                    tilesetIdApplier={(id) => this.props.tilesetIdApplier(id, i)}
                    index={i}
                    style={style}
                    width={width}
                    tileset={tilesets[i]}
                    height={CollapsibleHeight}
                    window="tileset"
                    childRef={ref => this.tileMap = ref}
                    selectedTool={selectedTool} />,
                open: i === 0 ? true : false
            })
        }
        return li
    };

    componentDidMount() {
        window.onclick = e => {
            if (e.target !== this.refs.zoom_in_btn && e.target !== this.refs.zoom_out_btn)
                this.handleUnselectZoom()
        }
    }

    render() {
        const { resizing, selectTilesetDialogOpen, selectedTool } = this.state;
        const { open, dimension, tilesets, history } = this.props
        const { width, height } = dimension.size;
        const CollapsibleHeight = height - (110 - 24 * tilesets.length);
        const style = {
            maxWidth: width,
            maxHeight: CollapsibleHeight,
        };
        return (
            <>
                <Rnd
                    className={"workscreen-window " + (open ? '' : 'invisible')}
                    position={dimension.position}
                    size={dimension.size}
                    onMouseDown={this.handleSelect}
                    onResizeStart={() => this.props.handleToTop('tileset')}
                    onResize={this.handleOnResize}
                    onResizeStop={this.handleStopResize}
                    id='tileset'
                    onDragStop={(e, d) => this.props.handleOnDragStop(e, d, 'tileset')}
                    style={{ zIndex: dimension.zIndex }}
                >
                    <Titlebar title="Tileset Window" />

                    <Collapsible data={
                        this.getCollapsibleList()
                    }
                        maxHeight={style.maxHeight}
                        resizing={resizing}
                    />

                    <i className="fas fa-plus tileset-add-btn better-btn " onMouseDown={e => e.stopPropagation()} onClick={this.handleOpenSelectTilesetDialog} />
                    <i ref='zoom_in_btn' className={"fas fa-search-plus tileset-zoomin-btn better-btn " + (selectedTool === TOOLS.ZOOM_IN ? 'tool-selected' : '')} onMouseDown={e => e.stopPropagation()} onClick={this.handleZoomIn} />
                    <i ref='zoom_out_btn' className={"fas fa-search-minus tileset-zoomout-btn better-btn " + (selectedTool === TOOLS.ZOOM_OUT ? 'tool-selected' : '')} onMouseDown={e => e.stopPropagation()} onClick={this.handleZoomOut} />
                    <i className="fas fa-trash-alt tileset-delete-btn better-btn " onMouseDown={e => e.stopPropagation()} />

                </Rnd>
                <SelectTilesetDialog
                    open={selectTilesetDialogOpen}
                    close={this.handleCloseSelectTilesetDialog}
                    history={history}
                    tilesets={tilesets}
                />
            </>
        )
    }

}

const mapStateToProps = (state) => {
    const { tilesets } = state.tileset
    // console.log("window:", state);

    return {
        tilesets
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleUnselect: () => dispatch(handler.unselectTilesetHandler()),
    handleTilesetLoaded: () => dispatch(handler.handleTilesetLoaded()),
    tilesetIdApplier: (id, index) => dispatch(handler.tilesetIdApplier(id, index)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TilesetWindow)
