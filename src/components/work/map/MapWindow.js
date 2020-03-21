import React from 'react';
import { Rnd } from 'react-rnd';
import { connect } from 'react-redux';
import Titlebar from '../../tools/Titlebar'
import * as handler from '../../../store/database/WorkScreenHandler';
import Toolbar from '../../tools/Toolbar'
import TileMap from '../tileset/TileMap'


const rect = document.body.getBoundingClientRect();
const { width, height } = rect


class MapWindow extends React.Component {

    state = {
        position: { x: width * 0.2, y: 0 },
        size: { width: width * 0.6, height: height * 0.7 < 442.867 ? 442.867 : height * 0.7 },
        zoom: "100%",
    }

    tileMap = React.createRef()

    handleOnResize = (e, direction, ref, delta, position) => {
        let { width, height } = ref.style
        width = parseInt(width)
        height = parseInt(height)
        this.setState({ size: { width, height } })
    }

    render() {
        const { size, position } = this.state
        const { width, height } = size;
        const style = {
            maxWidth: width,
            maxHeight: height - 70,
        }
        return (
            <Rnd
                className="workscreen-window"
                id="map"
                size={size}
                default={position}
                onMouseDown={() => { this.props.handleToTop('map') }}
                onResizeStart={() => this.props.handleToTop('map')}
                onResize={this.handleOnResize}
                onResizeStop={this.handleOnResize}
            >
                <Titlebar title="Map Window" />
                <Toolbar
                    className="map-toolbar"
                    content={[
                        <i className="fas fa-undo" style={{ fontSize: '24px' }} />,
                        <i className="fas fa-redo" style={{ fontSize: '24px' }} />,
                        <i className="fas fa-upload" style={{ fontSize: '24px' }} />,
                        <i className="fas fa-download" style={{ fontSize: '24px' }} />,
                        <i className="fas fa-save" style={{ fontSize: '24px' }} />,
                        <i className="fas fa-stamp" style={{ fontSize: '24px' }} />,
                        <i className="fas fa-eraser" style={{ fontSize: '24px' }} />,
                        <i className="fas fa-fill" style={{ fontSize: '24px' }} />,
                    ]}
                    rightContent={[
                        <i className="fas fa-search-minus" style={{ fontSize: '24px' }} onClick={e => this.tileMap.handleZoomOut(e)} />,
                        <i className="fas fa-search-plus" style={{ fontSize: '24px' }} onClick={e => this.tileMap.handleZoomIn(e)} />,
                    ]}
                />
                <TileMap style={style} width={width} height={height - 70} window="map" childRef={ref => this.tileMap = ref} />
            </Rnd>

        )
    }

}

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleToTop: (window) => dispatch(handler.handleToTop(window)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MapWindow)
