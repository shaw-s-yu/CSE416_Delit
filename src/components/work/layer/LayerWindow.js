import React from 'react';
import { Rnd } from 'react-rnd';
import { connect } from 'react-redux';
import Titlebar from '../tools/Titlebar'
import LayerList from './LayerList'
import * as handler from '../../../store/database/WorkScreenHandler';

class LayerWindow extends React.Component {

    state = {}

    handleOnResize = (e, direction, ref, delta, position) => {
        this.props.handleToTop('layer');
        const { width, height } = ref.style
        this.setState({ rander: 'go' }, () => {
            this.props.handleOnResize("layer", { width, height })
        })
    }

    render() {
        const { size, position } = this.props.window
        return (
            <Rnd
                className="workscreen-window"
                size={size}
                default={position}
                onMouseDown={() => { this.props.handleToTop('layer') }}
                onResize={this.handleOnResize}
            >
                <Titlebar title="Layer Window" />
                <LayerList />
                <i className="fas fa-plus layer-add-btn" />
                <span className="opacity-text">OPACITY</span>
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
    handleOnResize: (name, value) => dispatch(handler.resizeWindowHandler(name, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LayerWindow)
