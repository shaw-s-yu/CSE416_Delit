import React from 'react';
import logo from '../../../img/Sketch003.jpg'
import { Button, Icon } from 'react-materialize'

class MapWindow extends React.Component {

    state = {
        scale: 50,
    }

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
                <div className="display-place" id="display-place" onMouseDown={e => e.stopPropagation()}>

                    <img src={logo} className="map" id="map" style={{
                        width: scale + "%",
                        height: scale + "%",
                        left: scale < 100 ? (100 - scale) / 2 + "%" : 0,
                        top: scale < 100 ? (100 - scale) / 2 + "%" : 0
                    }}></img>
                </div>
            </div>

        )
    }

}

export default MapWindow;
