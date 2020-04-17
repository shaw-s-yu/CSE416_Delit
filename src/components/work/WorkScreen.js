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
        map.style.zIndex -= 1
        property.style.zIndex -= 1
        layer.style.zIndex -= 1
        tileset.style.zIndex -= 1

        target.style.zIndex = 4

    }

    getScreen = () => {
        const { propertyOpen, layerOpen, tilesetOpen } = this.state;
        const { history } = this.props
        return (
            <>
                <MapWindow key="map" handleToTop={this.handleToTop} />
                <PropertyWindow key="property" open={propertyOpen} handleToTop={this.handleToTop} />
                <LayerWindow key="layer" open={layerOpen} handleToTop={this.handleToTop} />
                <TilesetWindow key="tileset" open={tilesetOpen} history={history} handleToTop={this.handleToTop} />
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
    }

    render = () => {

        const { propertyOpen, layerOpen, tilesetOpen } = this.state

        return (
            <div>
                <TopNavbar side={false} view={true} handleWindowOpen={this.handleWindowOpen} propertyOpen={propertyOpen} layerOpen={layerOpen} tilesetOpen={tilesetOpen} />
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
