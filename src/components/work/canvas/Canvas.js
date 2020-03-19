import React from 'react';
import squirtle from '../../../img/squirtle.jpg'
import TileGrid from './TileGrid'
import { connect } from 'react-redux';
import * as handler from '../../../store/database/WorkScreenHandler';

class Canvas extends React.Component {

    state = {
        width: 150,
        height: 150,
        numRow: 0,
        numColumn: 0,
        selected: null,
        selecteds: [],
        imgWidth: 0,
        imgHeight: 0,
    }

    canvas = React.createRef()

    componentDidMount = () => {
        const { width, height } = this.state;
        this.ctx = this.canvas.current.getContext('2d');
        let img = new Image();
        img.src = squirtle;
        this.tileGrid = new TileGrid(this.ctx, img, width, height);
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
            })
        }
    }

    handleSelect = (e) => {

        e.stopPropagation();
        let rect = this.canvas.current.getBoundingClientRect()
        let { left, top, width, height } = rect;
        let clickX = e.clientX - left
        let clickY = e.clientY - top
        let gridWidth = width / this.state.numColumn
        let gridHeight = height / this.state.numRow
        let selected = this.getGridIndex(clickX, clickY, gridWidth, gridHeight)
        console.log(selected);
    }

    getGridIndex = (x, y, w, h) => {
        const { numRow, numColumn } = this.state
        for (let o = 0; o < numRow; o++)
            for (let i = 0; i < numColumn; i++) {
                if (x > i * w && x < (i + 1) * w && y > o * h && y < (o + 1) * h)
                    return {
                        x: i,
                        y: o
                    }
            }

    }

    render = () => {
        const { imgWidth, imgHeight } = this.state;
        return (
            <canvas ref={this.canvas} onClick={this.handleSelect} width={imgWidth} height={imgHeight}></canvas>
        )
    }
}


const mapStateToProps = (state) => {
    const { tileset } = state;
    const { order } = state.workScreen
    let selected = tileset.selected ? tileset.selected : null;
    return {
        selected: selected,
        order: order
    }
};


const mapDispatchToProps = (dispatch) => ({
    handleSelect: (selected) => dispatch(handler.selectTilesetHandler(selected)),
    handleImgInit: (name, img) => dispatch(handler.tilsetImgInitHandler(name, img)),
})


export default connect(mapStateToProps, mapDispatchToProps)(Canvas);;