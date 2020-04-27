import React from 'react'
import { Scrollbars } from 'react-custom-scrollbars'
import { connect } from 'react-redux';
import TOOLS from '../tools/ToolbarTools'
import CanvasController from './CanvasController'
import squirtle from '../../img/squirtle.jpg'
import DrawTransaction from "./DrawTransaction"
import CropBox from './CropBox'

class DisplayPlace extends React.Component {

    state = {
        scale: 1,
        imgWidth: 0,
        imgHeight: 0,
        width: 0,
        height: 0,
        mouseDown: false,
        offsetLeft: 0,
        offsetTop: 0,
        cropData: null,
        cropping: false,
    }

    scrollbar = React.createRef();
    cropBox = React.createRef();

    cropResizeStart = () => {
        const { left, top } = this.state.cropData
        const oldImg = this.refs.canvas.toDataURL('image/jpeg', 1)
        this.ctx.putImageData(this.state.cropData.imgData, left, top)
        const newImg = this.refs.canvas.toDataURL('image/jpeg', 1)
        this.props.socket.emit('draw', { data: newImg, type: 'new' })
        this.props.transactions.addTransaction(new DrawTransaction(oldImg, newImg, this.drawImage))
    }

    cropResize = (ref, position) => {
        const { width, height } = ref.style
        const { x, y } = position
        const newData = this.painter.CROP.reCrop({
            left: x, top: y,
            width: parseInt(width),
            height: parseInt(height)
        })

        const cropData = {
            left: x, top: y,
            width: parseInt(width),
            height: parseInt(height),
            imgData: newData
        }
        this.setState({ cropData })
    }

    cropDragStart = () => {
        const { left, top, width, height } = this.state.cropData
        this.painter.CROP.clearCropArea(left, top, width, height)
    }

    cropDragEnd = (d) => {
        this.setState({
            cropData: {
                ...this.state.cropData,
                left: d.x,
                top: d.y
            }
        })
    }


    handleZoomEffect = (e) => {

        e.stopPropagation()
        const { selectedTool } = this.props;
        if (selectedTool !== TOOLS.ZOOM_IN && selectedTool !== TOOLS.ZOOM_OUT) return
        const { scale } = this.state
        const factor = selectedTool === TOOLS.ZOOM_IN ? 1 / 0.8 : selectedTool === TOOLS.ZOOM_OUT ? 0.8 : 1
        const nscale = scale * factor
        this.setState({ scale: nscale })

        let target = document.getElementById('display')
        const rect = target.getBoundingClientRect()
        const { clientX, clientY } = e
        const { left, top } = rect
        const dx = clientX - left
        const dy = clientY - top
        const ndy = dy * factor
        const ndx = dx * factor
        const ddy = ndy - dy
        const ddx = ndx - dx
        target.style.transform = "scale(" + nscale + ")"


        const currX = this.refs.scrollbar.getScrollLeft();
        const currY = this.refs.scrollbar.getScrollTop();

        if (nscale >= 1) {
            this.refs.scrollbar.scrollLeft(ddx + currX)
            this.refs.scrollbar.scrollTop(ddy + currY)
        }
    }

    getSelectedTools = () => {
        const { selectedTool } = this.props
        if (selectedTool === TOOLS.ZOOM_IN)
            return 'display-zoom-in'
        if (selectedTool === TOOLS.ZOOM_OUT)
            return 'display-zoom-out'
        if (selectedTool === TOOLS.PENCIL)
            return 'display-pencil'
        if (selectedTool === TOOLS.ERASER)
            return 'display-eraser'
        if (selectedTool === TOOLS.FILL)
            return 'display-fill'
        if (selectedTool)
            return 'display-cross-cursor'
        return ''
    }

    handleToolStart = (e) => {
        const { selectedTool, borderThic, fillColor, borderColor } = this.props
        if (!selectedTool) return
        this.painter.initDraw(selectedTool, borderThic, fillColor, borderColor)
        const { clientX, clientY } = e
        const { x, y } = this.handleFixPosition(clientX, clientY)

        // if (this.state.cropping)
        //     this.ctx.putImageData(this.state.cropData.imgData, this.state.cropData.left, this.state.cropData.top)

        // console.log(this.state.cropping, this.state.cropData)

        this.painter.startDraw(x, y)


        this.setState({
            mouseDown: true,
            cropData: this.state.cropping ? null : this.state.cropData,
            cropping: selectedTool === TOOLS.CROP ? true : false
        })
    }

    handleToolMove = (e) => {
        const { mouseDown } = this.state
        if (!mouseDown) return


        const { clientX, clientY } = e
        const { x, y } = this.handleFixPosition(clientX, clientY)
        this.painter.onDraw(x, y)
    }

    handleToolEnd = (e) => {
        const { selectedTool } = this.props
        if (!selectedTool) return
        if (selectedTool === TOOLS.CROP) e.stopPropagation()
        if (this.state.mouseDown === false) return
        if (selectedTool === TOOLS.ZOOM_IN || selectedTool === TOOLS.ZOOM_OUT)
            this.handleZoomEffect(e)

        e.stopPropagation()

        const { clientX, clientY } = e
        const { x, y } = this.handleFixPosition(clientX, clientY)
        this.painter.endDraw(x, y)

        let cropData = (selectedTool === TOOLS.CROP ? this.painter.CROP.getCroppedData() : null);

        this.setState({
            mouseDown: false,
            cropData: cropData,
            cropping: selectedTool === TOOLS.CROP ? true : false
        })
    }

    handleCropFlip = () => {
        console.log(this.state.cropping)
        if (this.state.cropping === false)
            return

        const oldImg = this.refs.canvas.toDataURL('image/jpeg', 1)
        const { imgData, left, top } = this.cropBox.getCropData()
        this.ctx.putImageData(imgData, left, top)
        this.painter.CROP.endCrop()
        this.setState({
            cropData: null,
            cropping: false
        })
        const newImg = this.refs.canvas.toDataURL('image/jpeg', 1)

        this.props.socket.emit('draw', { data: newImg, type: 'new' })
        this.props.transactions.addTransaction(new DrawTransaction(oldImg, newImg, this.drawImage))

    }

    handleEndCrop = () => {
        this.painter.CROP.endCrop()
        if (this.state.cropData !== null) {
            const old_img = this.refs.canvas.toDataURL('image/jpeg', 1)
            this.ctx.putImageData(this.state.cropData.imgData, this.state.cropData.left, this.state.cropData.top)
            const new_img = this.refs.canvas.toDataURL('image/jpeg', 1)
            this.props.socket.emit('draw', { data: new_img, type: 'new' })
            this.props.transactions.addTransaction(new DrawTransaction(old_img, new_img, this.drawImage))
        }
        this.setState({
            cropData: null,
            cropping: false
        })
    }

    handleFixPosition = (clientX, clientY) => {
        const windowScrollX = window.scrollX
        const windowScrollY = window.scrollY
        let x = windowScrollX + clientX
        let y = windowScrollY + clientY
        const canvasX = this.refs.canvas.getBoundingClientRect().left
        const canvasY = this.refs.canvas.getBoundingClientRect().top
        x -= canvasX
        y -= canvasY
        const { scale } = this.state
        x /= scale
        y /= scale
        return { x, y }
    }

    handleClear = () => {
        const color = { r: 211, g: 211, b: 211, a: 1 }
        this.painter.initDraw('SQUARE', 1, color, color)
        this.painter.startDraw(0, 0)
        this.painter.onDraw(this.state.imgWidth, this.state.imgHeight)
        this.painter.endDraw(this.state.imgWidth, this.state.imgHeight)
    }


    drawImage = (src, callback) => {
        let img = new Image()
        img.src = src
        img.onload = () => {
            const { width, height } = this.refs.painterBox.getBoundingClientRect()
            this.setState({
                imgWidth: img.width,
                imgHeight: img.height,
                width, height,
            }, () => {
                this.ctx.drawImage(img, 0, 0)
                this.painter.setDimension(img.width, img.height)
                if (callback) callback()
            })
        }
    }

    getImageData = () => {
        return this.refs.canvas.toDataURL('image/jpeg', 1)
    }

    handleHorizontalFlip = () => {
        const imgSrc = this.refs.canvas.toDataURL('image/jpeg', 1)
        this.ctx.scale(-1, 1)
        this.ctx.translate(-this.state.imgWidth, 0);
        this.drawImage(imgSrc, () => {
            this.ctx.scale(-1, 1)
            this.ctx.translate(-this.state.imgWidth, 0);
        })
    }

    handleVerticalFlip = () => {
        const imgSrc = this.refs.canvas.toDataURL('image/jpeg', 1)
        this.ctx.scale(1, -1)
        this.ctx.translate(0, -this.state.imgHeight);
        this.drawImage(imgSrc, () => {
            this.ctx.scale(1, -1)
            this.ctx.translate(0, -this.state.imgHeight);
        })
    }




    componentDidMount() {

        this.props.childRef(this)
        const { canvas } = this.refs;

        if (!canvas) return

        this.ctx = this.refs.canvas.getContext('2d')
        this.painter = new CanvasController(this)

        this.drawImage(squirtle)

        window.onresize = () => {
            const { width, height } = this.refs.painterBox.getBoundingClientRect()
            this.setState({
                width, height,
            })
        }
    }

    UNSAFE_componentWillMount() {
        this.props.socket.on('drawBack', res => {
            const old_img = this.refs.canvas.toDataURL('image/jpeg', 1)
            const { transactions } = this.props
            const { data, type } = res

            if (type === 'new') {
                transactions.addTransaction(new DrawTransaction(old_img, data, this.drawImage))
            }
            else if (type === 'redo') {
                transactions.doTransaction()
            } else if (type === 'undo') {
                transactions.undoTransaction()
            }

        })
    }

    render() {
        const { scale, imgWidth, imgHeight, width, height, cropData } = this.state;
        const { selectedTool } = this.props
        const scrollStyle = {
            width: '100%',
            height: '100%',
            backgroundColor: 'lightgray',
            paddingBottom: 6,
        }

        const displayStyle = {
            left: imgWidth ? imgWidth * scale >= width ? 6 : (width - imgWidth * scale) / 2 + 6 : 6,
            top: imgHeight ? imgHeight * scale >= height ? 6 : (height - imgHeight * scale) / 2 + 6 : 6
        }

        const cropStyle = {
            x: cropData === null ? 'auto' : cropData.left,
            y: cropData === null ? 'auto' : cropData.top,
            width: cropData === null ? 'auto' : cropData.width,
            height: cropData === null ? 'auto' : cropData.height
        }

        return (
            <div className="painter-display" ref='painterBox'>
                <Scrollbars ref="scrollbar"
                    style={scrollStyle}
                    renderThumbHorizontal={props => <div {...props} className="thumb" />}
                    renderThumbVertical={props => <div {...props} className="thumb" />}
                >

                    <div className={"display " + this.getSelectedTools()} id='display'
                        onMouseDown={this.handleToolStart}
                        onMouseMove={this.handleToolMove}
                        onMouseOut={this.handleToolEnd}
                        onClick={this.handleToolEnd}
                        style={displayStyle}>
                        <canvas ref='canvas' width={imgWidth} height={imgHeight}>
                            Your Browser Does Not Support Canvas
                        </canvas>

                        {
                            (selectedTool === TOOLS.CROP && cropData) ?
                                <CropBox className='cropped-area'
                                    style={cropStyle}
                                    cropData={cropData}
                                    childRef={ref => this.cropBox = ref}
                                    parentRef={this}
                                />
                                : null
                        }
                    </div>

                </ Scrollbars>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    const { selected } = state.toolbar
    return {
        selectedTool: selected,
        socket: state.backend.socket
    }
};

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(DisplayPlace)
