import React from 'react';
import { Rnd } from 'react-rnd';
import { connect } from 'react-redux';
import Titlebar from '../../tools/Titlebar'
import LayerList from './LayerList';
import Slider from '@material-ui/core/Slider';
import * as handler from '../../../store/database/WorkScreenHandler';
import LayerTransaction from '../../controller/LayerTransaction'
import mongoose from 'mongoose'

class LayerWindow extends React.Component {

    layerList = []

    handleOnResize = (e, direction, ref, delta, position) => {
        this.props.handleOnResize(ref, position, 'layer')
    };

    handleChange = (e) => {

    };

    handleAddLayer = e => {
        e.stopPropagation()
        let layerToAdd = {}
        const numRow = this.props.map.width
        const numWidth = this.props.map.height
        const data = []
        for (let i = 0; i < numRow * numWidth; i++) {
            data.push(0)
        }
        layerToAdd._id = mongoose.Types.ObjectId()
        layerToAdd.opacity = 1
        layerToAdd.name = 'New Layer Click to Rename'
        layerToAdd.locked = false
        layerToAdd.visible = true
        layerToAdd.data = data
        layerToAdd.x = 0
        layerToAdd.y = 0
        layerToAdd.type = 'tilelayer'
        layerToAdd.width = numRow
        layerToAdd.height = numWidth
        // this.props.handleAddLayer()
        this.props.transactions.addTransaction(
            new LayerTransaction(layerToAdd, this.props.layerList, this.props.handleAddLayer, this.props.restoreLayers)
        )
    }

    handleMouseDown = e => {
        e.stopPropagation()

        this.layerList = []
        const { layerList } = this.props
        for (let i in layerList) {
            this.layerList.push({
                ...layerList[i]
            })
        }
    }

    handleOnMouseUp = (e, value) => {
        e.stopPropagation()
        this.props.transactions.addTransaction(
            new LayerTransaction(value, this.layerList, this.props.handlePassOpacity, this.props.restoreLayers)
        )
        this.layerList = []
    }

    handleOpacityOnChange = (e, value) => {
        this.props.handlePassOpacity(value)
    };

    render() {
        const { open, dimension, selected, layerList, transactions } = this.props
        const { width } = dimension.size
        const maxWidth = width - 142;
        let opacity = 0
        if (selected) {
            for (let i = 0; i < layerList.length; i++) {
                if (layerList[i]._id === selected)
                    opacity = Math.floor(layerList[i].opacity * 100)
            }
        }
        return (
            <>
                {open ? <Rnd
                    className={"workscreen-window "}
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
                    <Titlebar title="Layer Window" handleClose={this.props.handleClose.bind(this, 'layerOpen')} handleResetWindow={this.props.handleResetWindow} handleMaxWindow={this.props.handleMaxWindow} />
                    <LayerList maxWidth={maxWidth} transactions={transactions} />
                    <i className="fas fa-plus layer-add-btn better-btn" onMouseDown={e => e.stopPropagation()} onClick={this.handleAddLayer} />
                    <span className="opacity-text">OPACITY:</span>
                    <div className="layer-range">
                        <Slider
                            defaultValue={0}
                            value={opacity}
                            getAriaValueText={value => value + "%"}
                            aria-labelledby="discrete-slider"
                            valueLabelDisplay="auto"
                            marks
                            min={0}
                            max={100}
                            onMouseDown={this.handleMouseDown}
                            onChange={this.handleOpacityOnChange}
                            onChangeCommitted={this.handleOnMouseUp}
                            disabled={!selected}
                        />
                    </div>
                </Rnd> : null}
            </>


        )
    }

}

const mapStateToProps = (state) => {
    const { layerList, selected } = state.layer;
    const { map } = state.map
    return {
        layerList, map,
        selected
    }
};

const mapDispatchToProps = (dispatch) => ({
    handlePassOpacity: (value) => dispatch(handler.passOpacityHandler(value)),
    handleAddLayer: (layer) => dispatch(handler.layerAddHandler(layer)),
    restoreLayers: (layerList) => dispatch(handler.restoreLayers(layerList)),
})

export default connect(mapStateToProps, mapDispatchToProps)(LayerWindow)
