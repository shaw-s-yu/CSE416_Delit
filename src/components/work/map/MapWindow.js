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
                onMouseDown={() => { this.props.handleToTop('map') }}
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
})

export default connect(mapStateToProps, mapDispatchToProps)(MapWindow)
