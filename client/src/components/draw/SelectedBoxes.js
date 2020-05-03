import React from 'react'

class selectedBoxes extends React.Component {
    state = {

    }


    render() {

        const { selectedGrid, width, height } = this.props
        return (
            <>
                {
                    selectedGrid && selectedGrid.map((grid, index) => {
                        const style = {
                            left: grid.x,
                            top: grid.y,
                            width, height
                        }
                        return (
                            <div
                                key={index}
                                style={style}
                                className='selected-box'
                                onMouseMove={e => e.preventDefault()}
                            />
                        )
                    })
                }
            </>

        )
    }
}

export default selectedBoxes
