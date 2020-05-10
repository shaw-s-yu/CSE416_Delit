import React from 'react';
import { Rnd } from 'react-rnd';
import * as handler from '../../../store/database/WorkScreenHandler';
import { connect } from 'react-redux';
import Titlebar from '../../tools/Titlebar'
import Collapsible from '../../tools/Collapsible'
import TilesetDisplay from './TilesetDisplay'

class TilesetWindow extends React.Component {

    constructor(props) {
        super(props);
        let loaded = []
        for (let i = 0; i < this.props.tilesets.length; i++)
            loaded.push(false)

        this.state = {
            resizing: false,
            loaded: loaded
        }
    }


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

    handleGoPaint = () => {
        this.props.history.push('/tileset/ffe')
    }

    getCollapsibleList = () => {
        const { dimension, tilesets } = this.props
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
                    style={style}
                    width={width}
                    tileset={tilesets[i]}
                    height={CollapsibleHeight}
                    window="tileset"
                    childRef={ref => this.tileMap = ref} />,
                open: i === 0 ? true : false
            })
        }
        return li
    }


    render() {
        const { resizing } = this.state;
        const { open, dimension, tilesets } = this.props
        const { width, height } = dimension.size;
        const CollapsibleHeight = height - (110 - 24 * tilesets.length);
        const style = {
            maxWidth: width,
            maxHeight: CollapsibleHeight,
        }
        return (
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

                <i className="fas fa-plus tileset-add-btn better-btn " onMouseDown={e => e.stopPropagation()} onClick={this.handleGoPaint} />
                <i className="fas fa-search-plus tileset-zoomin-btn better-btn " onMouseDown={e => e.stopPropagation()} />
                <i className="fas fa-search-minus tileset-zoomout-btn better-btn " onMouseDown={e => e.stopPropagation()} />
                <i className="fas fa-trash-alt tileset-delete-btn better-btn " onMouseDown={e => e.stopPropagation()} />

            </Rnd>

        )
    }

}

const mapStateToProps = (state) => {
    const { tilesets } = state.tileset
    return {
        tilesets
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleUnselect: () => dispatch(handler.unselectTilesetHandler()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TilesetWindow)
