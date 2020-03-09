import React from 'react';
import { Rnd } from 'react-rnd';

const rect = document.body.getBoundingClientRect();

class PropertyWindow extends React.Component {

    render() {
        const { width, height } = rect;
        return (
            <Rnd
                className="workscreen-window"
                default={{
                    x: 0,
                    y: 0,
                    width: width * 0.2,
                    height: height * 0.7
                }}
            >
                Property Window
            </Rnd>

        )
    }

}

export default PropertyWindow;
