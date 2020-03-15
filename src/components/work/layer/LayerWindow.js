import React from 'react';
import { Rnd } from 'react-rnd';
import * as handler from '../../../store/database/WorkScreenHandler';
import { connect } from 'react-redux';

class LayerWindow extends React.Component {

    render() {
        const { window } = this.props
        return (
            <Rnd
                className="workscreen-window"
                default={window}
                onMouseDown={() => { this.props.handleToTop('layer') }}
            >
                Layer Window
            </Rnd>

        )
    }

}

const mapStateToProps = (state) => {
    const { layer } = state.workScreen
    return {
        window: layer,
    }
};

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(LayerWindow)
