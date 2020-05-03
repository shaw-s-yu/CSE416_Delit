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
        this.backgroundColor = '#808080'
        this.gridThickness = 2
        this.canvasWidth = 0
        this.canvasHeight = 0
        this.buildModel()
        this.setCanvasDimension()
    }

    drawGrid = () => {
        this.drawGridBackground()
        this.drawGridTileBoxes()
    }

    drawGridTileBoxes = () => {
        this.ctx.save()
        this.ctx.fillStyle = this.backgroundColor
        for (let position in this.gridPositions)
            this.ctx.fillRect(this.gridPositions[position].x, this.gridPositions[position].y, this.tileWidth, this.tileHeight)
        this.ctx.restore()
    }

    drawGridBackground = () => {
        this.ctx.save()
        this.ctx.fillStyle = this.gridColor
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
        this.ctx.restore()
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
                    y: this.gridThickness + o * (this.tileHeight + this.gridThickness)
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

}