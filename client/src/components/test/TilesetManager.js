import React from 'react'
import QueryList from '../../graphql/Query'
import { Mutation, Query } from 'react-apollo'
import { v1 } from 'uuid'
import MutationList from '../../graphql/Mutation'
import { Button } from "react-bootstrap";

class TilesetManager extends React.Component {

    handleAddProject = (callback) => {
        const { dataToAdd } = this.props
        dataToAdd.forEach(t => {
            callback({
                variables: {
                    id: t._id,
                    name: t.name,
                    owner: t.owner,
                    editors: t.editors,
                    imageId: t.imageId,
                    tileWidth: t.tileWidth,
                    tileHeight: t.tileHeight,
                    width: t.width,
                    height: t.height,

                    columns: t.columns,
                    margin: t.margin,
                    spacing: t.spacing,
                    tilecount: t.tilecount,
                    published: t.published
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
                    if (tilesetsRes.loading) return 'loading'
                    if (tilesetsRes.error) return 'error'
                    const { tilesets } = tilesetsRes.data
                    const btn_disable = tilesets.length === 0 ? false : true
                    return (
                        <Mutation mutation={MutationList.ADD_TILESET} refetchQueries={[refetch]}>
                            {(addTilesets, addProjectRes) => (
                                <Mutation mutation={MutationList.CLEAR_TILESETS} refetchQueries={[refetch]}>
                                    {(clearTilesets, clearProjectsRes) => (
                                        <div className='test-manager-wrapper'>
                                            tilesets
                                            <div className="test-btn-box">
                                                <Button className='test-btn' disabled={btn_disable} onClick={() => this.handleAddProject(addTilesets)}>Add</Button>
                                                <Button className='test-btn' onClick={() => this.handleClear(clearTilesets)}>CLEAR</Button>
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