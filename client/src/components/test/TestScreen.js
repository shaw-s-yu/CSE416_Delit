import React from 'react'
import './test.css'
import TopNavbar from '../tools/TopNavbar'
import ProjectManager from './ProjectManager'
import TilesetManager from './TilesetManager'
import MapManager from './MapManager'
import projectJson from './data.json'
import LayerManager from './LayerManager'

class TestScreen extends React.Component {


    UNSAFE_componentWillMount() {
        const { projects, maps, tilesets, layers } = projectJson

        this.projectToDisplay = {
            projectsInJson: projects,
            mapsInJson: maps,
            tilesetsInJson: tilesets,
            layersInJson: layers,
        }
        this.projectToReduer = { projects, maps, tilesets, layers }
    }


    render() {
        const { history } = this.props
        return (
            <>
                <TopNavbar side='test' history={history} />
                <div className="test-wrapper">
                    <div className="test-title">Controll of mongoDB</div>
                    <ProjectManager dataToAdd={this.projectToReduer.projects} />
                    <TilesetManager dataToAdd={this.projectToReduer.tilesets} />
                    <MapManager dataToAdd={this.projectToReduer.maps} />
                    <LayerManager dataToAdd={this.projectToReduer.layers} />
                </div>
            </>
        )
    }
}

export default TestScreen