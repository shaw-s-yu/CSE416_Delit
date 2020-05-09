import React from 'react'
import QueryList from '../../graphql/Query'
import { Mutation, Query } from 'react-apollo'
import { v1 } from 'uuid'
import MutationList from '../../graphql/Mutation'
import { Button } from "react-bootstrap";


class ProjectManager extends React.Component {

    handleAddProject = (callback) => {
        const { dataToAdd } = this.props
        dataToAdd.forEach(p => {
            callback({
                variables: {
                    name: p.name,
                    owner: p.owner,
                    editors: p.editors,
                    imageId: p.imageId,
                    mapId: p.mapId,
                    tilesetId: p.tilesetId,
                    tilesetFirstgid: p.tilesetFirstgid,
                    layerId: p.layerId,
                }
            })
        })
    }

    handleClear = (callback) => {
        callback()
    }


    render() {
        const refetch = {
            query: QueryList.GET_PROJECTS
        }

        return (
            <Query query={QueryList.GET_PROJECTS}>
                {(projectsRes) => {
                    if (projectsRes.loading) return 'loading'
                    if (projectsRes.error) return 'error'
                    const { projects } = projectsRes.data
                    return (
                        <Mutation mutation={MutationList.ADD_PROJECT} refetchQueries={[refetch]}>
                            {(addProjects, addProjectRes) => (
                                <Mutation mutation={MutationList.CLEAR_PROJECTS} refetchQueries={[refetch]}>
                                    {(clearProjects, clearProjectsRes) => (
                                        <div className='test-manager-wrapper'>
                                            projects
                                            <div className="test-btn-box">
                                                <Button className='test-btn' onClick={() => this.handleAddProject(addProjects)}>ADD</Button>
                                                <Button className='test-btn' onClick={() => this.handleClear(clearProjects)}>CLEAR</Button>
                                            </div>

                                            {projects.map(p => <div key={v1()} className="test-context">{JSON.stringify(p)}</div>)}
                                        </div>
                                    )}
                                </Mutation>
                            )}
                        </Mutation>
                    )
                }
                }
            </Query>
        )
    }
}




export default ProjectManager