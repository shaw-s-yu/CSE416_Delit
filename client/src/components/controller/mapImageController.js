export default class MapImageController {
    constructor(canvas, map) {
        this.canvas = canvas
        this.ctx = canvas.getContext('2d')
        this.numColumn = map.width
        this.numRow = map.height
        this.tileWidth = map.tileWidth
        this.tileHeight = map.tileHeight
        this.gridThickness = 2
        this.canvasWidth = this.gridThickness + this.numColumn * (this.gridThickness + this.tileWidth)
        this.canvasHeight = this.gridThickness + this.numRow * (this.gridThickness + this.tileHeight)
        this.gridColor = '#000000'
        this.backgroundColor = 'rgba(211,211,211,1)'
        this.gridPositions = []

        this.buildGridPositions()
    }

    getMapNumGrids = () => {
        return this.numColumn * this.numRow
    }

    getCanvasDimension = () => {
        return {
            canvasWidth: this.canvasWidth,
            canvasHeight: this.canvasHeight
        }
    }

    drawBackGround = () => {
        this.ctx.save()
        this.ctx.fillStyle = this.backgroundColor
        this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight)
        this.ctx.restore()
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

    buildGridPositions = () => {
        let index = 0
        for (let o = 0; o < this.numRow; o++)
            for (let i = 0; i < this.numColumn; i++) {
                this.gridPositions.push({
                    index: index,
                    x: this.gridThickness + i * (this.tileWidth + this.gridThickness),
                    y: this.gridThickness + o * (this.tileHeight + this.gridThickness)
                })
                index += 1
            }
    }
}