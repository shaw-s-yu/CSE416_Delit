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


    drawImage = (src, callback) => {
        let img = new Image()
        img.src = src
        img.onload = () => {
            this.ctx.drawImage(img, 0, 0)
            if (callback) callback()
        }
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

    handleHorizontalFlip = () => {
        const imgSrc = this.ctx.canvas.toDataURL('image/jpeg', 1)
        this.ctx.scale(-1, 1)
        this.ctx.translate(-this.width, 0);
        this.drawImage(imgSrc, () => {
            this.ctx.scale(-1, 1)
            this.ctx.translate(-this.width, 0);
        })
    }

    handleVerticalFlip = () => {
        const imgSrc = this.ctx.canvas.toDataURL('image/jpeg', 1)
        this.ctx.scale(1, -1)
        this.ctx.translate(0, -this.height);
        this.drawImage(imgSrc, () => {
            this.ctx.scale(1, -1)
            this.ctx.translate(0, -this.height);
        })
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