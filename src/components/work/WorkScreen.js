import React from 'react';
import TopNavbar from './TopNavbar'
import PropertyWindow from './property/PropertyWindow'
import LayerWindow from './layer/LayerWindow'
import TilesetWindow from './tileset/TilesetWindow'
import MapWindow from './map/MapWindow'
import './workscreen.css'
import { connect } from 'react-redux';
import Paint from '../draw/draw'


const screen = {
    WORK_SPACE: "WORK_SPACE",
    PAINT_SCREEN: "PAINT_SCREEN",
}
class WorkScreen extends React.Component {

    state = {
        currentScreen: screen.WORK_SPACE,
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

    handleGoPaint = () => {
        this.setState({
            currentScreen: screen.PAINT_SCREEN,
        })
    }

    handleGoWork = () => {
        this.setState({
            currentScreen: screen.WORK_SPACE,
        })
    }

    getScreen = () => {
        const { currentScreen } = this.state;
        if (currentScreen === screen.WORK_SPACE)
            return (
                <>
                    <MapWindow key="map" />
                    <PropertyWindow key="property" />
                    <LayerWindow key="layer" />
                    <TilesetWindow key="tileset" handleGoPaint={this.handleGoPaint} />
                </>
            )
        else if (currentScreen === screen.PAINT_SCREEN)
            return <Paint />
        else
            return "error"
    }


    componentDidMount() {
        document.getElementById('map').style.zIndex = 1;
        document.getElementById('property').style.zIndex = 2;
        document.getElementById('layer').style.zIndex = 3;
        document.getElementById('tileset').style.zIndex = 4;
    }

    render = () => {


        return (
            <div>
                <TopNavbar />
                <div>
                    {
                        this.getScreen()
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
