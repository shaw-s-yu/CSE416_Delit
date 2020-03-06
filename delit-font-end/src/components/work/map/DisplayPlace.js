import React from 'react';
import logo from '../../../img/Sketch003.jpg'
import { Button, Icon } from 'react-materialize'

class MapWindow extends React.Component {

    state = {
        scale: 1,
    }

    handleZoomIn = () => {
        const scale = this.state.scale * 2;
        this.setState({ scale: scale }, () => {
            console.log(scale)
        })
    }

    handleZoomOut = () => {
        const scale = this.state.scale / 2;
        this.setState({ scale: scale }, () => {
            console.log(scale)
        })
    }

    render() {
        const scale = this.state.scale;
        return (
            <div>
                <Button small
                    waves="red"
                    node="button"
                    className="col s3 work-top-button"
                    icon={<Icon>zoom_in</Icon>}
                    onClick={this.handleZoomIn}>
                </Button>

                <Button small
                    waves="red"
                    node="button"
                    className="col s3 work-top-button"
                    icon={<Icon>zoom_out</Icon>}
                    onClick={this.handleZoomOut}>
                </Button>
                <div className="display-place" onMouseDown={e => e.stopPropagation()}>

                    <img src={logo} className="map" style={{ transform: "translate(-110px, -110px) scale(" + scale + ")" }}></img>
                </div>
            </div>

        )
    }

}

export default MapWindow;
