import React from 'react';
import logo from '../../../img/Sketch003.jpg'
import { Button, Icon } from 'react-materialize'

class MapWindow extends React.Component {

    state = {
        width: 1500,
        height: 1000,
    }

    handleZoomIn = () => {
        console.log('zoom in ')
        let { scale, width, height } = this.state;
        scale = scale * 2;
        width = width * 2;
        height = height * 2;
        this.setState({ scale: scale, width: width, height: height })
    }

    handleZoomOut = () => {
        let { scale, width, height } = this.state;
        scale = scale / 2;
        width = width / 2;
        height = height / 2;
        this.setState({ scale: scale, width: width, height: height })
    }

    render() {
        const { width, height } = this.state;
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

                    <img src={logo} className="map" style={{
                        width: width,
                        height: height
                    }}></img>
                </div>
            </div>

        )
    }

}

export default MapWindow;
