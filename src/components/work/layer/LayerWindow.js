import React from 'react';
import { Rnd } from 'react-rnd';

const rect = document.body.getBoundingClientRect();

class LayerWindow extends React.Component {

    render() {
        const { width, height } = rect
        const x = width * 0.8;
        const y = 0;
        return (
            <Rnd
                className="workscreen-window"
                default={{
                    x: x,
                    y: y,
                    width: width * 0.2,
                    height: height * 0.7 * 0.4
                }}
            >
                Layer Window
            </Rnd>

        )
    }

}

export default LayerWindow;
