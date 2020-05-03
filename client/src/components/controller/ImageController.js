export default class ImageController {
    constructor(ctx, ctxHelper, width, height, gridWidth, gridHeight) {
        this.ctx = ctx
        this.ctxHelper = ctxHelper
        this.width = width
        this.height = height
        this.gridWidth = gridWidth
        this.gridHeight = gridHeight
    }


    drawToGrid = (src, gridPositions) => {

        this.drawHelper(src, () => {
            const imageData = this.getImageDataFromHelper()
            for (let i = 0; i < gridPositions.length; i++)
                this.ctx.putImageData(
                    imageData,
                    0, 0,
                    gridPositions[i].x,
                    gridPositions[i].y,
                    this.gridWidth,
                    this.gridHeight
                )
        })
    }



    drawHelper = (src, callback) => {
        if (!this.ctxHelper) return

        let img = new Image()
        img.src = src
        img.onload = () => {
            this.ctxHelper.drawImage(img, 0, 0)
            this.helperImageData = this.ctxHelper.getImageData(0, 0, this.width, this.height)
            callback()
        }
    }

    getImageDataFromHelper = () => {
        return this.helperImageData
    }
}


export const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
}