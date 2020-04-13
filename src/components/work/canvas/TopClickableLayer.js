import React from 'react'
import { connect } from 'react-redux';
import * as handler from '../../../store/database/WorkScreenHandler';

class TopClickableLayer extends React.Component {


    state = {
        selected: null,
    }

    getGrid = (col, row) => {

        const { selected } = this.state
        const { width, height } = this.props
        const border = selected ? selected.x === col && selected.y === row ? '2px solid black' : 'none' : 'none';
        const style = {
            left: width * col,
            top: height * row,
            width, height,
            position: 'absolute',
            border: border,
        }
        return <div style={style} key={'x:' + col + ",y:" + row} onClick={this.handleSelect.bind(this, col, row)} onMouseDown={e => {
            e.stopPropagation()
            this.props.handleToTop(this.props.window)
        }}></div>
    }


    getGrids = () => {
        const { numRow, numColumn } = this.props;
        let grids = []
        for (let o = 0; o < numRow; o++)
            for (let i = 0; i < numColumn; i++)
                grids.push(this.getGrid(i, o))

        return grids
    }


    handleSelect = (col, row) => {
        if (this.props.selectedTool !== null) return
        this.setState({ selected: { x: col, y: row } })
        this.props.handleSelect({ x: col, y: row })
    }


    render() {
        const grids = this.getGrids();
        return (
            <>
                {grids && grids.map(grid => {
                    return grid
                })}
            </>
        )
    }

}


const mapStateToProps = (state) => {
    const { tileset, map } = state;
    let selected = tileset.selected ? tileset.selected : null;
    let selectedTool = map.selectedTool ? map.selectedTool : null;
    return {
        selected: selected,
        selectedTool
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleToTop: (window) => dispatch(handler.handleToTop(window)),
    handleSelect: (selected) => dispatch(handler.selectTilesetHandler(selected)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TopClickableLayer);;