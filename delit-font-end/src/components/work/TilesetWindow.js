import React from 'react';
import { Rnd } from 'react-rnd';


class TilesetWindow extends React.Component {

    render() {
        const { width, height } = this.props
        const x = width * 0.8;
        const y = height * 0.4;
        console.log(x, y)
        return (
            <Rnd
                className="workscreen-window-tilesets"
                default={{
                    x: x,
                    y: y,
                }}
            >
                Tileset Window
            </Rnd>

        )
    }

}

export default TilesetWindow;
