import React from 'react';
import { connect } from 'react-redux';
import { Rnd } from 'react-rnd';
import TileMap from './TileMap'
import { unselectTilesetHandler } from '../../../store/database/WorkScreenHandler';

const rect = document.body.getBoundingClientRect();

class TilesetWindow extends React.Component {

    render() {
        const { width, height } = rect
        const x = width * 0.8;
        const y = height * 0.7 * 0.4;
        return (
            <Rnd
                className="workscreen-window"
                default={{
                    x: x,
                    y: y,
                    width: width * 0.2,
                    height: height * 0.7 * 0.6,
                }}
                onClick={this.props.handleUnselect}
            >
                <TileMap />
            </Rnd>

        )
    }

}

const mapDispatchToProps = (dispatch) => ({
    handleUnselect: () => dispatch(unselectTilesetHandler()),
})

export default connect(null, mapDispatchToProps)(TilesetWindow);;
