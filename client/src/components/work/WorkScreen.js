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
import { compose } from 'redux';
import Transactions from '../controller/JSTPS'
import SaveDialog from './SaveDialog'
import html2canvas from 'html2canvas'

class WorkScreen extends React.Component {

    state = {
        propertyOpen: true,
        layerOpen: true,
        tilesetOpen: true,
        property: { size: { width: 0, height: 0 }, position: { x: 0, y: 0 }, zIndex: 1 },
        map: { size: { width: 0, height: 0 }, position: { x: 0, y: 0 }, zIndex: 2 },
        tileset: { size: { width: 0, height: 0 }, position: { x: 0, y: 0 }, zIndex: 3 },
        layer: { size: { width: 0, height: 0 }, position: { x: 0, y: 0 }, zIndex: 4 },
        saveDialogOpen: false,
        saving: false,
        saveConfirmed: false,
        savemsg: ''
    }

    transactions = new Transactions()

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
                <MapWindow key="map" handleToTop={this.handleToTop} dimension={map} handleOnDragStop={this.handleOnDragStop} handleOnResize={this.handleOnResize} transactions={this.transactions} handleSave={this.handleSaveDialogOpen} handleExport={this.handleExport} />
                <PropertyWindow key="property" open={propertyOpen} handleToTop={this.handleToTop} dimension={property} handleOnDragStop={this.handleOnDragStop} handleOnResize={this.handleOnResize} transactions={this.transactions} />
                <LayerWindow key="layer" open={layerOpen} handleToTop={this.handleToTop} dimension={layer} handleOnDragStop={this.handleOnDragStop} handleOnResize={this.handleOnResize} transactions={this.transactions} />
                <TilesetWindow key="tileset" open={tilesetOpen} dimension={tileset} history={history} handleToTop={this.handleToTop} handleOnDragStop={this.handleOnDragStop} handleOnResize={this.handleOnResize} transactions={this.transactions} />
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

    doTransaction = () => {
        this.transactions.doTransaction()
    };

    undoTransaction = () => {
        this.transactions.undoTransaction()
    };

    handleOnResize = (ref, position, type) => {
        this.setState({
            [type]: {
                ...this.state[type],
                size: {
                    width: parseInt(ref.style.width),
                    height: parseInt(ref.style.height)
                },
                position: {
                    x: parseInt(position.x),
                    y: parseInt(position.y)
                }
            }
        })
    }


    handleFormatMapJson = () => {
        const { layers, map, tilesets } = this.props
        let toReturn = {
            ...map,
            tiledversion: `1.3.2`,
            compressionlevel: -1
        }
        delete toReturn._id
        const layersToReturn = layers.map(e => {
            delete e.locked
            delete e._id
            return e
        })
        toReturn.layers = layersToReturn
        const tilesetsToReturn = tilesets.map(e => {
            return {
                name: e.name,
                columns: e.columns,
                tilewidth: e.tileWidth,
                tileheight: e.tileHeight,
                tilecount: e.tilecount,
                margin: e.margin,
                firstgid: e.firstgid,
                image: `${e.name}.jpeg`,
                imagewidth: e.width,
                imageheight: e.height,
                spacing: e.spacing,
            }
        })
        toReturn.tilesets = tilesetsToReturn
        return toReturn

    }

    handleExport = () => {
        const { project } = this.props
        const data = this.handleFormatMapJson()
        require("downloadjs")(JSON.stringify(data).toLowerCase(), `${project.name}.json`, "text/plain");
    }

    handleSaveDialogOpen = () => {
        this.setState({ saveDialogOpen: true })
    }

    handleSave = () => {
        const { layers, map, tilesets, custom, project } = this.props
        html2canvas(document.getElementById('map-display')).then(canvas => {
            const imgData = canvas.toDataURL('image/jpeg', 1)
            this.setState({ saving: true }, () => {
                this.props.socket.emit('project-save', {
                    layers, map, tilesets, custom, project, imgData
                })
            })

        });
    }



    handleSaveDialogClose = () => {
        this.setState({ saveDialogOpen: false, saving: false, saveConfirmed: false, savemsg: '' })
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

    UNSAFE_componentWillMount() {
        this.props.socket.on('project-save-back', res => {
            const { err, msg } = res
            if (err) {
                this.setState({ savemsg: msg, saving: false })
            } else {
                this.setState({ savemsg: msg, saveConfirmed: true, saving: false })
            }
        })
    }

    render = () => {
        const { propertyOpen, layerOpen, tilesetOpen, saveDialogOpen, saving, savemsg, saveConfirmed } = this.state
        const { history, loaded } = this.props
        const { key } = this.props.match.params
        return (
            <>

                <div onClick={this.handleUnselect}>
                    <TopNavbar site='workspace'
                        handleWindowOpen={this.handleWindowOpen}
                        propertyOpen={propertyOpen}
                        layerOpen={layerOpen}
                        tilesetOpen={tilesetOpen}
                        history={history}
                        handleDoTransaction={this.doTransaction}
                        handleUndoTransaction={this.undoTransaction}
                        handleSave={this.handleSaveDialogOpen}
                        handleExport={this.handleExport}
                    />
                    <div>
                        {
                            <Query query={QueryList.GET_PROJECT} variables={{ id: key }}>
                                {(res) => {
                                    if (res.loading) return 'loading'
                                    if (res.error) return 'error'
                                    if (!loaded) {
                                        this.props.formatProjectPack(res.data.project)
                                    }
                                    return this.getScreen()
                                }}
                            </Query>
                        }
                    </div>
                </div >
                <SaveDialog
                    open={saveDialogOpen}
                    parent={this}
                    saving={saving}
                    savemsg={savemsg}
                    saveConfirmed={saveConfirmed}
                />
            </>


        )
    }

}



const mapStateToProps = (state, ownProps) => {
    const { loaded } = state.project
    return {
        loaded,
        layers: state.layer.layerList,
        map: state.map.map,
        tilesets: state.tileset.tilesets,
        project: state.project,
        socket: state.backend.socket,
        custom: state.property.custom
    }
};

const mapDispatchToProps = (dispatch) => ({
    formatProjectPack: (project) => dispatch(handler.formatProjectPack(project)),
    handleUnselect: () => dispatch(handler.toolbarUnselectHandler()),
})

export default compose(
    connect(mapStateToProps, mapDispatchToProps),
)(WorkScreen);