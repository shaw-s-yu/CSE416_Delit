import React from 'react';
import { Rnd } from 'react-rnd';


class LayerWindow extends React.Component {

    render() {
        const { width, height } = this.props
        const x = width * 0.8;
        const y = 0;
        console.log(x, y)
        return (
            <Rnd
                className="workscreen-window-layer"
                default={{
                    x: x,
                    y: y,
                }}
            >
                Layer Window
            </Rnd>

        )
    }

}

export default LayerWindow;
