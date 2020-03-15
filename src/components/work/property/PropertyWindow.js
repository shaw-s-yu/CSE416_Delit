import React from 'react';
import { Rnd } from 'react-rnd';
import { Collapsible, CollapsibleItem, Icon } from 'react-materialize'
import PropertyList from './PropertyList'
import { connect } from 'react-redux';
import PerfectScrollbar from 'react-perfect-scrollbar'
import 'react-perfect-scrollbar/dist/css/styles.css';

class PropertyWindow extends React.Component {

    render() {
        const { window } = this.props
        return (

            <Rnd
                className="workscreen-window"
                default={window}
                onMouseDown={() => { this.props.handleToTop('property') }}
            >
                <PerfectScrollbar>
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
                </PerfectScrollbar>
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
})

export default connect(mapStateToProps, mapDispatchToProps)(PropertyWindow)
