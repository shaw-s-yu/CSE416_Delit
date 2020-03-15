import React from 'react';
import { Rnd } from 'react-rnd';
import * as handler from '../../../store/database/WorkScreenHandler';
import { connect } from 'react-redux';

class MapWindow extends React.Component {


    render() {
        const { window } = this.props
        return (
            <Rnd
                className="workscreen-window"
                default={window}
                onMouseDown={() => { }}
            >
                map window
            </Rnd>

        )
    }

}

const mapStateToProps = (state) => {
    const { map } = state.workScreen
    return {
        window: map,
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleUnselect: () => dispatch(handler.unselectTilesetHandler()),
})

export default connect(mapStateToProps, mapDispatchToProps)(MapWindow)
