import React from 'react';
import Canvas from '../canvas/Canvas'
import { connect } from 'react-redux';
import { unselectTilesetHandler } from '../../../store/database/WorkScreenHandler';


class TileMap extends React.Component {

    state = {
        scale: 50,
    }

    canvas = React.createRef();

    handleZoomIn = (e) => {
        e.stopPropagation()
        let { scale } = this.state;
        scale = scale * 2;
        this.setState({ scale: scale })
    }

    handleZoomOut = (e) => {
        e.stopPropagation()
        let { scale } = this.state;
        scale = scale / 2;
        this.setState({ scale: scale })
    }

    handleUnselect = (e) => {
        this.props.handleUnselect()
        e.stopPropagation();
    }


    render() {
        const { style } = this.props;
        return (
            <div className="display-place" onMouseDown={this.handleUnselect} style={style}>

                <Canvas canvas={this.canvas} className="map" style={{
                    // width: scale + "%",
                    // height: scale + "%",
                    // left: scale < 100 ? (100 - scale) / 2 + "%" : 0,
                    // top: scale < 100 ? (100 - scale) / 2 + "%" : 0,
                    // border: "1px solid #d3d3d3"
                }} />
            </div>

        )
    }

}

const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => ({
    handleUnselect: () => dispatch(unselectTilesetHandler()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TileMap)
