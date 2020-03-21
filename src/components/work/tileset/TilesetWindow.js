import React from 'react';
import { Rnd } from 'react-rnd';
import TileMap from './TileMap'
import * as handler from '../../../store/database/WorkScreenHandler';
import { connect } from 'react-redux';
import Titlebar from '../../tools/Titlebar'
import Collapsible from '../../tools/Collapsible'


const rect = document.body.getBoundingClientRect();
const { width, height } = rect

class TilesetWindow extends React.Component {

    state = {
        resizing: false,
        position: { x: width * 0.8, y: height * 0.28 < 177.15 ? 177.15 : height * 0.28 },
        size: { width: width * 0.2, height: height * 0.42 < 265.717 ? 265.717 : height * 0.42 },
    }


    handleSelect = () => {
        this.props.handleUnselect()
        this.props.handleToTop('tileset');
    }


    handleOnResize = (e, direction, ref, delta, position) => {
        let { width, height } = ref.style
        width = parseInt(width)
        height = parseInt(height)
        this.setState({ resizing: true, size: { width, height } })
    }

    handleStopResize = (e, direction, ref, delta, position) => {
        let { width, height } = ref.style
        width = parseInt(width)
        height = parseInt(height)
        this.setState({ resizing: false, size: { width, height } })
    }

    render() {
        const { resizing, size, position } = this.state;
        const { width, height } = size;
        const style = {
            maxWidth: width,
            maxHeight: height - 110,
        }
        return (
            <Rnd
                className="workscreen-window"
                default={position}
                size={size}
                onMouseDown={this.handleSelect}
                onResizeStart={() => this.props.handleToTop('tileset')}
                onResize={this.handleOnResize}
                onResizeStop={this.handleStopResize}
                id='tileset'
            >
                <Titlebar title="Tileset Window" />

                <Collapsible data={
                    [
                        { title: 'Tileset 1', content: <TileMap style={style} width={width} height={height - 110} window="tileset" />, open: false },
                        { title: 'Tileset 2', content: <TileMap style={style} width={width} height={height - 110} window="tileset" />, open: true },
                    ]
                }
                    maxHeight={style.maxHeight}
                    resizing={resizing}
                />

                <i className="fas fa-plus tileset-add-btn better-btn " onMouseDown={e => e.stopPropagation()} onClick={this.props.handleGoPaint} />
                <i className="fas fa-search-plus tileset-zoomin-btn better-btn " onMouseDown={e => e.stopPropagation()} />
                <i className="fas fa-search-minus tileset-zoomout-btn better-btn " onMouseDown={e => e.stopPropagation()} />
                <i className="fas fa-trash-alt tileset-delete-btn better-btn " onMouseDown={e => e.stopPropagation()} />

            </Rnd>

        )
    }

}


const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => ({
    handleUnselect: () => dispatch(handler.unselectTilesetHandler()),
    handleToTop: (window) => dispatch(handler.handleToTop(window)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TilesetWindow)
