import React from 'react';
import { Rnd } from 'react-rnd';
import { connect } from 'react-redux';
import Titlebar from '../../tools/Titlebar'
import LayerList from './LayerList'
import * as handler from '../../../store/database/WorkScreenHandler';
import Slider from '@material-ui/core/Slider';


const rect = document.body.getBoundingClientRect();
const { width, height } = rect

class LayerWindow extends React.Component {

    state = {
        position: { x: width * 0.8, y: 0 },
        size: { width: width * 0.2, height: height * 0.28 < 177.15 ? 177.15 : height * 0.28 },
    }

    handleOnResize = (e, direction, ref, delta, position) => {
        let { width, height } = ref.style
        width = parseInt(width)
        height = parseInt(height)
        this.setState({ size: { width, height } })
    }

    handleChange = (e) => {

    }

    adjustSize = () => {
        const { width, height } = document.body.getBoundingClientRect();
        this.setState({
            size: {
                width: width * 0.2, height: height * 0.36 < 265.717 ? 265.717 : height * 0.36
            },
        })
    }

    componentDidMount() {
        this.adjustSize()
        window.onresize = () => {
            this.adjustSize()
        }
    }

    render() {
        const { size, position } = this.state
        const { open } = this.props
        const { width } = size
        const maxWidth = width - 142;

        return (
            <Rnd
                className={"workscreen-window " + (open ? '' : 'invisible')}
                size={size}
                default={position}
                onMouseDown={() => { this.props.handleToTop('layer') }}
                onResize={this.handleOnResize}
                onResizeStop={this.handleOnResize}
                onResizeStart={() => this.props.handleToTop('layer')}
                id='layer'
            >
                <Titlebar title="Layer Window" />
                <LayerList maxWidth={maxWidth} />
                <i className="fas fa-plus layer-add-btn better-btn" onMouseDown={e => e.stopPropagation()} />
                <span className="opacity-text">OPACITY:</span>
                <div className="layer-range">
                    <Slider
                        defaultValue={30}
                        getAriaValueText={value => value + "%"}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        marks
                        min={0}
                        max={100}
                        onMouseDown={e => e.stopPropagation()}
                    />
                </div>
            </Rnd>

        )
    }

}

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleToTop: (window) => dispatch(handler.handleToTop(window)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LayerWindow)
