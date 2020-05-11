export default class TilesetImageController {
    constructor(tileset, canvas) {
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
                    y: this.gridThickness + o * (this.tileHeight + this.gridThickness),
                    //dx dy is the position difference between image and tiledImage(with and without grid)
                    dx: this.gridThickness + i * (this.tileWidth + this.gridThickness) - i * this.tileWidth,
                    dy: this.gridThickness + o * (this.tileHeight + this.gridThickness) - o * this.tileHeight,

                    sx: i * this.tileWidth,
                    sy: o * this.tileHeight
                })

                index += 1
            }
    }

    getGridPositionByGridIndex = (index) => {
        for (let i = 0; i < this.gridPositions.length; i++) {
            if (this.gridPositions[i].index === index) {
                return this.gridPositions[i]
            }
        }
    }

    getGridIndexByGridId = (id) => {
        return id - this.tileset.firstgid
    }

    getTileDataByGridId = (id) => {

        //the index of the grid in tileset === index in gridpositions
        const index = this.getGridIndexByGridId(id)

        //find the grid with this index
        const gridPosition = this.getGridPositionByGridIndex(index)

        //draw the grid in a tile sized canvas by helper 
        this.initHelper(this.tileWidth, this.tileHeight)
        //1, get the whole image data
        const imgData = this.ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight)
        //2. draw to helper
        this.helperctx.putImageData(imgData, -gridPosition.x, -gridPosition.y, gridPosition.x, gridPosition.y, this.tileWidth, this.tileHeight)
        //3.get helper imageData
        const returnImgData = this.helperctx.getImageData(0, 0, this.tileWidth, this.tileHeight)

        return {
            imageData: returnImgData,
            width: this.tileWidth,
            height: this.tileHeight
        }
    }

    getGridPositionFromMouseXY = (x, y) => {
        for (let i in this.gridPositions) {
            if (x >= this.gridPositions[i].x &&
                x < this.gridPositions[i].x + this.tileWidth + this.gridThickness &&
                y >= this.gridPositions[i].y &&
                y < this.gridPositions[i].y + this.tileHeight + this.gridThickness)
                return {
                    x: this.gridPositions[i].x,
                    y: this.gridPositions[i].y,
                    index: this.gridPositions[i].index
                }
        }
        return null
    }

    getMinMaxGridPositionsFromGridPositions = (grids) => {

        let minX = Infinity, maxX = -Infinity, minY = Infinity, maxY = -Infinity
        for (let i in grids) {
            minX = Math.min(minX, grids[i].x)
            minY = Math.min(minY, grids[i].y)
            maxX = Math.max(maxX, grids[i].x)
            maxY = Math.max(maxY, grids[i].y)
        }
        return {
            minX, minY, maxX, maxY
        }
    }

    getBoxedGridPositionsFromGridPositions = (grids, grid) => {
        let { minX, minY, maxX, maxY } = this.getMinMaxGridPositionsFromGridPositions(grids)
        minX = Math.min(minX, grid.x)
        minY = Math.min(minY, grid.y)
        maxX = Math.max(minX, grid.x + this.tileWidth + this.gridThickness)
        maxY = Math.max(minY, grid.y + this.tileHeight + this.gridThickness)

        let returnGrids = []
        for (let i in this.gridPositions) {
            if (this.gridPositions[i].x >= minX &&
                this.gridPositions[i].x < maxX &&
                this.gridPositions[i].y >= minY &&
                this.gridPositions[i].y < maxY)
                returnGrids.push(this.gridPositions[i])
        }
        return returnGrids
    }

    handleConvertIndexToGID = grids => {
        return grids.map(e => {
            e.gid = e.index + this.tileset.firstgid
            return e
        })
    }

}