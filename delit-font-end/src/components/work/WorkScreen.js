import React from 'react';
import TopNavbar from './TopNavbar'
import PropertyWindow from './PropertyWindow'
import LayerWindow from './LayerWindow'
import TilesetWindow from './TilesetWindow'
import MapWindow from './MapWindow'

class WorkScreen extends React.Component {

    render() {

        return (
            <div>
                <TopNavbar />
                <div>
                    <MapWindow />
                    <PropertyWindow />
                    <LayerWindow />
                    <TilesetWindow />

                </div>
            </div>

        )
    }

}

export default WorkScreen;
