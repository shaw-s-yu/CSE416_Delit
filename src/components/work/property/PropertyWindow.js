import React from 'react';
import { Rnd } from 'react-rnd';
import { Collapsible, CollapsibleItem, Icon } from 'react-materialize'
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
        return (

            <Rnd
                className="workscreen-window"
                size={size}
                default={position}
                onMouseDown={() => { this.props.handleToTop('property') }}
                onResize={this.handleOnResize}
            >
                <Titlebar title="Property Window" />
                <Collapsible accordion onMouseDown={e => e.stopPropagation()}>
                    <CollapsibleItem
                        expanded={false}
                        header="Map Property"
                        node="div"
                        icon={<Icon>arrow_drop_down</Icon>}
                    >
                        <PropertyList />
                    </CollapsibleItem>
                    <CollapsibleItem
                        expanded
                        header="Tileset Property"
                        node="div"
                        icon={<Icon>arrow_drop_down</Icon>}
                    >
                        <PropertyList />
                    </CollapsibleItem>

                </Collapsible>
            </Rnd>


        )
    }

}

const mapStateToProps = (state) => {
    const { property } = state.workScreen
    return {
        window: property,
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleOnResize: (name, value) => dispatch(handler.resizeWindowHandler(name, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(PropertyWindow)
