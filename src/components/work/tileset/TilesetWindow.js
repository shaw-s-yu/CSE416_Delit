import React from 'react';
import { Rnd } from 'react-rnd';
import TileMap from './TileMap'
import * as handler from '../../../store/database/WorkScreenHandler';
import { connect } from 'react-redux';
import Titlebar from '../../tools/Titlebar'
import Collapsible from '../../tools/Collapsible'

class TilesetWindow extends React.Component {

    state = {
        resizing: false,
    }
    handleSelect = () => {
        this.props.handleUnselect()
        this.props.handleToTop('tileset');
    }


    handleOnResize = (e, direction, ref, delta, position) => {
        this.props.handleToTop('tileset');
        const { width, height } = ref.style
        this.setState({ resizing: true }, () => {
            this.props.handleOnResize("tileset", { width, height })
        })
    }

    handleStopResize = (e, direction, ref, delta, position) => {
        this.props.handleToTop('tileset');
        const { width, height } = ref.style
        this.setState({ resizing: false }, () => {
            this.props.handleOnResize("tileset", { width, height })
        })
    }

    render() {
        const { size, position } = this.props.window;
        const { width, height } = size;
        const { resizing } = this.state;
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
                onResize={this.handleOnResize}
                onResizeStop={this.handleStopResize}
                id='fe'
            >
                <Titlebar title="Tileset Window" />

                <Collapsible data={
                    [
                        { title: 'Tileset 1', content: <TileMap style={style} width={width} height={height - 110} />, open: false },
                        { title: 'Tileset 2', content: <TileMap style={style} width={width} height={height - 110} />, open: true },
                    ]
                }
                    maxHeight={style.maxHeight}
                    resizing={resizing}
                />

                <i className="fas fa-plus tileset-add-btn better-btn " onMouseDown={this.props.handleStopPropagation} onClick={this.props.handleGoPaint} />
                <i className="fas fa-search-plus tileset-zoomin-btn better-btn " onMouseDown={this.props.handleStopPropagation} />
                <i className="fas fa-search-minus tileset-zoomout-btn better-btn " onMouseDown={this.props.handleStopPropagation} />
                <i className="fas fa-trash-alt tileset-delete-btn better-btn " onMouseDown={this.props.handleStopPropagation} />

            </Rnd>

        )
    }

}


const mapStateToProps = (state) => {
    const { tileset } = state.workScreen
    return {
        window: tileset,
        handleStopPropagation: e => e.stopPropagation(),
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleUnselect: () => dispatch(handler.unselectTilesetHandler()),
    handleOnResize: (name, value) => dispatch(handler.resizeWindowHandler(name, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TilesetWindow)
