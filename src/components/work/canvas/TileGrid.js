
class TileGrid {
    constructor(ctx, img, width, height) {
        this.ctx = ctx;
        this.img = img;
        this.width = width;         //tile dimension
        this.height = height;       //tile dimension
        this.mapWidth = this.ctx.canvas.width    //canvas dimension
        this.mapHeight = this.ctx.canvas.height  //canvas dimension
        this.srcWidth = 0           //img dimension
        this.srcHeight = 0          //img dimension
        this.sx = []
        this.sy = []
        this.sWidth = []
        this.sHeight = []
        this.dx = []
        this.dy = []
        this.dWidth = []
        this.dHeight = []
        this.numColumn = 0
        this.numRow = 0
    }

    getSize = () => {
        return this.numRow * this.numColumn;
    }

    /*
        this function aims to set data for params of ctx.drawImage(), all of them shall be an array with same size
        image shall be cropped to grids of tile dimension
        cropped grids shall be converted into canvas dimension with rate of tile dimension and canvas dimension
        same apply to xy
    */
    buildModel = () => {
        this.srcWidth = this.img.width
        this.srcHeight = this.img.height
        this.numColumn = Math.floor(this.srcWidth / this.width)
        this.numRow = Math.floor(this.srcHeight / this.height)
        this.buildSource()
        this.buildDestination()
    }

    buildSource = () => {
        for (let o = 0; o < this.numRow; o++)
            for (let i = 0; i < this.numColumn; i++) {
                this.sx.push(i * this.width)
                this.sy.push(o * this.height)
                this.sWidth.push(this.width)
                this.sHeight.push(this.height)
            }
    }

    buildDestination = () => {
        const destinationWidth = this.mapWidth / this.numColumn
        const destinationHeight = this.mapHeight / this.numRow

        for (let o = 0; o < this.numRow; o++)
            for (let i = 0; i < this.numColumn; i++) {
                this.dx.push(i * destinationWidth)
                this.dy.push(o * destinationHeight)
                this.dWidth.push(destinationWidth)
                this.dHeight.push(destinationHeight)
            }
    }

    draw = () => {
        for (let i = 0; i < this.getSize(); i++) {
            this.ctx.drawImage(this.img, this.sx[i], this.sy[i], this.sWidth[i], this.sHeight[i], this.sx[i] + 1, this.sy[i] + 1, this.sWidth[i] - 2, this.sHeight[i] - 2);
        }
    }

    drawSelected = (x, y) => {
        const { mapWidth, mapHeight, numColumn, numRow } = this;
        this.ctx.beginPath();
        this.ctx.rect(mapWidth / numColumn * x, mapHeight / numRow * y, mapWidth / numColumn, mapHeight / numRow);
        this.ctx.stroke();

    }

    clearSelected = selected => {
        const { mapWidth, mapHeight, numColumn, numRow } = this;
        this.ctx.beginPath();
        for (let s in selected) {
            this.ctx.rect(mapWidth / numColumn * s.x, mapHeight / numRow * s.y, mapWidth / numColumn, mapHeight / numRow);
        }
        this.ctx.stroke();

    }
}

export default TileGrid;