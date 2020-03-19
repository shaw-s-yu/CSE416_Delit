import React from 'react';
import { connect } from 'react-redux';
import * as handler from '../../../store/database/WorkScreenHandler';
import TileMap from '../tileset/TileMap'

class MiniMap extends React.Component {


    state = {

    };


    handleChange = (index, name, e) => {
        const { window } = this.props;
        this.props.handleChange(window, index, name, e.target.value)
        this.setState({ nothing: 'nothing' })
    };

    handleSelect = (index, e) => {
        const { window } = this.props;
        this.setState({ nothing: 'nothing' }, () => {
            this.props.handleSelect(window, index);
        })
    }

    getClassName = (index) => {
        const { selected, window } = this.props;
        if (!selected)
            return 'table-row'
        else if (selected.window !== window)
            return 'table-row'
        else if (selected.index !== index)
            return 'table-row'
        else
            return 'table-row table-row-selected'
    }


    render() {
        return (
            <TileMap style={this.props.style} />
        )
    }
}

const mapStateToProps = (state) => {
    const { width } = state.workScreen.property.size
    const { selected } = state.property
    return {
        width: width,
        selected: selected,
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleSelect: (name, value) => dispatch(handler.selectPropertyHandler(name, value)),
    handleChange: (name, index, type, value) => dispatch(handler.changePropertyHandler(name, index, type, value))
})

export default connect(mapStateToProps, mapDispatchToProps)(MiniMap)