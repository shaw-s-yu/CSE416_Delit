import React from 'react'
import TopNavbar from '../tools/TopNavbar'
import { connect } from 'react-redux';
import './test.css'
import projectJson from './data.json'
import * as handler from '../../store/database/TestScreenHandler'
import { v1 } from 'uuid'
import { Mutation, Query } from 'react-apollo'
import MutationList from '../../graphql/Mutation'
import QueryList from '../../graphql/Query'

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


    handleAddProject = (callback, res) => {
        const { projectsInJson } = this.projectToDisplay
        if (res.data)
            console.log(res.data.addProject)
        projectsInJson.forEach(p => {
            callback({
                variables: {
                    name: p.name,
                    owner: p.owner,
                    editors: p.editors
                }
            })
        })
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

        const { history, maps, tilesets } = this.props
        const { projectsInJson, mapsInJson, tilesetsInJson } = this.projectToDisplay
        return (

            <Query query={QueryList.GET_PROJECTS}>
                {({ loading, error, data }) => {
                    if (data)
                        console.log(data.projects)
                    if (loading) return 'loading'
                    if (error) return 'error'

                    return (
                        <Mutation mutation={MutationList.ADD_PROJECT} onCompleted={() => window.location.reload()}>
                            {(addProject, addProjectRes) => {
                                return (
                                    <Mutation mutation={MutationList.CLEAR_PROJECTS} onCompleted={() => window.location.reload()}>
                                        {(clearProjects, clearProjectsRes) => (
                                            <>
                                                <TopNavbar side={false} view={false} history={history} />
                                                <div className="test-wrapper">
                                                    <div className="test-title">Controll of mongoDB</div>
                                                    <div className="test-btn-box">
                                                        <button className='test-btn' onClick={() => this.handleAddProject(addProject, addProjectRes)}>ADD</button>
                                                        <button className='test-btn' onClick={() => { clearProjects() }}>CLEAR</button>
                                                        <div className="status">
                                                            {(addProjectRes.loading || clearProjectsRes.loading) ? 'loading' :
                                                                addProjectRes.error ? addProjectRes.error.message :
                                                                    clearProjectsRes.error ? clearProjectsRes.error.message :
                                                                        clearProjectsRes.data ? clearProjectsRes.data.clearProjects :
                                                                            'no status'}
                                                        </div>
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
                                                            <div className="test-title">state of mongoDB</div>
                                                            <div>projects</div>
                                                            {data.projects.map(p => <div key={v1()} className="test-context">{JSON.stringify(p)}</div>)}
                                                            <div>maps</div>
                                                            {maps.map(m => <div key={v1()} className="test-context">{JSON.stringify(m)}</div>)}
                                                            <div>tilesets</div>
                                                            {tilesets.map(t => <div key={v1()} className="test-context">{JSON.stringify(t)}</div>)}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        )}

                                    </Mutation>
                                )
                            }}
                        </Mutation>

                    )
                }}
            </Query>



        )
    }


}

const mapStateToProps = (state, ownProps) => {
    const { projects, maps, tilesets } = state.project
    return {
        projects, maps, tilesets,
        socket: state.backend.socket
    }
};

const mapDispatchToProps = (dispatch) => ({
    handleAddProject: (item) => dispatch(handler.projectAddHandler(item)),
    handleAddMap: (item) => dispatch(handler.mapAddHandler(item)),
    handleAddTileset: (item) => dispatch(handler.tilesetAddHandler(item)),
    handleClear: () => dispatch(handler.clearHandler()),
})

export default connect(mapStateToProps, mapDispatchToProps)(TestScreen);;