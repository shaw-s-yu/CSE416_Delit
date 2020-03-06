import React from 'react';
import { Rnd } from 'react-rnd';
import TileMap from './TileMap'

const rect = document.body.getBoundingClientRect();

class TilesetWindow extends React.Component {

    render() {
        const { width, height } = rect
        const x = width * 0.8;
        const y = height * 0.7 * 0.4;
        console.log(x, y)
        return (
            <Rnd
                className="workscreen-window"
                default={{
                    x: x,
                    y: y,
                    width: width * 0.2,
                    height: height * 0.7 * 0.6,
                }}

            >
                <TileMap />
            </Rnd>

        )
    }

}

export default TilesetWindow;
