import React from 'react'
import QueryList from '../../graphql/Query'
import { Mutation, Query } from 'react-apollo'
import { v1 } from 'uuid'
import MutationList from '../../graphql/Mutation'

class TilesetManager extends React.Component {

    handleAddProject = (callback) => {
        const { dataToAdd } = this.props
        dataToAdd.forEach(t => {
            callback({
                variables: {
                    name: t.name,
                    owner: t.owner,
                    editors: t.editors,
                    image: t.image,
                    margin: t.margin,
                    spacing: t.spacing,
                    imagewidth: t.imagewidth,
                    imageheight: t.imageheight,

                    tilewidth: t.tilewidth,
                    tileheight: t.tileheight,
                    tilecount: t.tilecount,
                    projectName: t.projectName,
                    columns: t.columns,
                    firstgid: t.firstgid,
                }
            })
        })
    }

    handleClear = (callback) => {
        callback()
    }


    render() {
        const refetch = {
            query: QueryList.GET_ALL_TILESETS
        }

        return (
            <Query query={QueryList.GET_ALL_TILESETS}>
                {(tilesetsRes) => {
                    if (tilesetsRes.data)
                        console.log(tilesetsRes.data)
                    if (tilesetsRes.loading) return 'loading'
                    if (tilesetsRes.error) return 'error'
                    const { tilesets } = tilesetsRes.data
                    return (
                        <Mutation mutation={MutationList.ADD_TILESET} refetchQueries={[refetch]}>
                            {(addTilesets, addProjectRes) => (
                                <Mutation mutation={MutationList.CLEAR_TILESETS} refetchQueries={[refetch]}>
                                    {(clearTilesets, clearProjectsRes) => (
                                        <div className='test-manager-wrapper'>
                                            tilesets
                                            <div className="test-btn-box">
                                                <button className='test-btn' onClick={() => this.handleAddProject(addTilesets)}>ADD</button>
                                                <button className='test-btn' onClick={() => this.handleClear(clearTilesets)}>CLEAR</button>
                                            </div>
                                            {tilesets.map(p => <div key={v1()} className="test-context">{JSON.stringify(p)}</div>)}
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

export default TilesetManager