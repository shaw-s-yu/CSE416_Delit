import React from 'react'
import TOOLS from '../tools/ToolbarTools'
import TopNavbar from '../tools/TopNavbar'
import { connect } from 'react-redux';
import * as handler from '../../store/database/WorkScreenHandler';
import Toolbar from '../tools/Toolbar.js'
import QueryList from '../../graphql/Query'
import { Query } from 'react-apollo'
import ViewerDisplay from './ViewerDisplay'
import TextField from "@material-ui/core/TextField";
import Dialog from '../tools/Dialog'
import { Button } from "react-bootstrap";
import axios from 'axios';


class TilesetViewer extends React.Component {


    state = {
        scale: 1,
        open: false,
        name: ''
    }

    display = React.createRef()

    handleDialogOpen = () => {
        this.setState({ open: true })
    }

    handleDialogClose = () => {
        this.setState({ open: false })
    }

    handleOnChange = e => {
        this.setState({ name: e.target.value })
    }

    handleDuplicate = () => {
        const imgData = this.display.handleGetImageNoGrid()

        const tileset = this.display.getTileset()
        const { userId, name } = this.state
        const data = {
            name: name,
            data: imgData,
            tileset: tileset, userId: userId
        }
        this.props.socket.emit('duplicate-image', data)
        this.handleDialogClose()
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

    handleUnselect = () => {
        this.props.handleUnselect();
    };

    handleExport = () => {
        const imgData = this.display.handleGetImageNoGrid();
        require("downloadjs")(imgData, "tileset@DELIT.jpeg", "image/jpeg");
    };

    UNSAFE_componentWillMount() {
        this.props.socket.on('duplicate-image-back', res => {
            this.props.history.push(`/tileseteditor/${res}`)
        })
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

    render() {
        const { key } = this.props.match.params
        const { history, } = this.props;
        const { scale, open, name } = this.state
        return (
            <div onClick={this.handleUnselect}>
                <TopNavbar site='test' history={history} />
                <div className="painter-wrapper">
                    <Toolbar
                        className="map-toolbar"
                        content={[
                            { name: TOOLS.DOWNLOAD, item: <i className={"fas fa-download"} style={{ fontSize: '24px' }} onClick={this.handleExport} /> },
                            { name: TOOLS.SAVE, item: <i className={"fas fa-save"} style={{ fontSize: '24px' }} onClick={this.handleDialogOpen} /> },
                        ]}
                        rightContent={[
                            { name: TOOLS.ZOOM_OUT, item: <i className={"fas fa-search-minus"} style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.ZOOM_IN, item: <i className={"fas fa-search-plus"} style={{ fontSize: '24px' }} /> },
                        ]}
                    />
                    <Query query={QueryList.GET_TILESET} variables={{ id: key }} fetchPolicy={'network-only'}>
                        {({ loading, error, data }) => {
                            if (loading) return 'loading'
                            if (error) return 'error'
                            if (!data) return 'error'
                            const { tileset } = data

                            return (
                                <ViewerDisplay
                                    tileset={tileset}
                                    handleZoomEffect={this.handleZoomEffect}
                                    scale={scale}
                                    childRef={ref => this.display = ref}
                                />
                            )
                        }}
                    </Query>
                </div>
                <Dialog
                    header="Saving Tileset"
                    open={open}
                    actions={[
                        <Button key='1' onClick={this.handleDuplicate}>Confirm</Button>,
                        <Button key='2' onClick={this.handleDialogClose}>Cancel</Button>
                    ]}
                    content={[
                        <h3 key='1'>This is a published Tileset, You cannot change it</h3>,
                        <h3 key='2'>But you can own it By making a duplicate of it</h3>,
                        <h3 key='3'>After Duplication You will have to publish it to use it</h3>,
                        <TextField
                            key='r'
                            className='duplicate-input'
                            label="Enter Name for your new tileset"
                            variant="outlined"
                            size="small"
                            value={name}
                            onChange={this.handleOnChange}
                        />
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

export default connect(mapStateToProps, mapDispatchToProps)(TilesetViewer);