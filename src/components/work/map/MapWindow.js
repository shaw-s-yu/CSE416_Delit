import React from 'react';
import { Rnd } from 'react-rnd';
import { connect } from 'react-redux';
import Titlebar from '../navbars/Titlebar'
import * as handler from '../../../store/database/WorkScreenHandler';

class MapWindow extends React.Component {

    state = {}

    handleOnResize = (e, direction, ref, delta, position) => {
        this.props.handleToTop('map');
        const { width, height } = ref.style
        this.setState({ rander: 'go' }, () => {
            this.props.handleOnResize("map", { width, height })
        })
    }

    render() {
        const { size, position } = this.props.window
        return (
            <Rnd
                className="workscreen-window"
                size={size}
                default={position}
                onMouseDown={() => { this.props.handleToTop('map') }}
                onResize={this.handleOnResize}
            >
                <Titlebar title="Map Window" />
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
    handleOnResize: (name, value) => dispatch(handler.resizeWindowHandler(name, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MapWindow)
