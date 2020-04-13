import React from 'react';
import ImageLayer from './ImageLayer'
import { connect } from 'react-redux';
import * as handler from '../../../store/database/WorkScreenHandler';
import TopClickableLayer from './TopClickableLayer'

class LayerManager extends React.Component {

    state = {
        width: 150,
        height: 150,
        numRow: 0,
        numColumn: 0,
        imgWidth: 0,
        imgHeight: 0,
        click_layer: null,
    }



    componentDidMount = () => {
        this.drawImage();
    }

    drawImage = () => {
        const { width, height } = this.state;
        const { canvas, squirtle } = this.props
        if (!canvas) return
        this.ctx = canvas.current.getContext('2d');
        let img = new Image();
        img.src = squirtle;
        this.tileGrid = new ImageLayer(this.ctx, img, width, height);
        img.onload = () => {
            this.tileGrid.buildModel();
            const { numRow, numColumn } = this.tileGrid
            this.setState({
                numRow: numRow,
                numColumn: numColumn,
                imgWidth: width * numColumn,
                imgHeight: height * numRow,
            }, () => {
                const { imgWidth, imgHeight } = this.state;
                this.props.handleImgInit('squirtle', { imgWidth, imgHeight })
                this.tileGrid.draw();
                this.buildTopLayer();
            })
        }
    }

    buildTopLayer = () => {
        const { window } = this.props
        const { numRow, numColumn, width, height } = this.state;
        const clickLayerProps = { numColumn, numRow, width, height, window }
        const click_layer = <TopClickableLayer {...clickLayerProps} />

        this.setState({ click_layer })
    }

    render = () => {
        const { imgWidth, imgHeight, click_layer } = this.state;
        let { canvas } = this.props;
        return (
            <>
                <canvas ref={canvas} className="single-layer" onClick={this.handleSelect} width={imgWidth} height={imgHeight}>
                    Your Browser Does Not Support Canvas
                </canvas>
                {click_layer}
            </>
        )
    }
}


const mapStateToProps = (state) => {
    const { tileset } = state;
    let selected = tileset.selected ? tileset.selected : null;
    return {
        selected: selected,
    }
};


const mapDispatchToProps = (dispatch) => ({
    handleImgInit: (name, img) => dispatch(handler.tilsetImgInitHandler(name, img)),
    handleToTop: (window) => dispatch(handler.handleToTop(window)),
})


export default connect(mapStateToProps, mapDispatchToProps)(LayerManager);;