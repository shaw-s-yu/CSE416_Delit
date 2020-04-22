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
            if (!this.startX || !this.startY) return
            this.ctx.putImageData(this.startData, 0, 0);
            this.ctx.beginPath()
            this.ctx.moveTo(this.startX, this.startY)
            this.ctx.lineTo(x, y)
            this.ctx.stroke()
        },
        endDraw: (x, y) => {
            this.onDraw(x, y)
            this.startX = null
            this.startY = null
        },
    }

    SQUARE = {
        startDraw: (x, y) => {
            this.startX = x
            this.startY = y
            this.startData = this.ctx.getImageData(0, 0, this.width, this.height);
        },
        onDraw: (x, y) => {
            if (!this.startX || !this.startY) return
            this.ctx.putImageData(this.startData, 0, 0);
            this.ctx.beginPath();
            this.ctx.rect(this.startX, this.startY, x - this.startX, y - this.startY);
            this.ctx.stroke();
        },
        endDraw: (x, y) => {
            this.onDraw(x, y)
            this.startX = null
            this.startY = null
        }
    }

    CIRCLE = {
        startDraw: (x, y) => {
            this.startX = x
            this.startY = y
            this.startData = this.ctx.getImageData(0, 0, this.width, this.height);
        },
        onDraw: (x, y) => {
            if (!this.startX || !this.startY) return
            this.ctx.putImageData(this.startData, 0, 0);
            const centerX = (x + this.startX) / 2
            const centerY = (y + this.startY) / 2
            const radiusX = Math.abs(x - this.startX) / 2
            const radiusY = Math.abs(y - this.startY) / 2
            this.ctx.beginPath();
            this.ctx.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI)
            this.ctx.stroke();
        },
        endDraw: (x, y) => {
            this.onDraw(x, y)
            this.startX = null
            this.startY = null
        }
    }
}


export default CanvasController