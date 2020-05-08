import React from 'react'
import QueryList from '../../graphql/Query'
import { Mutation, Query } from 'react-apollo'
import { v1 } from 'uuid'
import MutationList from '../../graphql/Mutation'


class ProjectManager extends React.Component {


    handleAddProject = (callback) => {
        const { dataToAdd } = this.props
        dataToAdd.forEach(p => {
            callback({
                variables: {
                    name: p.name,
                    owner: p.owner,
                    editors: p.editors,
                    imageId: p.imageId
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
                    if (projectsRes.data)
                        console.log(projectsRes.data.projects)
                        console.log("1111111111111111111111111")
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
                                                <button className='test-btn' onClick={() => this.handleAddProject(addProjects)}>ADD</button>
                                                <button className='test-btn' onClick={() => this.handleClear(clearProjects)}>CLEAR</button>
                                            </div>
                                            {
                                                console.log(projects)
                                            }
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