export default class MapImageController {
    constructor(canvas, map) {
        this.map = map
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

    setTilesets = (tilesets) => {
        this.tilesets = tilesets
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

    getGridPositions = () => {
        return this.gridPositions
    }

    setBackgroundColor = color => {
        this.backgroundColor = color
    }


    getTilesetByGridId = id => {
        for (let i = 0; i < this.tilesets.length; i++) {
            if (id >= this.tilesets[i].firstgid && id < this.tilesets[i].firstgid + this.tilesets[i].tilecount) {
                return this.tilesets[i]
            }
        }
    }

    getTilesetIdByGridId = id => {
        for (let i = 0; i < this.tilesets.length; i++) {
            if (id >= this.tilesets[i].firstgid && id < this.tilesets[i].firstgid + this.tilesets[i].tilecount) {
                return this.tilesets[i].canvasId
            }
        }
    }

    getTilesetIndexByGridId = id => {
        for (let i = 0; i < this.tilesets.length; i++) {
            if (id >= this.tilesets[i].firstgid && id < this.tilesets[i].firstgid + this.tilesets[i].tilecount) {
                return id - this.tilesets[i].firstgid + 1
            }
        }
    }

    getGridPositionByGridIndex = index => {
        for (let i = 0; i < this.gridPositions.length; i++) {
            if (this.gridPositions[i].index === index) {
                return this.gridPositions[i]
            }
        }
    }
    drawLayerGridByGridIndex = (index, tileData, canvas) => {
        const gridPosition = this.getGridPositionByGridIndex(index)
        const ctx = canvas.getContext('2d')
        ctx.putImageData(tileData.imageData, gridPosition.x, gridPosition.y, 0, 0, tileData.width, tileData.height)
    }

    clearLayerCanvas = (canvas) => {
        const ctx = canvas.getContext('2d')
        const { width, height } = canvas
        ctx.clearRect(0, 0, width, height)
    }
}