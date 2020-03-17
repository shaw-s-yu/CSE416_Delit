import React from 'react';
import { Rnd } from 'react-rnd';
import TileMap from './TileMap'
import * as handler from '../../../store/database/WorkScreenHandler';
import { connect } from 'react-redux';
import Titlebar from '../../tools/Titlebar'
import Collapsible from '../../tools/Collapsible'

class TilesetWindow extends React.Component {

    state = {

    }
    handleSelect = () => {
        this.props.handleUnselect()
        this.props.handleToTop('tileset');
    }


    handleOnResize = (e, direction, ref, delta, position) => {
        this.props.handleToTop('tileset');
        const { width, height } = ref.style
        this.setState({ rander: 'go' }, () => {
            this.props.handleOnResize("tileset", { width, height })
        })
    }

    render() {
        const { size, position } = this.props.window;
        return (
            <Rnd
                className="workscreen-window"
                default={position}
                size={size}
                onMouseDown={this.handleSelect}
                onResize={this.handleOnResize}
                id='fe'
            >
                <Titlebar title="Tileset Window" />

                <Collapsible data={
                    [
                        { title: 'Tileset 1', content: <TileMap />, open: false },
                        { title: 'Tileset 2', content: <TileMap />, open: true },
                    ]
                }
                    maxHeight='265px'
                />

                <i className="fas fa-plus tileset-add-btn better-btn " onMouseDown={this.props.handleStopPropagation} />
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
