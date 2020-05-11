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
                    y: this.gridThickness + o * (this.tileHeight + this.gridThickness),
                    col: i,
                    row: o
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

    getGridPositionFromMouseXY = (x, y) => {
        for (let i in this.gridPositions) {
            if (x >= this.gridPositions[i].x &&
                x < this.gridPositions[i].x + this.tileWidth + this.gridThickness &&
                y >= this.gridPositions[i].y &&
                y < this.gridPositions[i].y + this.tileHeight + this.gridThickness)
                return this.gridPositions[i]
        }
        return null
    }

    getMoveSelectedTileData = (selectedGrids, gridPosition) => {
        if (gridPosition === null) return
        //sort selected grids by gid, small infront
        let grids = [...selectedGrids]
        grids.sort((a, b) => { return a.gid - b.gid })
        //convert grids by tileset indexes, to (x y distance to the first element)
        //1.get tileset
        const tileset = this.getTilesetByGridId(grids[0].gid)
        //2.get numRow numColumn
        const { columns } = tileset
        //3.get row column indexes
        const gridIndexes = grids.map(e => {
            return {
                col: e.index % columns,
                row: Math.floor(e.index / columns)
            }
        })
        //4.get diff from first element
        const gridDiff = gridIndexes.map(e => {
            return {
                col: e.col - gridIndexes[0].col + gridPosition.col,
                row: e.row - gridIndexes[0].row + gridPosition.row
            }
        })


        // use diff format a new data
        const data = this.gridPositions.map(e => {
            for (let i in gridDiff) {
                if (gridDiff[i].col === e.col && gridDiff[i].row === e.row)
                    return grids[i].gid
            }
            return 0
        })

        return data

    }

    storeLayerState = (layerCanvas) => {
        const ctx = layerCanvas.getContext('2d')
        this.storedImageData = ctx.getImageData(0, 0, this.canvasWidth, this.canvasHeight)
    }
    restoreLayerState = (layerCanvas) => {
        if (!layerCanvas) return
        const ctx = layerCanvas.getContext('2d')
        if (!this.storedImageData) return
        ctx.putImageData(this.storedImageData, 0, 0)
    }


    getIndexByColRow = (col, row) => {
        for (let i in this.gridPositions) {
            if (this.gridPositions[i].col === col && this.gridPositions[i].row === row) {
                return this.gridPositions[i].index
            }
        }
    }

    changeSameAdjacentData = (data, index, old_value) => {
        if (data[index] === old_value) {
            data[index] = 'to be changed'
            if (!this.gridPositions[index]) return
            const { col, row } = this.gridPositions[index]
            this.changeSameAdjacentData(data, this.getIndexByColRow(col - 1, row), old_value)
            this.changeSameAdjacentData(data, this.getIndexByColRow(col - 1, row - 1), old_value)
            this.changeSameAdjacentData(data, this.getIndexByColRow(col + 1, row), old_value)
            this.changeSameAdjacentData(data, this.getIndexByColRow(col + 1, row + 1), old_value)
            return data
        }
    }



    getMoveFillData = (grids, gridPosition, data) => {
        //get grid indexes with same adjacent data

        //grids: to draw
        //gridposition: mouse position
        //data: the layer data needs to change by fill
        let returnData = [...data]
        const old_value = returnData[gridPosition.index]
        returnData = this.changeSameAdjacentData(returnData, gridPosition.index, old_value)
        for (let i in returnData) {
            if (returnData[i] === 'to be changed')
                returnData[i] = grids[0].gid
        }
        return returnData
    }

    getMoveEraserData = (gridPosition, data) => {
        let returnData = [...data]
        if (!gridPosition) return
        returnData[gridPosition.index] = 0
        return returnData
    }
}