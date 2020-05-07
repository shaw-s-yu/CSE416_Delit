import React from 'react'
class selectedBoxes extends React.Component {
    state = {
        mouseDown: false,
        lastX: null,
        lastY: null,
        selectedGrid: null,
        grid: null,
        lastGrid: null,
        startX: null,
        startY: null,
        startGrids: null,
        startImgData: null,
        startImg: null
    }

    handleMoveStart = (e, grid) => {
        e.stopPropagation()

        const { clientX, clientY } = e
        const { x, y } = this.props.parent.handleFixPosition(clientX, clientY)
        let { selectedGrid } = this.props
        const startImgData = this.props.parent.GridController.getImageData()
        const startImg = this.props.parent.refs.canvas.toDataURL('image/jpeg', 1)
        const startGrids = JSON.parse(JSON.stringify(selectedGrid))
        const lastGrid = JSON.parse(JSON.stringify(grid))
        this.setState({
            mouseDown: true,
            lastX: x, lastY: y,
            selectedGrid, grid,
            startX: grid.x, startY: grid.y,
            startGrids, startImgData, lastGrid,
            startImg
        }, () => {
            this.props.parent.handleStopCopying()
        })
    }

    handleMove = (x, y) => {
        let { mouseDown, lastX, lastY, selectedGrid, startX, startY, startGrids, startImgData, lastGrid } = this.state

        if (!mouseDown || !lastX || !lastY) return
        const dx = x - lastX
        const dy = y - lastY
        this.props.parent.GridController.handleShiftSelectedGrids(dx, dy, selectedGrid)
        let gridsToDraw = this.props.parent.GridController.getGridsPositionFromMouseGrids(x, y, startGrids, {
            x: startX, y: startY
        })
        this.props.parent.GridController.clearGridsByRegion(startGrids)

        if (!lastGrid || !this.props.parent.GridController.mouseXYisInGrid(x, y, lastGrid.x, lastGrid.y)) {
            this.props.parent.ctx.putImageData(startImgData, 0, 0)
            this.props.parent.GridController.clearGridsByRegion(startGrids)

        }
        this.props.parent.GridController.DrawGridsByRegion(startImgData, gridsToDraw, startGrids)

        lastGrid = this.props.parent.GridController.getGridPositionFromMouseXY(x, y)

        this.setState({ lastX: x, lastY: y, lastGrid })
    }

    handleMoveEnd = e => {
        const { shiftSelecting } = this.props
        if (!shiftSelecting)
            e.stopPropagation()
        const { clientX, clientY } = e
        const { selectedGrid, grid, startImg } = this.state
        const { x, y } = this.props.parent.handleFixPosition(clientX, clientY)
        this.props.parent.GridController.handleShift2Grids(x, y, selectedGrid, grid)

        const newImg = this.props.parent.refs.canvas.toDataURL('image/jpeg', 1)
        this.props.parent.addNewTransaction(startImg, newImg)
        this.props.parent.sendSocketNewOperation()

        this.setState({
            mouseDown: false, lastX: null,
            lastY: null, startGrids: null,
            startX: null, startY: null,
            grid: null, startImgData: null,
            lastGrid: null, startImg: null
        })
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
        const color = mouseDown ? 'rgba(0,0,0,0)' : 'rgba(0,0,205,0.4)'
        return (
            <>
                {
                    selectedGrid && selectedGrid.map((grid, index) => {
                        const style = {
                            left: grid.x - 1,
                            top: grid.y - 1,
                            width: width + 2,
                            height: height + 2,
                            backgroundColor: color,
                        }
                        return (
                            <div
                                onMouseDown={e => this.handleMoveStart(e, grid)}
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
