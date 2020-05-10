import React from 'react';
import { Rnd } from 'react-rnd';
import Collapsible from '../../tools/Collapsible'
import * as handler from '../../../store/database/WorkScreenHandler';
import PropertyList from './PropertyList'
import MiniMap from './MiniMap'
import { connect } from 'react-redux';
import Titlebar from '../../tools/Titlebar'




class PropertyWindow extends React.Component {

    state = {
        resizing: false,
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
        const { display, selected, open, dimension } = this.props
        const { width, height } = dimension.size;
        const style = {
            maxWidth: width,
            maxHeight: height - 140,
        }
        const { resizing } = this.state;
        return (

            <Rnd
                className={"workscreen-window " + (open ? '' : 'invisible')}
                size={dimension.size}
                position={dimension.position}
                onMouseDown={() => this.props.handleToTop('property')}
                onResizeStart={() => this.props.handleToTop('property')}
                onResize={this.handleOnResize}
                onResizeStop={this.handleStopResize}
                onClick={this.props.handleUnselect}
                minWidth={202}
                minHeight={391}
                id='property'
                onDragStop={(e, d) => this.props.handleOnDragStop(e, d, 'property')}
                style={{ zIndex: dimension.zIndex }}
            >
                <Titlebar title="Property Window" />
                <Collapsible data={
                    [
                        { title: 'Property', content: <PropertyList data={display} window='layer' width={width} />, open: true },
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

const mapStateToProps = (state) => {
    const { display } = state.property
    return {
        display,
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleUnselect: () => dispatch(handler.unselectPropertyHandler()),
    handleDelete: () => dispatch(handler.deletePropertyHandler()),
})




export default connect(mapStateToProps, mapDispatchToProps)(PropertyWindow)

