
export default class DrawGridController {
    constructor(ctx, visialWidth, visialHeight, tileWidth, tileHeight) {
        this.ctx = ctx
        this.visialWidth = visialWidth
        this.visialHeight = visialHeight
        this.tileWidth = tileWidth
        this.tileHeight = tileHeight
        this.gridPositions = []
        this.numColumn = 0
        this.numRow = 0
        this.gridColor = '#000000'
        this.backgroundColor = 'rgba(211,211,211,1)'
        this.gridThickness = 2
        this.canvasWidth = 0
        this.canvasHeight = 0
        this.buildModel()
        this.setCanvasDimension()
    }

    getImageData = () => {
        return this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight)
    }

    drawGrid = () => {
        this.drawGridBackground()
        this.drawGridBorder()
    }

    drawGridBorder = () => {
        this.ctx.save()
        this.ctx.fillStyle = this.gridColor
        for (let i = 0; i < this.numRow + 1; i++) {
            const top = i * (this.gridThickness + this.tileHeight)
            this.ctx.fillRect(0, top, this.canvasWidth, this.gridThickness)
        }
        for (let i = 0; i < this.numColumn + 1; i++) {
            const left = i * (this.gridThickness + this.tileWidth)
            this.ctx.fillRect(left, 0, this.gridThickness, this.canvasHeight)
        }
        this.ctx.restore()
    }

    drawGridBackground = () => {
        this.ctx.save()
        this.ctx.fillStyle = this.backgroundColor
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
        this.ctx.restore()
    }

    DrawGridsByRegion = (imgData, grids, startGrids) => {

        for (let i = 0; i < grids.length; i++) {
            this.ctx.putImageData(imgData, grids[i].dx, grids[i].dy, startGrids[i].x, startGrids[i].y, this.tileWidth, this.tileHeight)
        }
    }

    clearGridsByRegion = (grids) => {
        this.ctx.save()
        this.ctx.fillStyle = this.backgroundColor
        for (let i = 0; i < grids.length; i++) {
            this.ctx.fillRect(grids[i].x, grids[i].y, this.tileWidth, this.tileHeight)
        }
        this.ctx.restore()
        this.drawGridBorder()
    }

    setGridThickness = (gridThickness) => {
        this.gridThickness = gridThickness
    }

    getGridThickness = () => {
        return this.gridThickness
    }

    setGridColor = (gridColor) => {
        this.gridColor = gridColor
    }

    getGridColor = () => {
        return this.getGridColor
    }

    setBackgroundColor = (color) => {
        this.backgroundColor = color
    }

    getBackGroundColor = () => {
        return this.backgroundColor
    }

    buildModel = () => {
        this.numColumn = Math.floor(this.visialWidth / this.tileWidth)
        this.numRow = Math.floor(this.visialHeight / this.tileHeight)
        for (let o = 0; o < this.numRow; o++)
            for (let i = 0; i < this.numColumn; i++)
                this.gridPositions.push({
                    x: this.gridThickness + i * (this.tileWidth + this.gridThickness),
                    y: this.gridThickness + o * (this.tileHeight + this.gridThickness),
                    dx: this.gridThickness + i * (this.tileWidth + this.gridThickness) - i * this.tileWidth,
                    dy: this.gridThickness + o * (this.tileHeight + this.gridThickness) - o * this.tileHeight,
                    sx: i * this.tileWidth,
                    sy: o * this.tileHeight
                })
    }

    setCanvasDimension = () => {
        this.canvasWidth = this.visialWidth + (this.numColumn + 1) * this.gridThickness
        this.canvasHeight = this.visialHeight + (this.numRow + 1) * this.gridThickness
    }

    getCanvasDimension = () => {
        return {
            width: this.canvasWidth,
            height: this.canvasHeight
        }
    }

    getGridPositions = () => {
        return this.gridPositions
    }

    mouseXYisInGrid = (mouseX, mouseY, gridLeft, gridTop) => {
        if (
            mouseX > gridLeft &&
            mouseY > gridTop &&
            mouseX < gridLeft + this.tileWidth &&
            mouseY < gridTop + this.tileHeight
        )
            return true
        return false
    }

    getGridIndexFromMouseXY = (x, y) => {
        for (let o = 0; o < this.numRow; o++)
            for (let i = 0; i < this.numColumn; i++) {
                const gridLeft = this.gridThickness + i * (this.tileWidth + this.gridThickness)
                const gridTop = this.gridThickness + o * (this.tileHeight + this.gridThickness)
                if (this.mouseXYisInGrid(x, y, gridLeft, gridTop))
                    return {
                        x: i,
                        y: o
                    }
            }

        return null
    }

    getGridIndexFromPosition = (x, y) => {
        return {
            x: Math.floor((x - this.gridThickness) / (this.gridThickness + this.tileWidth)),
            y: Math.floor((y - this.gridThickness) / (this.gridThickness + this.tileHeight))
        }
    }

    getGridPositionFromIndex = (x, y) => {
        return {
            x: this.gridThickness + x * (this.tileWidth + this.gridThickness),
            y: this.gridThickness + y * (this.tileHeight + this.gridThickness)
        }
    }

    getGridPositionFromMouseXY = (x, y) => {
        const gridIndex = this.getGridIndexFromMouseXY(x, y)
        if (!gridIndex)
            return this.getGridPositionFromMouseXY(x + this.gridThickness, y + this.gridThickness)
        return this.getGridPositionFromIndex(gridIndex.x, gridIndex.y)
    }

    fillGridFromMouseXY = (x, y) => {
        const gridPosition = this.getGridPositionFromMouseXY(x, y)
        if (!gridPosition) return
        this.ctx.fillRect(gridPosition.x, gridPosition.y, this.tileWidth, this.tileHeight)
    }

    getGridImageDataFromPosition = (x, y) => {
        return this.ctx.getImageData(x, y, this.tileWidth, this.tileHeight)
    }

    putGridImageDataToPosition = (data, x, y) => {
        this.ctx.putImageData(data, x, y)
    }


    getHorizontalSymetricalPosition = (x, y) => {
        const gridIndex = this.getGridIndexFromPosition(x, y)
        if (!gridIndex) return
        const newGridIndex = {
            x: this.numColumn - 1 - gridIndex.x,
            y: gridIndex.y
        }

        return this.getGridPositionFromIndex(newGridIndex.x, newGridIndex.y)
    }

    getVerticalSymetricalPosition = (x, y) => {
        const gridIndex = this.getGridIndexFromPosition(x, y)
        if (!gridIndex) return
        const newGridIndex = {
            x: gridIndex.x,
            y: this.numRow - 1 - gridIndex.y
        }

        return this.getGridPositionFromIndex(newGridIndex.x, newGridIndex.y)
    }

    getGridPositionsFromCropMouse = (cropDimension) => {

        let startPosition = this.getGridPositionFromMouseXY(cropDimension.start.x, cropDimension.start.y)
        let endPosition = this.getGridPositionFromMouseXY(cropDimension.end.x, cropDimension.end.y)

        return this.getGridPositionsFromCropPositions(startPosition, endPosition)
    }

    getGridPositionsFromCropPositions = (startPosition, endPosition) => {
        let positions = []
        if (startPosition.x > endPosition.x && startPosition.y > endPosition.y) {
            const temp = startPosition
            startPosition = endPosition
            endPosition = temp
        }

        for (let i = 0; i < this.gridPositions.length; i++) {
            if (
                this.gridPositions[i].x > (startPosition.x - this.gridThickness - this.tileWidth) &&
                this.gridPositions[i].x < (endPosition.x + this.gridThickness + this.tileWidth) &&
                this.gridPositions[i].y > (startPosition.y - this.gridThickness - this.tileHeight) &&
                this.gridPositions[i].y < (endPosition.y + this.gridThickness + this.tileHeight)
            )
                positions.push({
                    x: this.gridPositions[i].x,
                    y: this.gridPositions[i].y
                })
        }

        return positions
    }

    getCropPositionFromGridPositions = (grids) => {
        let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity
        for (let i = 0; i < grids.length; i++) {
            if (grids[i].x < minX)
                minX = grids[i].x
            if (grids[i].x > maxX)
                maxX = grids[i].x
            if (grids[i].y < minY)
                minY = grids[i].y
            if (grids[i].y > maxY)
                maxY = grids[i].y
        }
        return {
            left: minX, top: minY,
            leftMax: maxX, topMax: maxY,
            width: maxX + this.tileWidth - minX,
            height: maxY + this.tileHeight - minY
        }
    }

    mouseXYisInGrids = (x, y, grids) => {
        for (let i = 0; i < grids.length; i++) {
            if (
                x > grids[i].x &&
                y > grids[i].y &&
                x < grids[i].x + this.tileWidth &&
                y < grids[i].y + this.tileHeight
            )
                return true
        }
        return false
    }

    handleShiftSelectedGrids = (dx, dy, grids) => {
        for (let i = 0; i < grids.length; i++) {
            grids[i].x += dx
            grids[i].y += dy
        }
    }

    handleShift2Grids = (x, y, grids, grid) => {
        const gridPosition = this.getGridPositionFromMouseXY(x, y)
        const dx = gridPosition.x - grid.x
        const dy = gridPosition.y - grid.y
        for (let i = 0; i < grids.length; i++) {
            grids[i].x += dx
            grids[i].y += dy
        }
    }

    getGridsPositionFromMouseGrids = (x, y, grids, startGridPosition) => {
        let returnGrids = []
        const mouseGridPosition = this.getGridPositionFromMouseXY(x, y)
        const dx = mouseGridPosition.x - startGridPosition.x
        const dy = mouseGridPosition.y - startGridPosition.y
        for (let i = 0; i < grids.length; i++) {
            returnGrids.push({
                x: grids[i].x + dx,
                y: grids[i].y + dy,
                dx, dy
            })
        }

        return returnGrids
    }

    getPositionsForNoGridsImage = () => {
        let returnGrids = []
        for (let o = 0; o < this.numRow; o++) {
            for (let i = 0; i < this.numColumn; i++) {
                returnGrids.push({
                    x: i * this.tileWidth,
                    y: o * this.tileHeight,
                    dx: i * this.tileWidth - (this.gridThickness + i * (this.tileWidth + this.gridThickness)),
                    dy: o * this.tileHeight - (this.gridThickness + o * (this.tileHeight + this.gridThickness))
                })
            }
        }

        return returnGrids
    }

    getMinRegionGridPositionsFromGridsAndGrid = (grids, grid) => {
        const { left, top } = this.getCropPositionFromGridPositions(grids)
        const minX = left, minY = top, maxX = grid.x, maxY = grid.y
        return this.getGridPositionsFromCropPositions({ x: minX, y: minY }, { x: maxX, y: maxY })
    }
}