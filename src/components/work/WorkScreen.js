import React from 'react';
import TopNavbar from './TopNavbar'
import PropertyWindow from './property/PropertyWindow'
import LayerWindow from './layer/LayerWindow'
import TilesetWindow from './tileset/TilesetWindow'
import MapWindow from './map/MapWindow'
import './workscreen.css'
import { connect } from 'react-redux';


class WorkScreen extends React.Component {

    state = {
        order: ['map', 'property', 'layer', 'tileset']
    }

    handleToTop = (window) => {
        let { order } = this.state;
        order.push(order.splice(order.indexOf(window), 1)[0]);
        this.setState({ order: order })
    }

    render = () => {

        const { order } = this.state;
        return (
            <div>
                <TopNavbar />
                <div>
                    {
                        order && order.map(window => {
                            if (window === "map")
                                return <MapWindow key="map" handleToTop={this.handleToTop} />
                            else if (window === "property")
                                return <PropertyWindow key="property" handleToTop={this.handleToTop} />
                            else if (window === 'layer')
                                return <LayerWindow key="layer" handleToTop={this.handleToTop} />
                            else
                                return <TilesetWindow key="tileset" handleToTop={this.handleToTop} />
                        })
                    }
                </div>
            </div >

        )
    }

}



const mapStateToProps = (state) => {
    return {

    }
};

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(WorkScreen)
