import React from 'react';
import { Rnd } from 'react-rnd';


class PropertyWindow extends React.Component {

    render() {

        return (
            <Rnd
                className="workscreen-window-property"
                default={{
                    x: 0,
                    y: 0,
                }}
            >
                Property Window
            </Rnd>

        )
    }

}

export default PropertyWindow;
