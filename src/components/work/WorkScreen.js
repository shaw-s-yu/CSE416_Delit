import React from 'react';
import TopNavbar from './TopNavbar'
import PropertyWindow from './property/PropertyWindow'
import LayerWindow from './layer/LayerWindow'
import TilesetWindow from './tileset/TilesetWindow'
import MapWindow from './map/MapWindow'
import './workscreen.css'

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
