import React from 'react';
import { Button, Icon } from 'react-materialize'
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
        const { scale } = this.state;
        const { className } = this.props
        return (
            <div className={className}>

                <i className="fas fa-search-plus tileset-zoomin-btn better-btn red" />
                <i className="fas fa-search-minus tileset-zoomout-btn better-btn red" />
                <i className="fas fa-trash-alt tileset-delete-btn better-btn red" />

                <div className="display-place" onMouseDown={this.handleUnselect}>

                    <Canvas canvas={this.canvas} className="map" style={{
                        width: scale + "%",
                        height: scale + "%",
                        left: scale < 100 ? (100 - scale) / 2 + "%" : 0,
                        top: scale < 100 ? (100 - scale) / 2 + "%" : 0,
                        border: "1px solid #d3d3d3"
                    }} />
                </div>
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
