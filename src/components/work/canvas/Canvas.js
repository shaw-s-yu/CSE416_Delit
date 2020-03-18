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
        e.stopPropagation();
        let rect = this.canvas.current.getBoundingClientRect()
        let { left, top, width, height } = rect;
        const { numColumn, numRow } = this.state;
        let clickX = e.clientX - left
        let clickY = e.clientY - top
        let gridWidth = width / this.state.numColumn
        let gridHeight = height / this.state.numRow
        let selected = this.getGridIndex(clickX, clickY, gridWidth, gridHeight)
        const { x, y } = selected;
        // selected = {
        //     ...selected,
        //     left: left + width / numColumn * x,
        //     top: top + top / numRow * y,
        //     width: width / numColumn,
        //     height: height / numRow,
        // }
        selected = null
        this.props.handleSelect(selected);
        console.log(left, top, width, height)

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
        const { numColumn, numRow } = this.state;
        const { selected } = this.props;
        console.log(selected)
        let dim = {}
        if (this.canvas.current !== null && selected !== null) {
            const { left, top, width, height } = selected
            dim = {
                left: left,
                top: top,
                width: width,
                height: height,
            }
        }

        return (
            <div style={this.props.style} className={this.props.className}>
                <canvas ref={this.canvas} className="canvas" onClick={this.handleSelect}></canvas>
                {selected ? <div style={dim} className="selected-grid" onClick={e => e.stopPropagation()}></div> : selected}
            </div >
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