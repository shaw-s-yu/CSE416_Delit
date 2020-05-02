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


  handleAddProject = (callback1, callback2) => {
    const { projectsInJson, tilesetsInJson } = this.projectToDisplay
    projectsInJson.forEach(p => {
      callback1({
        variables: {
          name: p.name,
          owner: p.owner,
          editors: p.editors,
          imageId: p.imageId
        }
      })
    })
    tilesetsInJson.forEach(t => {
      console.log(t)
      callback2({
        variables: {
          name: t.name,
          imageId: t.imageId,
          owner: t.owner,
          editors: t.editors,
          width: t.width,
          height: t.height,
          tileWidth: t.tileWidth,
          tileHeight: t.tileHeight
        }
      })
    })
  }

  handleClear = (callback1, callback2) => {
    callback1()
    callback2()
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

    const { history, maps } = this.props
    const { projectsInJson, mapsInJson, tilesetsInJson } = this.projectToDisplay
    const refetch1 = {
      query: QueryList.GET_PROJECTS
    }
    const refetch2 = {
      query: QueryList.GET_ALL_TILESETS
    }

    return (

      <Query query={QueryList.GET_ALL_TILESETS}>
        {(tilesetsRes) => {
          if (tilesetsRes.data)
            console.log(tilesetsRes.data)
          if (tilesetsRes.loading) return 'loading'
          if (tilesetsRes.error) return 'error'

          return (

            <Query query={QueryList.GET_PROJECTS}>
              {(projectsRes) => {
                if (projectsRes.data)
                  console.log(projectsRes.data.projects)
                if (projectsRes.loading) return 'loading'
                if (projectsRes.error) return 'error'
                return (
                  <Mutation mutation={MutationList.ADD_TILESET} refetchQueries={[refetch1, refetch2]}>
                    {(addTileset, addTilesetRes) => (
                      <Mutation mutation={MutationList.ADD_PROJECT} refetchQueries={[refetch1, refetch2]}>
                        {(addProject, addProjectRes) => {
                          return (
                            <Mutation mutation={MutationList.CLEAR_TILESETS} refetchQueries={[refetch1, refetch2]}>
                              {(clearTilesets, clearTilesetsRes) => (
                                <Mutation mutation={MutationList.CLEAR_PROJECTS} refetchQueries={[refetch1, refetch2]}>
                                  {(clearProjects, clearProjectsRes) => (
                                    <>
                                      <TopNavbar sidte='test' history={history} />
                                      <div className="test-wrapper">
                                        <div className="test-title">Controll of mongoDB</div>
                                        <div className="test-btn-box">
                                          <button className='test-btn' onClick={() => this.handleAddProject(addProject, addTileset)}>ADD</button>
                                          <button className='test-btn' onClick={() => this.handleClear(clearTilesets, clearProjects)}>CLEAR</button>
                                          <div className="status">
                                            {(addProjectRes.loading || clearProjectsRes.loading || addTilesetRes.loading || clearTilesetsRes.loading) ? 'loading' :
                                              addTilesetRes.error ? addTilesetRes.error.message :
                                                addProjectRes.error ? addProjectRes.error.message :
                                                  clearProjectsRes.error ? clearProjectsRes.error.message :
                                                    clearTilesetsRes.error ? clearTilesetsRes.error.message :
                                                      clearProjectsRes.data ? clearProjectsRes.data.clearProjects :
                                                        clearTilesetsRes.data ? clearTilesetsRes.data.clearTilesets :
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
                                            {projectsRes.data.projects.map(p => <div key={v1()} className="test-context">{JSON.stringify(p)}</div>)}
                                            <div>maps</div>
                                            {maps.map(m => <div key={v1()} className="test-context">{JSON.stringify(m)}</div>)}
                                            <div>tilesets</div>
                                            {tilesetsRes.data.tilesets.map(t => <div key={v1()} className="test-context">{JSON.stringify(t)}</div>)}
                                          </div>
                                        </div>
                                      </div>
                                    </>
                                  )}

                                </Mutation>
                              )}

                            </Mutation>
                          )
                        }}
                      </Mutation>
                    )}
                  </Mutation>

                )
              }}
            </Query>
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