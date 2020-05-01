import { Rnd } from 'react-rnd';
import React from 'react';

class CropBox extends React.Component {

    state = {
        resized: false,
        operationCounts: 0
    }



    onResizeStart = () => {
        this.props.parentRef.cropResizeStart()
    }

    onResize = (e, dir, ref, delta, position) => {
        this.setState({ resized: true })
        this.props.parentRef.cropResize(ref, position)
    }

    onResizeStop = (e, dir, ref, delta, position) => {
        const operationCounts = this.state.operationCounts + 1
        this.setState({ operationCounts })
    }

    onDragStart = (e, d) => {
        e.stopPropagation()
        console.log(this.state.operationCounts)
        if (this.state.resized || this.state.operationCounts === 0)
            this.props.parentRef.cropDragStart()
        this.setState({ resized: false })
    }

    onDragStop = (e, d) => {
        e.stopPropagation()
        this.props.parentRef.cropDragEnd(d)
        const operationCounts = this.state.operationCounts + 1
        this.setState({ operationCounts })
    }


    renderCanvas = () => {
        try {
            this.ctx.putImageData(this.props.cropData.imgData, 0, 0)
        }
        catch{
            return
        }
    }

    drawImage = (src, callback) => {
        let img = new Image()
        img.src = src
        img.onload = () => {
            this.ctx.drawImage(img, 0, 0)
            if (callback) callback()
        }
    }

    handleHorizontalFlip = () => {
        const imgSrc = this.refs.canvas.toDataURL('image/jpeg', 1)
        this.ctx.scale(-1, 1)
        this.ctx.translate(-this.props.style.width, 0);
        this.drawImage(imgSrc, () => {
            this.ctx.scale(-1, 1)
            this.ctx.translate(-this.props.style.width, 0);
            this.props.parentRef.handleCropFlip()
        })
    }

    handleVerticalFlip = () => {
        const imgSrc = this.refs.canvas.toDataURL('image/jpeg', 1)
        this.ctx.scale(1, -1)
        this.ctx.translate(0, -this.props.style.height);
        this.drawImage(imgSrc, () => {
            this.ctx.scale(1, -1)
            this.ctx.translate(0, -this.props.style.height);
            this.props.parentRef.handleCropFlip()
        })
    }

    getCropData = () => {
        return {
            ...this.props.cropData,
            imgData: this.ctx.getImageData(0, 0, this.props.style.width, this.props.style.height)
        }
    }

    componentDidUpdate() {
        this.renderCanvas()
        this.props.childRef(this)
    }

    componentDidMount() {
        this.ctx = this.refs.canvas.getContext('2d')
    }

    render() {

        const { className, style } = this.props
        const { width, height, x, y } = style
        return (
            <Rnd
                className={className}
                size={{ width, height }}
                position={{ x, y }}
                onResizeStart={this.onResizeStart}
                onResize={this.onResize}
                onResizeStop={this.onResizeStop}
                onDragStart={this.onDragStart}
                onDragStop={this.onDragStop}

            >
                <canvas ref='canvas' width={width} height={height}>
                    Your Browser Does Not Support Canvas
                </canvas>
            </Rnd >
        )
    }

}

export default CropBox