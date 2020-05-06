import React from 'react';
import { Rnd } from 'react-rnd';
import ImageWrapper from '../canvas/ImageWrapper'
import * as handler from '../../../store/database/WorkScreenHandler';
import { connect } from 'react-redux';
import Titlebar from '../../tools/Titlebar'
import Collapsible from '../../tools/Collapsible'


class TilesetWindow extends React.Component {

    state = {
        resizing: false,
    }

    tileMap = React.createRef()

    handleSelect = () => {
        this.props.handleUnselect()
        this.props.handleToTop('tileset');
    }


    handleOnResize = (e, direction, ref, delta, position) => {
        let { width, height } = ref.style
        width = parseInt(width)
        height = parseInt(height)
        this.setState({ resizing: true, size: { width, height } })
    }

    handleStopResize = (e, direction, ref, delta, position) => {
        let { width, height } = ref.style
        width = parseInt(width)
        height = parseInt(height)
        this.setState({ resizing: false, size: { width, height } })
    }

    handleGoPaint = () => {
        this.props.history.push('/tileset/ffe')
    }



    render() {
        const { resizing } = this.state;
        const { open, dimension } = this.props
        const { width, height } = dimension.size;
        const style = {
            maxWidth: width,
            maxHeight: height - 110,
        }
        return (
            <Rnd
                className={"workscreen-window " + (open ? '' : 'invisible')}
                position={dimension.position}
                size={dimension.size}
                onMouseDown={this.handleSelect}
                onResizeStart={() => this.props.handleToTop('tileset')}
                onResize={this.handleOnResize}
                onResizeStop={this.handleStopResize}
                id='tileset'
                onDragStop={(e,d)=>this.props.handleOnDragStop(e,d,'tileset')}
            >
                <Titlebar title="Tileset Window" />

                <Collapsible data={
                    [
                        { title: 'Tileset 1', content: <ImageWrapper style={style} width={width} height={height - 110} window="tileset" childRef={ref => this.tileMap = ref} />, open: false },
                        { title: 'Tileset 2', content: <ImageWrapper style={style} width={width} height={height - 110} window="tileset" childRef={ref => this.tileMap = ref} />, open: true },
                    ]
                }
                    maxHeight={style.maxHeight}
                    resizing={resizing}
                />

                <i className="fas fa-plus tileset-add-btn better-btn " onMouseDown={e => e.stopPropagation()} onClick={this.handleGoPaint} />
                <i className="fas fa-search-plus tileset-zoomin-btn better-btn " onMouseDown={e => e.stopPropagation()} />
                <i className="fas fa-search-minus tileset-zoomout-btn better-btn " onMouseDown={e => e.stopPropagation()} />
                <i className="fas fa-trash-alt tileset-delete-btn better-btn " onMouseDown={e => e.stopPropagation()} />

            </Rnd>

        )
    }

}

const mapStateToProps = (state) => {
    return {
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleUnselect: () => dispatch(handler.unselectTilesetHandler()),
    handleToTop: (window) => dispatch(handler.handleToTop(window)),
})

export default connect(mapStateToProps, mapDispatchToProps)(TilesetWindow)
