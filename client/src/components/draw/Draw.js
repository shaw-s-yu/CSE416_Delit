import React from "react";
import './draw.css'
import TopNavbar from '../tools/TopNavbar'
import Toolbar from '../tools/Toolbar.js'
import PropertyBar from './PropertyBar'
import DisplayPlace from "./DisplayPlace";
import * as handler from '../../store/database/WorkScreenHandler';
import { connect } from 'react-redux';
import TOOLS from '../tools/ToolbarTools'

class Draw extends React.Component {

    render() {

        const { history } = this.props

        return (
            <div onClick={this.props.handleUnselect}>
                <TopNavbar side={false} view={false} history={history} />
                <div className="painter-wrapper">
                    <Toolbar
                        className="map-toolbar"
                        content={[
                            { name: TOOLS.UNDO, item: <i className={"fas fa-undo"} style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.REDO, item: <i className={"fas fa-redo"} style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.UPLOAD, item: <i className={"fas fa-upload"} style={{ fontSize: '24px' }} /> },
                            { name: TOOLS.DOWNLOAD, item: <i className={"fas fa-download"} style={{ fontSize: '24px' }} /> },
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
                    <PropertyBar />
                    <DisplayPlace />
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {}
};

const mapDispatchToProps = (dispatch) => ({
    handleUnselect: () => dispatch(handler.toolbarUnselectHandler()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Draw);;