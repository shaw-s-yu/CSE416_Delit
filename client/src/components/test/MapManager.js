import React from 'react'
import QueryList from '../../graphql/Query'
import { Mutation, Query } from 'react-apollo'
import { v1 } from 'uuid'
import MutationList from '../../graphql/Mutation'

class MapManager extends React.Component {

    handleAddMap = (callback) => {
        const { dataToAdd } = this.props
        dataToAdd.forEach(m => {
            callback({
                variables: {
                    id: m.id,
                    width: m.width,
                    height: m.height,
                    infinite: m.infinite,
                    layers: m.layers,
                    nextlayerid: m.nextlayerid,
                    nextobjectid: m.nextobjectid,
                    orientation: m.orientation,
                    renderorder: m.renderorder,
                    tiledversion: m.tiledversion,
                    tileheight: m.tileheight,
                    tilewidth: m.tilewidth,
                    tilesets: m.tilesets,
                    type: m.type,
                    version: m.version
                }
            })
        })
    }

    handleClear = (callback) => {
        callback()
    }


    render() {
        const refetch = {
            query: QueryList.GET_ALL_MAPS
        }

        return (
            <Query query={QueryList.GET_ALL_MAPS}>
                {(mapsRes) => {
                    console.log(mapsRes.data)

                    if (mapsRes.data)
                        console.log(mapsRes.data)
                        console.log("4444444444444444444444444")
                    if (mapsRes.loading) return 'loading'
                    if (mapsRes.error) return 'error'
                    const { maps } = mapsRes.data
                    return (
                        <Mutation mutation={MutationList.ADD_MAP} refetchQueries={[refetch]}>
                            {(addMaps, addProjectRes) => (
                                <Mutation mutation={MutationList.CLEAR_MAPS} refetchQueries={[refetch]}>
                                    {(clearMaps, clearProjectsRes) => (
                                        <div className='test-manager-wrapper'>
                                            maps
                                            <div className="test-btn-box">
                                                <button className='test-btn' onClick={() => this.handleAddMap(addMaps)}>ADD</button>
                                                <button className='test-btn' onClick={() => this.handleClear(clearMaps)}>CLEAR</button>
                                            </div>
                                            {maps.map(p => <div key={v1()} className="test-context">{JSON.stringify(p)}</div>)}
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

export default MapManager