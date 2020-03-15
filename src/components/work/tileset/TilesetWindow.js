import React from 'react';
import { Rnd } from 'react-rnd';
import TileMap from './TileMap'
import * as handler from '../../../store/database/WorkScreenHandler';
import { connect } from 'react-redux';



class TilesetWindow extends React.Component {

    render() {
        const { window } = this.props;
        return (
            <Rnd
                className="workscreen-window"
                default={window}
                onMouseDown={this.props.handleUnselect}
            >
                <TileMap />
            </Rnd>

        )
    }

}


const mapStateToProps = (state) => {
    const { tileset } = state.workScreen
    return {
        window: tileset,
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleUnselect: () => dispatch(handler.unselectTilesetHandler()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TilesetWindow)
