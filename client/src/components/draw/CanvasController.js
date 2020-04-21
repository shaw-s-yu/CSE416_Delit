import TOOLS from '../tools/ToolbarTools'


class CanvasController {
    constructor(ctx) {
        this.ctx = ctx
        this.tool = null
        this.fillStyle = ''
    }

    initDraw = (tool, fillStyle, offsetLeft, offsetTop) => {
        this.tool = tool
        this.fillStyle = fillStyle
        this.offsetLeft = offsetLeft
        this.offsetTop = offsetTop
    }

    startDraw = (x, y) => {
        if (this.tool === TOOLS.PENCIL)
            this.pencilStartDraw(x, y)
    }

    onDraw = (x, y) => {
        if (this.tool === TOOLS.PENCIL)
            this.pencilOnDraw(x, y)
    }

    endDraw = (x, y) => {
        if (this.tool === TOOLS.PENCIL)
            this.pencilOnDraw(x, y)

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

}


export default CanvasController