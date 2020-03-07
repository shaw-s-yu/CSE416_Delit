import React from 'react';
import squirtle from '../../../img/squirtle.jpg'
import TileGrid from './TileGrid'

class Canvas extends React.Component {

    state = {
        width: 150,
        height: 150,
        numRow: 0,
        numColumn: 0,
        selected: null,
    }

    canvas = React.createRef()

    componentDidMount = () => {
        const { width, height } = this.state;
        let ctx = this.canvas.current.getContext('2d');
        let img = new Image();
        img.src = squirtle;
        let tileGrid = new TileGrid(ctx, img, width, height);
        img.onload = () => {
            tileGrid.draw();
            let { numRow, numColumn } = tileGrid
            this.setState({ numRow: numRow, numColumn: numColumn })
        }
    }

    handleSelect = (e) => {
        let rect = this.canvas.current.getBoundingClientRect()
        let { left, top, width, height } = rect;
        let clickX = e.clientX - left
        let clickY = e.clientY - top
        let gridWidth = width / this.state.numColumn
        let gridHeight = height / this.state.numRow
        let selected = this.getGridIndex(clickX, clickY, gridWidth, gridHeight)
        this.setState({ selected: selected })
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
        const { selected, numColumn, numRow } = this.state;
        let dim = {}

        if (this.canvas.current !== null && selected !== null && typeof selected !== 'undefined') {
            const { x, y } = selected
            dim = {
                left: x * 100 / numColumn + "%",
                top: y * 100 / numRow + "%",
                width: 100 / numColumn + "%",
                height: 100 / numRow + "%"
            }
        }

        return (
            <div style={this.props.style} className={this.props.className}>
                <canvas ref={this.canvas} className="canvas" onClick={this.handleSelect}></canvas>
                {selected ? <div style={dim} className="selected-grid"></div> : selected}
            </div >
        )
    }
}


export default Canvas;