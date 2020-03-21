import React from 'react';
import { connect } from 'react-redux';
import TileMap from '../tileset/TileMap'

class MiniMap extends React.Component {


    state = {

    };


    render() {
        const { width, height, topOffset } = this.props;
        return (
            <TileMap style={this.props.style} width={width} height={height} topOffset={topOffset} window="property" />
        )
    }
}

const mapStateToProps = (state) => {

    return {

    }
};

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(MiniMap)