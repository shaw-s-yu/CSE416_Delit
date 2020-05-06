import React from 'react';
import TopNavbar from '../tools/TopNavbar'
import PropertyWindow from './property/PropertyWindow'
import LayerWindow from './layer/LayerWindow'
import TilesetWindow from './tileset/TilesetWindow'
import MapWindow from './map/MapWindow'
import './workscreen.css'
import { connect } from 'react-redux';

class WorkScreen extends React.Component {

    state = {
        propertyOpen: true,
        layerOpen: true,
        tilesetOpen: true,
        property: { size: { width: 0, height: 0 }, position: { x: 0, y: 0 } },
        map: { size: { width: 0, height: 0 }, position: { x: 0, y: 0 } },
        tileset: { size: { width: 0, height: 0 }, position: { x: 0, y: 0 } },
        layer: { size: { width: 0, height: 0 }, position: { x: 0, y: 0 } },
    }

    handleToTop = (window) => {
        let target = document.getElementById(window)
        if (target.style.zIndex === "4") {
            return
        }

        let map = document.getElementById('map')
        let property = document.getElementById('property')
        let layer = document.getElementById('layer')
        let tileset = document.getElementById('tileset')
        map.style.zIndex -= (map.style.zIndex <= 1 ? 0 : 1)
        property.style.zIndex -= (property.style.zIndex <= 1 ? 0 : 1)
        layer.style.zIndex -= (layer.style.zIndex <= 1 ? 0 : 1)
        tileset.style.zIndex -= (tileset.style.zIndex <= 1 ? 0 : 1)

        target.style.zIndex = 4

    }

    getScreen = () => {
        const { propertyOpen, layerOpen, tilesetOpen, property, map, layer, tileset } = this.state;
        const { history } = this.props
        return (
            <>
                <MapWindow key="map" handleToTop={this.handleToTop} dimension={map} />
                <PropertyWindow key="property" open={propertyOpen} handleToTop={this.handleToTop} dimension={property} />
                <LayerWindow key="layer" open={layerOpen} handleToTop={this.handleToTop} dimension={layer} />
                <TilesetWindow key="tileset" open={tilesetOpen} dimension={tileset} history={history} handleToTop={this.handleToTop} />
            </>
        )
    }

    handleWindowOpen = (e, window) => {
        e.stopPropagation()
        const { propertyOpen, layerOpen, tilesetOpen } = this.state
        if (window === 'property')
            this.setState({ propertyOpen: !propertyOpen })
        else if (window === 'layer')
            this.setState({ layerOpen: !layerOpen })
        else if (window === 'tileset')
            this.setState({ tilesetOpen: !tilesetOpen })
    }

    componentDidMount() {
        document.getElementById('map').style.zIndex = 1;
        document.getElementById('property').style.zIndex = 2;
        document.getElementById('layer').style.zIndex = 3;
        document.getElementById('tileset').style.zIndex = 4;

        const { width, height } = document.body.getBoundingClientRect();

        this.setState({
            property: { size: { width: width * 0.2, height: height * 0.88 }, position: { x: 0, y: 0 } },
            map: { size: { width: width * 0.6, height: height * 0.88 }, position: { x: width * 0.2, y: 0 } },
            layer: { size: { width: width * 0.2, height: height * 0.32 }, position: { x: width * 0.8, y: 0 } },
            tileset: { size: { width: width * 0.2, height: height * 0.56 }, position: { x: width * 0.8, y: height * 0.32 } },
        })
    }

    render = () => {

        const { propertyOpen, layerOpen, tilesetOpen } = this.state
        const { history } = this.props
        return (
            <div>
                <TopNavbar site='workspace' handleWindowOpen={this.handleWindowOpen} propertyOpen={propertyOpen} layerOpen={layerOpen} tilesetOpen={tilesetOpen} history={history} />
                <div>
                    {
                        this.getScreen()
                    }
                </div>
            </div >

        )
    }

}



const mapStateToProps = (state, ownProps) => {
    const { history } = ownProps
    return {
        history
    }
};

const mapDispatchToProps = (dispatch) => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(WorkScreen)
