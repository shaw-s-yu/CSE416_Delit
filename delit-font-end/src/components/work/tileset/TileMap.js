import React from 'react';
import { Button, Icon } from 'react-materialize'
import Canvas from '../canvas/Canvas'

class TileMap extends React.Component {

    state = {
        scale: 50,
    }

    canvas = React.createRef();

    handleZoomIn = () => {

        let { scale } = this.state;
        scale = scale * 2;
        this.setState({ scale: scale })
    }

    handleZoomOut = () => {
        let { scale } = this.state;
        scale = scale / 2;
        this.setState({ scale: scale })
    }

    render() {
        const { scale } = this.state;
        return (
            <div>
                <Button small
                    waves="red"
                    node="button"
                    className=""
                    icon={<Icon>zoom_in</Icon>}
                    onClick={this.handleZoomIn}>
                </Button>

                <Button small
                    waves="red"
                    node="button"
                    className=""
                    icon={<Icon>zoom_out</Icon>}
                    onClick={this.handleZoomOut}>
                </Button>
                <div className="display-place" onMouseDown={e => e.stopPropagation()}>

                    <Canvas canvas={this.canvas} className="map" style={{
                        width: scale + "%",
                        height: scale + "%",
                        left: scale < 100 ? (100 - scale) / 2 + "%" : 0,
                        top: scale < 100 ? (100 - scale) / 2 + "%" : 0,
                        border: "1px solid #d3d3d3"
                    }} />
                </div>
            </div>

        )
    }

}

export default TileMap;
