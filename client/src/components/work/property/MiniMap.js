import React from 'react';
import { connect } from 'react-redux';
import MapDisplay from '../map/MapDisplay'
class MiniMap extends React.Component {


    state = {

    };


    tileMap = React.createRef()

    render() {
        const { width, height, style, resizing } = this.props;
        return (
            <MapDisplay style={style} width={width} height={height} window="property" resizing={resizing} />
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