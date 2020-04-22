import TOOLS from '../tools/ToolbarTools'


class CanvasController {
    constructor(ctx, width, height) {
        this.ctx = ctx
        this.tool = null
        this.fillStyle = ''
        this.width = width
        this.height = height
        this.drawing = false
    }

    initDraw = (tool, fillStyle) => {
        this.tool = tool
        this.fillStyle = fillStyle
    }

    startDraw = (x, y) => {
        this.drawing = true
        this[this.tool].startDraw(x, y)
    }

    onDraw = (x, y) => {
        if (!this.drawing) return
        this[this.tool].onDraw(x, y)
    }

    endDraw = (x, y) => {
        if (!this.drawing) return
        this[this.tool].endDraw(x, y)
        this.drawing = false
    }

    PENCIL = {
        startDraw: (x, y) => {
            this.ctx.beginPath()
            this.ctx.moveTo(x, y)
        },

        onDraw: (x, y) => {
            this.ctx.lineTo(x, y)
            this.ctx.stroke()
        },

        endDraw: (x, y) => {
            this.onDraw(x, y)
        },
    }

    LINE = {
        startDraw: (x, y) => {
            this.startX = x
            this.startY = y
            this.startData = this.ctx.getImageData(0, 0, this.width, this.height);
        },
        onDraw: (x, y) => {
            this.ctx.putImageData(this.startData, 0, 0);
            this.ctx.beginPath()
            this.ctx.moveTo(this.startX, this.startY)
            this.ctx.lineTo(x, y)
            this.ctx.stroke()
        },
        endDraw: (x, y) => {
            this.onDraw(x, y)
        },
    }
}


export default CanvasController