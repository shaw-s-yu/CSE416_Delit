import React from 'react';
import { connect } from 'react-redux';
import ImageWrapper from '../canvas/ImageWrapper'

class MiniMap extends React.Component {


    state = {

    };


    tileMap = React.createRef()

    render() {
        const { width, height, style } = this.props;
        return (
            <ImageWrapper style={style} width={width} height={height} window="property" childRef={ref => this.tileMap = ref} />
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