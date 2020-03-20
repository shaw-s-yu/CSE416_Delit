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
        order: ['map', 'property', 'layer', 'tileset'],
        currentScreen: screen.WORK_SPACE,
    }

    handleToTop = (window) => {
        let { order } = this.state;
        order.push(order.splice(order.indexOf(window), 1)[0]);
        this.setState({ order: order })
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
        const { order, currentScreen } = this.state;
        if (currentScreen === screen.WORK_SPACE)
            return order && order.map(window => {
                if (window === "map")
                    return <MapWindow key="map" handleToTop={this.handleToTop} />
                else if (window === "property")
                    return <PropertyWindow key="property" handleToTop={this.handleToTop} />
                else if (window === 'layer')
                    return <LayerWindow key="layer" handleToTop={this.handleToTop} />
                else
                    return <TilesetWindow key="tileset" handleToTop={this.handleToTop} handleGoPaint={this.handleGoPaint} />
            })
        else if (currentScreen === screen.PAINT_SCREEN)
            return <Paint />
        else
            return "error"
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
