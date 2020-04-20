import React from 'react'
import TopNavbar from '../tools/TopNavbar'
import { connect } from 'react-redux';
import './test.css'
import projectJson from './data.json'
import * as handler from '../../store/database/TestScreenHandler'
import { v1 } from 'uuid'

class TestScreen extends React.Component {

    handleAdd = () => {
        const { projects, maps, tilesets } = this.projectToReduer;
        const { handleAddProject, handleAddMap, handleAddTileset } = this.props;
        handleAddProject(projects)
        handleAddMap(maps)
        handleAddTileset(tilesets)
    }

    handleClear = () => {
        this.props.handleClear()
    }


    UNSAFE_componentWillMount() {
        const { projects, maps, tilesets } = projectJson

        this.projectToDisplay = {
            projectsInJson: projects,
            mapsInJson: maps,
            tilesetsInJson: tilesets
        }
        this.projectToReduer = { projects, maps, tilesets }
    }

    render() {

        const { history, projects, maps, tilesets } = this.props
        const { projectsInJson, mapsInJson, tilesetsInJson } = this.projectToDisplay

        return (
            <div>
                <TopNavbar side={false} view={false} history={history} />
                <div className="test-wrapper">
                    <div className="test-title">Controll of projectReducer</div>
                    <div className="test-btn-box">
                        <button className='test-btn' onClick={this.handleAdd}>ADD</button>
                        <button className='test-btn' onClick={this.handleClear}>CLEAR</button>
                    </div>
                    <div className="test-display">
                        <div className="test-display-left">
                            <div className="test-title">Data.json</div>
                            <div>projects</div>
                            {projectsInJson.map(p => <div key={v1()} className="test-context">{JSON.stringify(p)}</div>)}
                            <div>maps</div>
                            {mapsInJson.map(m => <div key={v1()} className="test-context">{JSON.stringify(m)}</div>)}
                            <div>tilesets</div>
                            {tilesetsInJson.map(t => <div key={v1()} className="test-context">{JSON.stringify(t)}</div>)}
                        </div>
                        <div className="test-display-right">
                            <div className="test-title">state of projectReducer</div>
                            <div>projects</div>
                            {projects.map(p => <div key={v1()} className="test-context">{JSON.stringify(p)}</div>)}
                            <div>maps</div>
                            {maps.map(m => <div key={v1()} className="test-context">{JSON.stringify(m)}</div>)}
                            <div>tilesets</div>
                            {tilesets.map(t => <div key={v1()} className="test-context">{JSON.stringify(t)}</div>)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }


}

const mapStateToProps = (state, ownProps) => {
    const { projects, maps, tilesets } = state.project
    return {
        projects, maps, tilesets
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleAddProject: (item) => dispatch(handler.projectAddHandler(item)),
    handleAddMap: (item) => dispatch(handler.mapAddHandler(item)),
    handleAddTileset: (item) => dispatch(handler.tilesetAddHandler(item)),
    handleClear: () => dispatch(handler.clearHandler()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TestScreen);;