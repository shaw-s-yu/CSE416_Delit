import React from 'react'
import { connect } from 'react-redux';


class SingleLayer extends React.Component {

    getGrid = (col, row) => {
        const { width, height, selected } = this.props
        const border = selected ? selected.x === col && selected.y === row ? '2px solid black' : 'none' : 'none';
        const style = {
            left: width * col,
            top: height * row,
            width, height,
            position: 'absolute',
            border: border,
        }
        return <div style={style} key={'x:' + col + ",y:" + row}></div>
    }


    getGrids = () => {
        const { numRow, numColumn } = this.props;
        let grids = []
        for (let o = 0; o < numRow; o++)
            for (let i = 0; i < numColumn; i++)
                grids.push(this.getGrid(i, o))

        return grids
    }


    render() {
        const { style, handleSelect } = this.props;
        const grids = this.getGrids();
        return (
            <div style={style} onClick={handleSelect} onMouseDown={e => e.stopPropagation()}>
                {grids && grids.map(grid => {
                    return grid
                })}
            </div>
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

export default connect(mapStateToProps)(SingleLayer);;