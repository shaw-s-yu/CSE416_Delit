import React from 'react'

class selectedBoxes extends React.Component {
    state = {
        mouseDown: false
    }

    handleMoveStart = e => {
        e.stopPropagation()
        this.setState({ mouseDown: true })
    }

    handleMoveEnd = e => {
        e.stopPropagation()
        this.setState({ mouseDown: false })
    }


    render() {

        const { selectedGrid, width, height } = this.props
        return (
            <>
                {
                    selectedGrid && selectedGrid.map((grid, index) => {
                        const style = {
                            left: grid.x - 1,
                            top: grid.y - 1,
                            width: width + 2,
                            height: height + 2
                        }
                        return (
                            <div
                                onMouseDown={this.handleMoveStart}
                                onClick={this.handleMoveEnd}
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
