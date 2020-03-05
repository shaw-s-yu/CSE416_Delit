import React from 'react';
import { Rnd } from 'react-rnd';


class PropertyWindow extends React.Component {

    render() {
        return (
            <Rnd
                className="workscreen-window"
                default={{
                    x: 0,
                    y: 0,
                    width: 320,
                    height: 200,
                }}
            >
                Property Window
            </Rnd>

        )
    }

}

export default PropertyWindow;
