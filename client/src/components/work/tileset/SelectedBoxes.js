import React from 'react'
class selectedBoxes extends React.Component {


    render() {
        const { selectedGrids, width, height } = this.props
        return (
            <>
                {
                    selectedGrids && selectedGrids.map((grid, index) => {
                        console.log(grid)
                        const style = {
                            left: grid.x - 1,
                            top: grid.y - 1,
                            width: width + 2,
                            height: height + 2,
                        }
                        return (
                            <div
                                onClick={e => e.stopPropagation()}
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
