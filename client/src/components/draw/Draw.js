import React from "react";
import './draw.css'
import TopNavbar from '../tools/TopNavbar'
import Toolbar from '../tools/Toolbar.js'
import PropertyBar from './PropertyBar'
import DisplayPlace from "./DisplayPlace";
import * as handler from '../../store/database/WorkScreenHandler';
import { connect } from 'react-redux';
import TOOLS from '../tools/ToolbarTools'
import Transactions from '../controller/JSTPS'
import ReactFileReader from 'react-file-reader';
import Dialogs from './Dialogs'
import QueryList from '../../graphql/Query'
import { Query } from 'react-apollo'
import axios from 'axios';
import { Button } from "react-bootstrap";
// import icons from "glyphicons";

class Draw extends React.Component {

    state = {
        sliderValue: 1,
        borderColor: { r: 0, g: 0, b: 0, a: 1 },
        fillColor: { r: 255, g: 255, b: 255, a: 1 },
        scale: 1,
        saveOpen: false,
        duplicaOpen: false,
        startAuthOpen: false,
        confirmSaveOpen: false,
        publishOpen: false,
        saved: false,
        username: null,
        saveErrorMsg: ''
    };

    transactions = new Transactions();
    display = React.createRef();

    handleExportJson =() =>{
        const imgData = this.display.getTilesetJson()
        // console.log(imgData)
        // console.log(this.props)
        // console.log(this.display)
        require("downloadjs")(imgData, "tilesetJson@DELIT.json", "json");
    }

    handleSaveDialogOpen = () => {
        if (this.display.userIsTeammember())
            this.setState({ saveOpen: true })
        else
            this.setState({ startAuthOpen: true })
    }

    handleSaveDialogClose = () => {
        this.setState({ saveOpen: false })
    }

    handleConfirmSaveDialogOpen = () => {
        this.setState({ saved: false, confirmSaveOpen: true, saveOpen: false, saveErrorMsg: '' })
    }

    handleConfirmSaveDialogClose = () => {
        this.setState({ saved: false, confirmSaveOpen: false, saveErrorMsg: '' })
    }

    handleStartDialogOpen = () => {
        this.setState({ startAuthOpen: true })
    }

    handleStartDialogClose = () => {
        this.setState({ startAuthOpen: false })
    }

    handlePublishDialogOpen = () => {
        this.setState({ publishOpen: true })
    }

    handlePublishDialogClose = () => {
        this.setState({ publishOpen: false })
    }

    handleDuplicateDialogOpen = () => {
        this.setState({ duplicaOpen: true })
    }

    handleDuplicateDialogClose = () => {
        this.setState({ duplicaOpen: false })
    }

    handleRefreshAfterPublished = () => {
        const { key } = this.props.match.params
        this.props.history.push(`/tilesetviewer/${key}`)
    }

    handleDuplicate = (name) => {
        const imgData = this.display.handleGetImageNoGrid()
        const tileset = this.display.getTileset()
        const { userId } = this.state
        this.props.socket.emit('duplicate-image', {
            name: name,
            data: imgData,
            tileset, userId
        })
        this.handleDuplicateDialogClose()
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
        this.handleConfirmSaveDialogOpen()
        this.handleClearNoneToolOperation()
    }

    handleCopy = () => {
        this.display.handleCopy()
    }

    handlePaste = () => {
        this.display.pasteCopiedGrid()
    }

    handleGoBack = () => {
        this.props.history.push('/dashboard')
    }

    componentDidMount() {
        axios.get('/auth/current').then(res => {
            const { username, _id } = res.data;
            if (!username || !_id)
                this.props.history.push('/');
            else {
                this.setState({ username, userId: _id });
            }
        })
    }

    UNSAFE_componentWillMount() {
        this.props.socket.on('duplicate-image-back', res => {
            this.props.history.push(`/tileseteditor/${res}`)
        })

        this.props.socket.on('draw-save-back', res => {
            const { err, msg } = res
            if (err) {
                this.setState({ saveErrorMsg: msg })
            } else {
                this.setState({ saved: true })
            }
        })
    }

    render() {
        const { key } = this.props.match.params
        const { history } = this.props;
        const { sliderValue, saved, borderColor, fillColor, scale, saveOpen, startAuthOpen, duplicaOpen, username, confirmSaveOpen, saveErrorMsg, publishOpen } = this.state;

        return (

            <div onClick={this.handleUnselect}>
                <TopNavbar site='tileset' history={history}
                    handleSave={this.handleSaveDialogOpen}
                    handleExportJson={this.handleExportJson}
                    handleImport={this.handleImport}
                    handleExport={this.handleExport}
                    handleDuplicate={this.handleDuplicateDialogOpen}
                    handleDoTransaction={this.doTransaction}
                    handleUndoTransaction={this.undoTransaction}
                    handleCopy={this.handleCopy}
                    handlePaste={this.handlePaste}
                />
                <Button className='publish-btn' onClick={this.handlePublishDialogOpen}>Publish</Button>
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
                            { name: TOOLS.EXPORT_JSON, item: <i className={"fas fa-box"} style={{fontSize: '24px' }} onClick={this.handleExportJson} />},
                            { name: TOOLS.COPY, item: <i className={"fas fa-copy"} style={{ fontSize: '24px' }} onClick={this.handleCopy} /> },
                            { name: TOOLS.PASTE, item: <i className={"fas fa-paste"} style={{ fontSize: '24px' }} onClick={this.handlePaste} /> },
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
                    <Query query={QueryList.GET_TILESET} variables={{ id: key }} fetchPolicy={'network-only'}>
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
                                    handleStartDialogOpen={this.handleStartDialogOpen}
                                />
                            )
                        }}
                    </Query>
                </div>
                <Dialogs
                    parent={this}
                    save={saveOpen}
                    start={startAuthOpen}
                    duplicate={duplicaOpen}
                    confirmSave={confirmSaveOpen}
                    publish={publishOpen}
                    saved={saved}
                    saveErrorMsg={saveErrorMsg}
                />

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