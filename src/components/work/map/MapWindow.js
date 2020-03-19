import React from 'react';
import { Rnd } from 'react-rnd';
import { connect } from 'react-redux';
import Titlebar from '../../tools/Titlebar'
import * as handler from '../../../store/database/WorkScreenHandler';
import Toolbar from '../../tools/Toolbar'
import TileMap from '../tileset/TileMap'


class MapWindow extends React.Component {

    state = {}

    handleOnResize = (e, direction, ref, delta, position) => {
        this.props.handleToTop('map');
        const { width, height } = ref.style
        this.setState({ width, height }, () => {
            this.props.handleOnResize("map", { width, height })
        })
    }

    render() {
        const { size, position } = this.props.window
        const { width, height } = size;
        const style = {
            maxWidth: width,
            maxHeight: height - 70,
        }
        return (
            <Rnd
                className="workscreen-window"
                size={size}
                default={position}
                onMouseDown={() => { this.props.handleToTop('map') }}
                onResize={this.handleOnResize}
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
                        <i className="fas fa-search-minus" style={{ fontSize: '24px' }} />,
                        <i className="fas fa-search-plus" style={{ fontSize: '24px' }} />,
                    ]}
                />
                <TileMap style={style} width={width} height={height - 70} />
            </Rnd>

        )
    }

}

const mapStateToProps = (state) => {
    const { map } = state.workScreen
    return {
        window: map,
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleOnResize: (name, value) => dispatch(handler.resizeWindowHandler(name, value)),
})

export default connect(mapStateToProps, mapDispatchToProps)(MapWindow)
