import React from 'react';
import { Rnd } from 'react-rnd';
import Collapsible from '../../tools/Collapsible'
import * as handler from '../../../store/database/WorkScreenHandler';
import PropertyList from './PropertyList'
import { connect } from 'react-redux';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Titlebar from '../../tools/Titlebar'

class PropertyWindow extends React.Component {

    state = {
        columns: [
            { title: 'Property', field: 'property' },
            { title: 'Value', field: 'value' },
        ]
    }

    handleOnResize = (e, direction, ref, delta, position) => {
        this.props.handleToTop('property');
        const { width, height } = ref.style
        this.setState({ rander: 'go' }, () => {
            this.props.handleOnResize("property", { width, height })
        })
    }

    handleDelete = (e) => {
        e.stopPropagation();
        this.props.handleDelete();
    }

    render() {
        const { size, position } = this.props.window
        const { layer, map, minimap, selected } = this.props
        return (

            <Rnd
                className="workscreen-window"
                size={size}
                default={position}
                onMouseDown={() => {
                    this.props.handleToTop('property')
                }}
                onResize={this.handleOnResize}
                onClick={this.props.handleUnselect}
                minWidth={202}
                minHeight={391}
            >
                <Titlebar title="Property Window" />
                <Collapsible data={
                    [
                        { title: 'Layer Property', content: <PropertyList data={layer} window='layer' />, open: false },
                        { title: 'Map Property', content: <PropertyList data={map} window='map' />, open: false },
                        { title: 'Show Mini Map', content: <PropertyList data={minimap} window='minimap' />, open: true },
                    ]
                }
                             maxHeight='265px'
                />
                <i className={"fas fa-trash-alt property-clear-btn better-btn " + (selected ? "" : "btn-disabled")} onClick={this.handleDelete} onMouseDown={this.props.handleStopPropagation} />
                <i className={"fas fa-plus property-add-btn better-btn"} onClick={this.props.handleSidebarOpen} onMouseDown={this.props.handleStopPropagation} />


            </Rnd>


        )
    }

}

const mapStateToProps = (state) => {
    const { property } = state.workScreen
    const { layer, map, selected } = state.property
    return {
        window: property,
        layer,
        map,
        selected,
        handleStopPropagation: e => e.stopPropagation(),
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleOnResize: (name, value) => dispatch(handler.resizeWindowHandler(name, value)),
    handleUnselect: () => dispatch(handler.unselectPropertyHandler()),
    handleDelete: () => dispatch(handler.deletePropertyHandler())
})

export default connect(mapStateToProps, mapDispatchToProps)(PropertyWindow)


