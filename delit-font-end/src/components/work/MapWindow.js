import React from 'react';
import { Rnd } from 'react-rnd';

const rect = document.body.getBoundingClientRect();

class MapWindow extends React.Component {


    render() {
        const { width, height } = rect
        const x = width * 0.2;
        const y = 0;
        console.log(typeof x, y)
        return (
            <Rnd
                className="workscreen-window-layer"
                default={{
                    x: x,
                    y: y,
                    width: width * 0.6,
                    height: height * 0.7
                }}
            >
                Map Window
            </Rnd>

        )
    }

}

export default MapWindow;
