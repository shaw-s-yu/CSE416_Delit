import React from 'react';
import { Rnd } from 'react-rnd';
import TileMap from '../tileset/TileMap'

const rect = document.body.getBoundingClientRect();

class MapWindow extends React.Component {


    render() {
        const { width, height } = rect
        const x = width * 0.2;
        const y = 0;
        return (
            <Rnd
                className="workscreen-window"
                default={{
                    x: x,
                    y: y,
                    width: width * 0.6,
                    height: height * 0.7
                }}
            >
                <TileMap />
            </Rnd>

        )
    }

}

export default MapWindow;
