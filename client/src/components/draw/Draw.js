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
import { Button } from "react-bootstrap";
import Dialog from '../tools/Dialog'
import QueryList from '../../graphql/Query'
import { Query } from 'react-apollo'
import axios from 'axios';


class Draw extends React.Component {

    state = {
        sliderValue: 1,
        borderColor: { r: 0, g: 0, b: 0, a: 1 },
        fillColor: { r: 255, g: 255, b: 255, a: 1 },
        scale: 1,
        saveDialogOpen: false,
        username: null
    };

    transactions = new Transactions();
    display = React.createRef();


    handleSaveDialogOpen = () => {
        this.setState({ saveDialogOpen: true })
    }

    handleSaveDialogClose = () => {
        this.setState({ saveDialogOpen: false })
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


        const currX = this.display.refs.scrollbar.getScrollLeft();
        const currY = this.display.refs.scrollbar.getScrollTop();

        if (nscale >= 1) {
            this.display.refs.scrollbar.scrollLeft(ddx + currX)
            this.display.refs.scrollbar.scrollTop(ddy + currY)
        }
    }

    sliderOnChange = (e, newValue) => {
        this.setState({
            sliderValue: newValue
        });
    };

    borderColorOnChange = (color) => {
        this.setState({ borderColor: color.rgb });
    };

    fillColorOnChange = (color) => {
        this.setState({ fillColor: color.rgb });
    };

    doTransaction = () => {
        this.display.doTransaction()
    };

    undoTransaction = () => {
        this.display.undoTransaction()
    };

    handleUnselect = () => {
        this.props.handleUnselect();
    };

    handleClearNoneToolOperation = () => {
        this.display.handleUnselectGrid()
        this.display.handleStopCopying()
    }


    handleHorizontalFlip = (e) => {
        e.stopPropagation();
        this.display.handleHorizontalFlip();
        this.props.handleUnselect();
    };

    handleVerticalFlip = (e) => {
        e.stopPropagation();
        this.display.handleVerticalFlip();
        this.props.handleUnselect();
    };

    handleClear = () => {
        this.display.handleClear();
    };

    handleImport = (file) => {
        const oldImg = this.display.getImageDataWithGrid();

        this.display.handleDrawImgToGrid(file.base64, () => {
            const newImg = this.display.getImageDataWithGrid()
            this.display.addNewTransaction(oldImg, newImg)
            this.display.sendSocketNewOperation()
        })
    };

    handleExport = () => {
        const imgData = this.display.handleGetImageNoGrid();
        require("downloadjs")(imgData, "tileset@DELIT.jpeg", "image/jpeg");
    };

    handleSave = () => {
        const imgData = this.display.handleGetImageNoGrid()
        this.props.socket.emit('draw-save', {
            tilesetId: this.props.match.params.key,
            data: imgData
        });
        this.handleSaveDialogClose()
        this.handleClearNoneToolOperation()
    }

    componentDidMount() {
        axios.get('/auth/current').then(res => {
            const { username } = res.data;
            if (!username)
                this.props.history.push('/');
            else {
                this.setState({ username });
            }
        })
    }

    render() {
        const { key } = this.props.match.params
        const { history } = this.props;
        const { sliderValue, borderColor, fillColor, scale, saveDialogOpen, username } = this.state;

        return (

            <div onClick={this.handleUnselect}>
                <TopNavbar site='tileset' history={history} />
                <div className="painter-wrapper">
                    <Toolbar
                        selectCallback={this.handleClearNoneToolOperation}
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
                            { name: TOOLS.SAVE, item: <i className={"fas fa-save"} style={{ fontSize: '24px' }} onClick={this.handleSaveDialogOpen} /> },
                        ]}
                        secondaryContent={[
                            { name: TOOLS.PENCIL, item: <i className={"fas fa-pencil-alt"} style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.LINE, item: <i className="fas fa-slash" style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.SQUARE, item: <i className={"far fa-square"} style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.CIRCLE, item: <i className={"far fa-circle"} style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.ERASER, item: <i className={"fas fa-eraser"} style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.FILL, item: <i className={"fas fa-fill"} style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.CROP, item: <i className={"fas fa-crop-alt"} style={{ fontSize: '24px' }} /> },
                        ]}
                        rightContent={[
                            { name: TOOLS.ZOOM_OUT, item: <i className={"fas fa-search-minus"} style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.ZOOM_IN, item: <i className={"fas fa-search-plus"} style={{ fontSize: '24px' }} /> },
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
                    <Query query={QueryList.GET_tILESET} variables={{ id: key }} fetchPolicy={'network-only'}>
                        {({ loading, error, data }) => {
                            if (loading) return 'loading'
                            if (error) return 'error'
                            if (!data) return 'error'
                            const { tileset } = data
                            return (
                                <DisplayPlace
                                    tileset={tileset}
                                    childRef={ref => this.display = ref}
                                    borderThic={sliderValue}
                                    fillColor={fillColor}
                                    borderColor={borderColor}
                                    transactions={this.transactions}
                                    handleZoomEffect={this.handleZoomEffect}
                                    scale={scale}
                                    username={username}
                                />
                            )
                        }}
                    </Query>
                </div>
                <Dialog
                    header="Save Image"
                    open={saveDialogOpen}
                    actions={[
                        <Button key='1' onClick={this.handleSave}>Yes</Button>,
                        <Button key='2' onClick={this.handleSaveDialogClose}>Cancel</Button>
                    ]}
                    var totalTextbox='1'
                    content={[
                        <h3 key='q'>Are You Sure to Save In Delit Database?</h3>,
                        <h3 key='w'>Old Version will be overwriten</h3>
                    ]} />

            </div>

        )
    }
}
const mapStateToProps = (state, ownProps) => {
    const { selected } = state.toolbar;
    return {
        selectedTool: selected,
        socket: state.backend.socket
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleUnselect: () => dispatch(handler.toolbarUnselectHandler()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Draw);