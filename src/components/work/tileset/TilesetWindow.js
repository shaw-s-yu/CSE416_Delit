import React from 'react';
import { Rnd } from 'react-rnd';
import TileMap from './TileMap'
import * as handler from '../../../store/database/WorkScreenHandler';
import { connect } from 'react-redux';
import Titlebar from '../navbars/Titlebar'
import { Collapsible, CollapsibleItem, Icon, Button } from 'react-materialize'


class TilesetWindow extends React.Component {

    state = {

    }
    handleSelect = () => {
        this.props.handleUnselect()
        this.props.handleToTop('tileset');
    }


    handleOnResize = (e, direction, ref, delta, position) => {
        this.props.handleToTop('tileset');
        const { width, height } = ref.style
        this.setState({ rander: 'go' }, () => {
            this.props.handleOnResize("tileset", { width, height })
        })
    }

    render() {
        const { size, position } = this.props.window;
        return (
            <Rnd
                className="workscreen-window"
                default={position}
                size={size}
                onMouseDown={this.handleSelect}
                onResize={this.handleOnResize}
                id='fe'
            >
                <Titlebar title="Tileset Window" />
                <Collapsible accordion onMouseDown={e => e.stopPropagation()}>
                    <CollapsibleItem
                        expanded={false}
                        header="Map Property"
                        node="div"
                        icon={<Icon>arrow_drop_down</Icon>}
                    >
                        <TileMap />
                    </CollapsibleItem>
                    <CollapsibleItem
                        expanded
                        header="Layer Property"
                        node="div"
                        icon={<Icon>arrow_drop_down</Icon>}
                    >
                        <TileMap />
                    </CollapsibleItem>

                </Collapsible>

                <Button small
                    waves="red"
                    node="button"
                    className="tilest-add-btn"
                    floating
                    icon={<Icon>add</Icon>}
                    onMouseDown={e => e.stopPropagation()}>
                </Button>

            </Rnd>

        )
    }

}


const mapStateToProps = (state) => {
    const { tileset } = state.workScreen
    return {
        window: tileset,
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleUnselect: () => dispatch(handler.unselectTilesetHandler()),
    handleOnResize: (name, value) => dispatch(handler.resizeWindowHandler(name, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TilesetWindow)
