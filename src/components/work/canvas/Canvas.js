import React from 'react';
import squirtle from '../../../img/squirtle.jpg'
import TileGrid from './TileGrid'
import { connect } from 'react-redux';
import { selectTilesetHandler } from '../../../store/database/WorkScreenHandler';

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
        const self = this
        img.onload = function () {
            self.tileGrid.buildModel();
            const { numRow, numColumn } = self.tileGrid
            self.setState({
                numRow: numRow,
                numColumn: numColumn,
                imgWidth: width * numColumn,
                imgHeight: height * numRow,
            }, () => {
                self.tileGrid.draw();
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
        // const { x, y } = selected;
        // // selected = {
        // //     ...selected,
        // //     left: left + width / numColumn * x,
        // //     top: top + top / numRow * y,
        // //     width: width / numColumn,
        // //     height: height / numRow,
        // // }
        // selected = null
        // this.props.handleSelect(selected);
        // let { selecteds } = this.state;
        // console.log(selecteds)
        // this.tileGrid.clearSelected(selecteds)
        // this.tileGrid.drawSelected(x, y)
        // selecteds.push({ x: x, y: y })
        // this.setState(selecteds)
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
            // <div style={this.props.style} className={this.props.className}>
            <canvas ref={this.canvas} className="canvas" onClick={this.handleSelect} width={this.state.imgWidth} height={this.state.imgHeight}></canvas>
            // </div >
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
    handleSelect: (selected) => dispatch(selectTilesetHandler(selected)),
})


export default connect(mapStateToProps, mapDispatchToProps)(Canvas);;