import TOOLS from '../tools/ToolbarTools'


class CanvasController {
    constructor(ctx, width, height) {
        this.ctx = ctx
        this.tool = null
        this.fillStyle = ''
        this.width = width
        this.height = height
    }

    initDraw = (tool, fillStyle) => {
        this.tool = tool
        this.fillStyle = fillStyle
    }

    startDraw = (x, y) => {
        if (this.tool === TOOLS.PENCIL)
            this.pencilStartDraw(x, y)
        if (this.tool === TOOLS.LINE)
            this.lineStartDraw(x, y)
    }

    onDraw = (x, y) => {
        if (this.tool === TOOLS.PENCIL)
            this.pencilOnDraw(x, y)
        if (this.tool === TOOLS.LINE)
            this.lineOnDraw(x, y)
    }

    endDraw = (x, y) => {
        if (this.tool === TOOLS.PENCIL)
            this.pencilOnDraw(x, y)
        if (this.tool === TOOLS.LINE)
            this.lineEndDraw(x, y)

        this.tool = null
    }

    pencilStartDraw = (x, y) => {
        this.ctx.beginPath()
        this.ctx.moveTo(x, y)
    }

    pencilOnDraw = (x, y) => {
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }

    lineStartDraw = (x, y) => {
        this.startX = x
        this.startY = y
        this.startData = this.ctx.getImageData(0, 0, this.width, this.height);
    }

    lineOnDraw = (x, y) => {

        this.ctx.putImageData(this.startData, 0, 0);
        this.ctx.beginPath()
        this.ctx.moveTo(this.startX, this.startY)
        this.ctx.lineTo(x, y)
        this.ctx.stroke()
    }

    lineEndDraw = (x, y) => {
        this.lineOnDraw(x, y)
    }
}


export default CanvasController