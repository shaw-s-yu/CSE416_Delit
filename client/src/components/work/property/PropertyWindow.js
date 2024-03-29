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
        propertyOpen: true,
        customOpen: false,
        mapOpen: false
    }

    collapsible = React.createRef()

    handleOnResize = (e, direction, ref, delta, position) => {
        this.setState({ resizing: true }, () => {
            this.props.handleOnResize(ref, position, 'property')
        })
    }

    handleStopResize = (e, direction, ref, delta, position) => {
        this.setState({ resizing: false }, () => {
            this.props.handleOnResize(ref, position, 'property')
        })
    }

    handleAddProperty = () => {
        this.collapsible.handleAddProperty()
        this.props.handleAddProperty()
    }

    handleDelete = (e) => {
        e.stopPropagation();
        this.props.handleDelete();
    }

    onlyNumber = (obj) => {
        obj.value = obj.value.replace(/[^\d]/gi, "");
    }



    render() {
        const { display, selected, open, dimension, custom, transactions } = this.props
        const { width, height } = dimension.size;
        const { propertyOpen, customOpen, mapOpen } = this.state
        const style = {
            maxWidth: width,
            maxHeight: height - 140,
        }
        const { resizing } = this.state;
        return (

            <>
                {open ? <Rnd
                    className={"workscreen-window "}
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
                    <Titlebar title="Property Window" handleClose={this.props.handleClose.bind(this, 'propertyOpen')} handleResetWindow={this.props.handleResetWindow} handleMaxWindow={this.props.handleMaxWindow} />
                    <Collapsible data={
                        [
                            { title: 'Property', content: <PropertyList data={display} window='layer' width={width} />, open: propertyOpen },
                            { title: 'Custom Property', content: <PropertyList data={custom} window='custom' width={width} type='custom' transactions={transactions} />, open: customOpen },
                            { title: 'Show Mini Map', content: <MiniMap window='minimap' style={style} width={width} height={height - 140} resizing={resizing} />, open: mapOpen },
                        ]
                    }
                        maxHeight={style.maxHeight}
                        resizing={resizing}
                        childRef={ref => this.collapsible = ref}
                    />
                    <i className={"fas fa-trash-alt property-clear-btn better-btn " + (selected ? "" : "btn-disabled")} onClick={this.handleDelete} onMouseDown={e => e.stopPropagation()} />
                    <i className={"fas fa-plus property-add-btn better-btn"} onClick={this.handleAddProperty} onMouseDown={e => e.stopPropagation()} />


                </Rnd> : null}
            </>



        )
    }

}

const mapStateToProps = (state) => {
    const { display, custom, selected } = state.property
    return {
        display, custom, selected
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleUnselect: () => dispatch(handler.unselectPropertyHandler()),
    handleDelete: () => dispatch(handler.deletePropertyHandler()),
    handleAddProperty: () => dispatch(handler.handleAddProperty()),
})




export default connect(mapStateToProps, mapDispatchToProps)(PropertyWindow)

