import React from 'react'

class selectedBoxes extends React.Component {
    state = {
        mouseDown: false,
        lastX: null,
        lastY: null,
        selectedGrid: null,
    }

    handleMoveStart = e => {
        e.stopPropagation()

        const { clientX, clientY } = e
        const { x, y } = this.props.parent.handleFixPosition(clientX, clientY)
        const { selectedGrid } = this.props

        this.setState({ mouseDown: true, lastX: x, lastY: y, selectedGrid })
    }

    handleMove = (x, y) => {
        const { mouseDown, lastX, lastY, selectedGrid } = this.state
        if (!mouseDown || !lastX || !lastY) return
        const dx = x - lastX
        const dy = y - lastY
        this.props.parent.GridController.handleShiftSelectedGrids(dx, dy, selectedGrid)
        this.setState({ lastX: x, lastY: y })
    }

    handleMoveEnd = (e, grid) => {
        e.stopPropagation()

        const { clientX, clientY } = e
        const { selectedGrid } = this.state
        const { x, y } = this.props.parent.handleFixPosition(clientX, clientY)
        this.props.parent.GridController.handleShift2Grids(x, y, selectedGrid, grid)
        this.setState({ mouseDown: false, lastX: null, lastY: null, startGrids: null })
    }

    handleMoveLeave = e => {
        const { mouseDown } = this.state
        if (!mouseDown) return
        this.props.parent.handleToolMove(e)
    }

    componentDidMount() {
        this.props.childRef(this)
    }


    render() {

        const { selectedGrid, width, height } = this.props
        const { mouseDown } = this.state
        return (
            <>
                {
                    selectedGrid && selectedGrid.map((grid, index) => {
                        const style = {
                            left: grid.x - 1,
                            top: grid.y - 1,
                            width: width + 2,
                            height: height + 2,
                            backgroundColor: mouseDown ? 'rgba(0,0,0,0)' : 'rgba(0,0,205,0.4)'
                        }
                        return (
                            <div
                                onMouseDown={this.handleMoveStart}
                                onMouseLeave={this.handleMoveLeave}
                                onClick={e => this.handleMoveEnd(e, grid)}
                                key={index}
                                style={style}
                                className='selected-box'
                            />
                        )
                    })
                }
            </>

        )
    }
}

export default selectedBoxes
