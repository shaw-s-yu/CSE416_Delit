import React from 'react'
import './test.css'
import TopNavbar from '../tools/TopNavbar'
import ProjectManager from './ProjectManager'
import TilesetManager from './TilesetManager'
import MapManager from './MapManager'
import projectJson from './data.json'

class TestScreen extends React.Component {


    UNSAFE_componentWillMount() {
        const { projects, maps, tilesets } = projectJson

        this.projectToDisplay = {
            projectsInJson: projects,
            mapsInJson: maps,
            tilesetsInJson: tilesets,
        }
        this.projectToReduer = { projects, maps, tilesets }
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
                    <MapManager />
                </div>
            </>
        )
    }
}

export default TestScreen