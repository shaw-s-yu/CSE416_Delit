export default class TilesetImageController {
    constructor(tileset, canvas) {
        console.log(tileset)
        this.canvas = canvas
        this.tileset = tileset
        this.ctx = canvas.getContext('2d')
        this.gridThickness = 2
        this.imageWidth = tileset.width
        this.imageHeight = tileset.height
        this.tileWidth = tileset.tileWidth
        this.tileHeight = tileset.tileHeight
        this.numColumn = Math.floor(this.imageWidth / this.tileWidth)
        this.numRow = Math.floor(this.imageHeight / this.tileHeight)
        this.canvasWidth = this.gridThickness + this.numColumn * (this.gridThickness + this.tileWidth)
        this.canvasHeight = this.gridThickness + this.numRow * (this.gridThickness + this.tileHeight)
        this.gridColor = '#000000'
        this.backgroundColor = 'rgba(211,211,211,1)'
        this.gridPositions = []
        this.buildGridPositions()

        this.helper = document.createElement('CANVAS')
        this.initHelper(this.imageWidth, this.imageHeight)
    }

    initHelper = (width, height) => {
        this.helper.width = width
        this.helper.height = height
        this.helperctx = this.helper.getContext('2d')
    }

    drawImage = (src, callback) => {
        this.drawImageHelper(src, () => {
            const imageData = this.getImageDataFromHelper()
            for (let i = 0; i < this.gridPositions.length; i++)
                this.ctx.putImageData(
                    imageData,
                    this.gridPositions[i].dx,
                    this.gridPositions[i].dy,
                    this.gridPositions[i].sx,
                    this.gridPositions[i].sy,
                    this.tileWidth,
                    this.tileHeight
                )
            if (callback) callback()
        })
    }

    drawImageHelper = (src, callback) => {
        let img = new Image()
        img.src = src
        img.onload = () => {
            this.helperctx.drawImage(img, 0, 0)
            this.helperImageData = this.helperctx.getImageData(0, 0, img.width, img.height)
            if (callback) callback()
        }
    }
    getImageDataFromHelper = () => {
        return this.helperImageData
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

    getCanvasDimension = () => {
        return {
            canvasWidth: this.canvasWidth,
            canvasHeight: this.canvasHeight
        }
    }

    buildGridPositions = () => {
        let index = 0
        for (let o = 0; o < this.numRow; o++)
            for (let i = 0; i < this.numColumn; i++) {
                this.gridPositions.push({
                    index,
                    x: this.gridThickness + i * (this.tileWidth + this.gridThickness),
                    y: this.gridThickness + o * (this.tileHeight * this.gridThickness),
                    dx: this.gridThickness + i * (this.tileWidth + this.gridThickness) - i * this.tileWidth,
                    dy: this.gridThickness + o * (this.tileHeight + this.gridThickness) - o * this.tileHeight,
                    sx: i * this.tileWidth,
                    sy: o * this.tileHeight
                })

                index += 1
            }
    }
}