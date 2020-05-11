import React from 'react'
class selectedBoxes extends React.Component {


    handleOnClick = e => {
        const { shiftSelecting } = this.props
        if (!shiftSelecting)
            e.stopPropagation()
    }

    render() {
        const { selectedGrids, width, height } = this.props
        return (
            <>
                {
                    selectedGrids && selectedGrids.map((grid, index) => {
                        const style = {
                            left: grid.x - 1,
                            top: grid.y - 1,
                            width: width + 2,
                            height: height + 2,
                        }
                        return (
                            <div
                                onClick={this.handleOnClick}
                                key={index}
                                style={style}
                                className='selected-grids'
                            />
                        )
                    })
                }
            </>
        )
    }
}

export default selectedBoxes
