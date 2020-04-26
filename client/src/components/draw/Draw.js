import React from "react";
import './draw.css'
import TopNavbar from '../tools/TopNavbar'
import Toolbar from '../tools/Toolbar.js'
import PropertyBar from './PropertyBar'
import DisplayPlace from "./DisplayPlace";
import * as handler from '../../store/database/WorkScreenHandler';
import { connect } from 'react-redux';
import TOOLS from '../tools/ToolbarTools'
import Transactions from './JSTPS'
import ReactFileReader from 'react-file-reader';
import drawTransaction from './DrawTransaction'

class Draw extends React.Component {

    state = {
        sliderValue: 1,
        borderColor: { r: 0, g: 0, b: 0, a: 1 },
        fillColor: { r: 255, g: 255, b: 255, a: 0.5 },
    }

    transactions = new Transactions()
    display = React.createRef()

    sliderOnChange = (e, newValue) => {
        this.setState({
            sliderValue: newValue
        })
    }

    borderColorOnChange = (color) => {
        this.setState({ borderColor: color.rgb })
    }

    fillColorOnChange = (color) => {
        this.setState({ fillColor: color.rgb })
    }

    doTransaction = () => {
        this.props.socket.emit('draw', { data: null, type: 'redo' })
        this.transactions.doTransaction()
    }

    undoTransaction = () => {
        this.props.socket.emit('draw', { data: null, type: 'undo' })
        this.transactions.undoTransaction()
    }

    handleUnselect = () => {
        this.display.handleEndCrop()
        this.props.handleUnselect()
    }

    handleHorizontalFlip = (e) => {
        e.stopPropagation()
        if (!this.display.state.cropping) {
            this.display.handleHorizontalFlip()
        } else {
            this.display.cropBox.handleHorizontalFlip()
        }
        this.props.handleUnselect()
    }

    handleVerticalFlip = (e) => {
        e.stopPropagation()
        if (!this.display.state.cropping) {
            this.display.handleVerticalFlip()
        } else {
            this.display.cropBox.handleVerticalFlip()
        }
        this.props.handleUnselect()
    }

    handleClear = () => {
        this.display.handleClear()
    }

    handleImport = (file) => {
        const oldImg = this.display.getImageData()

        this.display.drawImage(file.base64)
        this.props.socket.emit('draw', { data: file.base64, type: 'new' })
        this.transactions.addTransaction(new drawTransaction(oldImg, file.base64, this.display.drawImage))

    }

    handleExport = () => {
        const imgData = this.display.getImageData()
        require("downloadjs")(imgData, "tileset@DELIT.jpeg", "image/jpeg");
    }

    render() {

        const { history } = this.props
        const { sliderValue, borderColor, fillColor } = this.state

        return (
            <div onClick={this.handleUnselect}>
                <TopNavbar side={false} view={false} history={history} />
                <div className="painter-wrapper">
                    <Toolbar
                        className="map-toolbar"
                        content={[
                            { name: TOOLS.UNDO, item: <i className={"fas fa-undo"} style={{ fontSize: '24px' }} onClick={this.undoTransaction} /> },
                            { name: TOOLS.REDO, item: <i className={"fas fa-redo"} style={{ fontSize: '24px' }} onClick={this.doTransaction} /> },
                            {
                                name: TOOLS.UPLOAD, item:
                                    <ReactFileReader ref='fileUploader' handleFiles={this.handleImport} base64={true}>
                                        <i className={"fas fa-upload"} style={{ fontSize: '24px' }} />
                                    </ReactFileReader>
                            },
                            { name: TOOLS.DOWNLOAD, item: <i className={"fas fa-download"} style={{ fontSize: '24px' }} onClick={this.handleExport} /> },
                            { name: TOOLS.SAVE, item: <i className={"fas fa-save"} style={{ fontSize: '24px' }} /> },
                        ]}
                        secondaryContent={[
                            { name: TOOLS.PENCIL, item: <i className={"fas fa-pencil-alt"} style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.LINE, item: <i className="fas fa-slash" style={{ fontSize: '24px' }}></i> },
                            { name: TOOLS.SQUARE, item: <i className={"far fa-square"} style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.CIRCLE, item: <i className={"far fa-circle"} style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.ERASER, item: <i className={"fas fa-eraser"} style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.FILL, item: <i className={"fas fa-fill"} style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.CROP, item: <i className={"fas fa-crop-alt"} style={{ fontSize: '24px' }} /> },
                        ]}
                        rightContent={[
                            { name: TOOLS.ZOOM_OUT, item: <i className={"fas fa-search-minus"} style={{ fontSize: '24px' }} onClick={this.handleZoomOut} /> },
                            { name: TOOLS.ZOOM_IN, item: <i className={"fas fa-search-plus"} style={{ fontSize: '24px' }} onClick={this.handleZoomIn} /> },
                        ]}
                    />
                    <PropertyBar
                        sliderValue={sliderValue}
                        sliderOnChange={this.sliderOnChange}
                        borderColor={borderColor}
                        borderColorOnChange={this.borderColorOnChange}
                        fillColor={fillColor}
                        fillColorOnChange={this.fillColorOnChange}
                        handleHorizontalFlip={this.handleHorizontalFlip}
                        handleVerticalFlip={this.handleVerticalFlip}
                        handleClear={this.handleClear}
                    />
                    <DisplayPlace
                        childRef={ref => this.display = ref}
                        borderThic={sliderValue}
                        fillColor={fillColor}
                        borderColor={borderColor}
                        transactions={this.transactions}
                    />
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    const { selected } = state.toolbar
    return {
        selectedTool: selected,
        socket: state.backend.socket
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleUnselect: () => dispatch(handler.toolbarUnselectHandler()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Draw);;