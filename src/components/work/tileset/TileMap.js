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
        const { style, width, imgWidth, height, imgHeight } = this.props;
        const totalStyle = {
            ...style,
            marginLeft: imgWidth >= width ? "auto" : (width - imgWidth) / 2,
            marginTop: imgHeight >= height ? "auto" : (height - imgHeight) / 2,
        }

        return (

            <div className="display-place" onMouseDown={this.handleUnselect} style={totalStyle}>
                <Canvas canvas={this.canvas} />
            </div>

        )
    }

}

const mapStateToProps = (state) => {
    const { squirtle } = state.tileset.imgs
    if (!squirtle) return {}
    const { imgWidth, imgHeight } = squirtle
    return {
        imgWidth, imgHeight
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleUnselect: () => dispatch(unselectTilesetHandler()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TileMap)
