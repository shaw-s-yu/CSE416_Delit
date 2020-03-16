import React from 'react';
import { Rnd } from 'react-rnd';
import { Collapsible, CollapsibleItem, Icon, Button } from 'react-materialize'
import * as handler from '../../../store/database/WorkScreenHandler';
import PropertyList from './PropertyList'
import { connect } from 'react-redux';
import 'react-perfect-scrollbar/dist/css/styles.css';
import Titlebar from '../navbars/Titlebar'

class PropertyWindow extends React.Component {

    state = {
    }

    handleOnResize = (e, direction, ref, delta, position) => {
        this.props.handleToTop('property');
        const { width, height } = ref.style
        this.setState({ rander: 'go' }, () => {
            this.props.handleOnResize("property", { width, height })
        })
    }

    render() {
        const { size, position } = this.props.window
        const { layer, map, selected } = this.props
        return (

            <Rnd
                className="workscreen-window"
                size={size}
                default={position}
                onMouseDown={() => {
                    this.props.handleToTop('property')
                    this.props.handleUnselect()
                }}
                onResize={this.handleOnResize}
                onClick={this.props.handleUnselect}
            >
                <Titlebar title="Property Window" />
                <Collapsible accordion onMouseDown={e => e.stopPropagation()}>
                    <CollapsibleItem
                        expanded={false}
                        header="Map Property"
                        node="div"
                        icon={<Icon>arrow_drop_down</Icon>}
                    >
                        <PropertyList data={layer} window='layer' />
                    </CollapsibleItem>
                    <CollapsibleItem
                        expanded
                        header="Layer Property"
                        node="div"
                        icon={<Icon>arrow_drop_down</Icon>}
                    >
                        <PropertyList data={map} window='map' />
                    </CollapsibleItem>

                </Collapsible>
                <Button
                    className="red property-clear-btn"
                    floating
                    icon={<Icon>clear</Icon>}
                    disabled={selected ? false : true}
                    small
                    node="button"
                    waves="light"
                    onClick={this.props.handleSidebarOpen}
                />
                <Button
                    className="red property-add-btn"
                    floating
                    icon={<Icon>add</Icon>}
                    small
                    node="button"
                    waves="light"
                    onClick={this.props.handleSidebarOpen}
                />
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
        selected
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleOnResize: (name, value) => dispatch(handler.resizeWindowHandler(name, value)),
    handleUnselect: () => dispatch(handler.unselectPropertyHandler()),
})

export default connect(mapStateToProps, mapDispatchToProps)(PropertyWindow)
