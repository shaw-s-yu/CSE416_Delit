import React from 'react';
import { Rnd } from 'react-rnd';
import { connect } from 'react-redux';
import Titlebar from '../../tools/Titlebar'
import LayerList from './LayerList'
import Slider from '@material-ui/core/Slider';
import QueryList from '../../../graphql/Query';
import { Query} from "@apollo/react-components";
import CircularProgress from "@material-ui/core/CircularProgress";
import * as handler from "../../../store/database/WorkScreenHandler";


class LayerWindow extends React.Component {


    handleOnResize = (e, direction, ref, delta, position) => {
        this.props.handleOnResize(ref, position, 'layer')
    }

    handleOpacityOnChange = (e, value) => {
        this.props.handlePassOpacity(value);
    };
    handleOpacityValue = () => {
        // const { layerList, selected } = this.props.layerList;
        // const value = layerList.map( layer =>{
        //     if(layer._id === selected) {
        //         return layer.opacity;
        //     }
        // });
        // console.log(value);
        // return value;
    };


    render() {
        const { open, dimension, projectId } = this.props;
        const { width } = dimension.size;
        const maxWidth = width - 142;

        return (
            <Rnd
                className={"workscreen-window " + (open ? '' : 'invisible')}
                size={dimension.size}
                position={dimension.position}
                onMouseDown={() => { this.props.handleToTop('layer') }}
                onResize={this.handleOnResize}
                onResizeStop={this.handleOnResize}
                onResizeStart={() => this.props.handleToTop('layer')}
                id='layer'
                onDragStop={(e, d) => this.props.handleOnDragStop(e, d, 'layer')}
                style={{ zIndex: dimension.zIndex }}
            >
                <Titlebar title="Layer Window" />
                <LayerList maxWidth={maxWidth} />
                <i className="fas fa-plus layer-add-btn better-btn" onMouseDown={e => e.stopPropagation()} />
                <span className="opacity-text">OPACITY:</span>
                <div className="layer-range">
                    <Slider
                        defaultValue={0}
                        getAriaValueText={value => value + "%"}
                        aria-labelledby="discrete-slider"
                        valueLabelDisplay="auto"
                        marks
                        min={0}
                        max={100}
                        onMouseDown={e => e.stopPropagation()}
                        onChange={this.handleOpacityOnChange}
                        disabled={!selected}
                        // value={this.handleOpacityValue}
                    />
                </div>
            </Rnd>
        )
    }

}

const mapStateToProps = (state) => {
    const { layerList, selected } = state.layer
    return {
        layerList,
        selected
    }

};

const mapDispatchToProps = (dispatch) => ({
    handlePassOpacity: (value) => dispatch(handler.passOpacityHandler(value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LayerWindow)
