import React from 'react';
import { Rnd } from 'react-rnd';
import Collapsible from '../../tools/Collapsible'
import * as handler from '../../../store/database/WorkScreenHandler';
import PropertyList from './PropertyList'
import MiniMap from './MiniMap'
import { connect } from 'react-redux';
import Titlebar from '../../tools/Titlebar'


const rect = document.body.getBoundingClientRect();
const { width, height } = rect


class PropertyWindow extends React.Component {

    state = {
        resizing: false,
        position: { x: 0, y: 0 },
        size: { width: width * 0.2, height: height * 0.7 < 442.867 ? 442.867 : height * 0.7 },
    }

    handleOnResize = (e, direction, ref, delta, position) => {
        let { width, height } = ref.style
        width = parseInt(width)
        height = parseInt(height)
        this.setState({ resizing: true, size: { width, height } })
    }

    handleStopResize = (e, direction, ref, delta, position) => {
        let { width, height } = ref.style
        width = parseInt(width)
        height = parseInt(height)
        this.setState({ resizing: false, size: { width, height } })
    }

    handleDelete = (e) => {
        e.stopPropagation();
        this.props.handleDelete();
    }

    onlyNumber = (obj) => {
        console.log(obj.value);
        obj.value = obj.value.replace(/[^\d]/gi, "");
    }

    render() {
        const { size, position } = this.state
        const { layer, map, selected, open } = this.props
        const { width, height } = size;
        const style = {
            maxWidth: width,
            maxHeight: height - 140,
        }
        const { resizing } = this.state;
        return (

            <Rnd
                className={"workscreen-window " + (open ? '' : 'invisible')}
                size={size}
                default={position}
                onMouseDown={() => this.props.handleToTop('property')}
                onResizeStart={() => this.props.handleToTop('property')}
                onResize={this.handleOnResize}
                onResizeStop={this.handleStopResize}
                onClick={this.props.handleUnselect}
                minWidth={202}
                minHeight={391}
                id='property'
            >
                <Titlebar title="Property Window" />
                <Collapsible data={
                    [
                        { title: 'Layer Property', content: <PropertyList data={layer} window='layer' width={width} />, open: false },
                        { title: 'Map Property', content: <PropertyList data={map} window='map' width={width} onKeyUp="this.value=this.value.replace(/[^\.\d]/g,'');
if(this.value.split('.').length>2){
this.value=this.value.split('.')[0]+'.'+this.value.split('.')[1]}"/>, open: true },
                        { title: 'Show Mini Map', content: <MiniMap window='minimap' style={style} width={width} height={height - 140} />, open: false },
                    ]
                }
                    maxHeight={style.maxHeight}
                    resizing={resizing}
                />
                <i className={"fas fa-trash-alt property-clear-btn better-btn " + (selected ? "" : "btn-disabled")} onClick={this.handleDelete} onMouseDown={e => e.stopPropagation()} />
                <i className={"fas fa-plus property-add-btn better-btn"} onClick={e => e.stopPropagation()} onMouseDown={e => e.stopPropagation()} />


            </Rnd>


        )
    }

}

// var mapProperty = [
//     { name: 'Width boxes', value: '', nref: React.createRef(), vref: React.createRef() },
//     { name: 'Height boxes', value: '', nref: React.createRef(), vref: React.createRef() },
//     { name: 'Box size', value: '', nref: React.createRef(), vref: React.createRef() },
// ]

const mapStateToProps = (state) => {
    const { layer, map, selected } = state.property
    return {
        layer,
        map,
        selected,
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleUnselect: () => dispatch(handler.unselectPropertyHandler()),
    handleDelete: () => dispatch(handler.deletePropertyHandler()),
    handleToTop: (window) => dispatch(handler.handleToTop(window)),
})




export default connect(mapStateToProps, mapDispatchToProps)(PropertyWindow)

