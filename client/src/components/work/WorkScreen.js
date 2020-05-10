import React from 'react';
import TopNavbar from '../tools/TopNavbar'
import PropertyWindow from './property/PropertyWindow'
import LayerWindow from './layer/LayerWindow'
import TilesetWindow from './tileset/TilesetWindow'
import MapWindow from './map/MapWindow'
import './workscreen.css'
import { connect } from 'react-redux';
import QueryList from '../../graphql/Query'
import { Query } from 'react-apollo'
import * as handler from '../../store/database/WorkScreenHandler'

class WorkScreen extends React.Component {

    state = {
        propertyOpen: true,
        layerOpen: true,
        tilesetOpen: true,
        property: { size: { width: 0, height: 0 }, position: { x: 0, y: 0 }, zIndex: 1 },
        map: { size: { width: 0, height: 0 }, position: { x: 0, y: 0 }, zIndex: 2 },
        tileset: { size: { width: 0, height: 0 }, position: { x: 0, y: 0 }, zIndex: 3 },
        layer: { size: { width: 0, height: 0 }, position: { x: 0, y: 0 }, zIndex: 4 },
    }

    handleToTop = (window) => {

        const targetZIndex = this.state[window].zIndex
        if (targetZIndex === 4) return
        const { property, map, tileset, layer } = this.state
        const propertyZIndex = property.zIndex === targetZIndex ? 4 : property.zIndex < targetZIndex ? property.zIndex : property.zIndex - 1;
        const mapZIndex = map.zIndex === targetZIndex ? 4 : map.zIndex < targetZIndex ? map.zIndex : map.zIndex - 1;
        const tilesetZIndex = tileset.zIndex === targetZIndex ? 4 : tileset.zIndex < targetZIndex ? tileset.zIndex : tileset.zIndex - 1;
        const layerZIndex = layer.zIndex === targetZIndex ? 4 : layer.zIndex < targetZIndex ? layer.zIndex : layer.zIndex - 1;


        this.setState({
            property: {
                ...property,
                zIndex: propertyZIndex,
            },
            map: {
                ...map,
                zIndex: mapZIndex,
            },
            tileset: {
                ...tileset,
                zIndex: tilesetZIndex
            },
            layer: {
                ...layer,
                zIndex: layerZIndex
            }
        })
    }

    getScreen = () => {
        const { propertyOpen, layerOpen, tilesetOpen, property, map, layer, tileset } = this.state;
        const { history } = this.props
        return (
            <>
                <MapWindow key="map" handleToTop={this.handleToTop} dimension={map} handleOnDragStop={this.handleOnDragStop} />
                <PropertyWindow key="property" open={propertyOpen} handleToTop={this.handleToTop} dimension={property} handleOnDragStop={this.handleOnDragStop} />
                <LayerWindow key="layer" open={layerOpen} handleToTop={this.handleToTop} dimension={layer} handleOnDragStop={this.handleOnDragStop} />
                <TilesetWindow key="tileset" open={tilesetOpen} dimension={tileset} history={history} handleToTop={this.handleToTop} handleOnDragStop={this.handleOnDragStop} />
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

    handleOnDragStop = (e, d, type) => {
        this.setState({ [type]: { ...this.state[type], position: { x: d.x, y: d.y } } })
    }

    componentDidMount() {

        const { width, height } = document.body.getBoundingClientRect();

        this.setState({
            property: { size: { width: width * 0.2, height: height * 0.88 }, position: { x: 0, y: 0 }, zIndex: 1 },
            map: { size: { width: width * 0.6, height: height * 0.88 }, position: { x: width * 0.2, y: 0 }, zIndex: 2 },
            layer: { size: { width: width * 0.2, height: height * 0.32 }, position: { x: width * 0.8, y: 0 }, zIndex: 3 },
            tileset: { size: { width: width * 0.2, height: height * 0.56 }, position: { x: width * 0.8, y: height * 0.32 }, zIndex: 4 },
        })

        window.onresize = () => {
            const { width, height } = document.body.getBoundingClientRect();

            this.setState({
                property: { ...this.state.property, size: { width: width * 0.2, height: height * 0.88 }, position: { x: 0, y: 0 } },
                map: { ...this.state.map, size: { width: width * 0.6, height: height * 0.88 }, position: { x: width * 0.2, y: 0 } },
                layer: { ...this.state.layer, size: { width: width * 0.2, height: height * 0.32 }, position: { x: width * 0.8, y: 0 } },
                tileset: { ...this.state.tileset, size: { width: width * 0.2, height: height * 0.56 }, position: { x: width * 0.8, y: height * 0.32 } },
            })
        }
    }

    render = () => {

        const { propertyOpen, layerOpen, tilesetOpen } = this.state
        const { history } = this.props
        const { key } = this.props.match.params
        return (
            <Query query={QueryList.GET_PROJECT} variables={{ id: key }}>
                {(res) => {
                    if (res.loading) return 'loading'
                    if (res.error) return 'error'
                    this.props.formatProjectPack(res.data.project)
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
                }}
            </Query>


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
    formatProjectPack: (project) => dispatch(handler.formatProjectPack(project)),
})

export default connect(mapStateToProps, mapDispatchToProps)(WorkScreen)
