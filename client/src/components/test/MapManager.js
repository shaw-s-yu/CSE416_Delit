import React from 'react'
import QueryList from '../../graphql/Query'
import { Mutation, Query } from 'react-apollo'
import { v1 } from 'uuid'
import MutationList from '../../graphql/Mutation'
import { Button } from "react-bootstrap";

class MapManager extends React.Component {

    handleAddMap = (callback) => {
        const { dataToAdd } = this.props
        dataToAdd.forEach(m => {
            callback({
                variables: {
                    id: m._id,
                    width: m.width,
                    height: m.height,
                    infinite: m.infinite,
                    nextlayerid: m.nextlayerid,
                    nextobjectid: m.nextobjectid,
                    orientation: m.orientation,
                    renderorder: m.renderorder,
                    tiledversion: m.tiledversion,
                    tileHeight: m.tileHeight,
                    tileWidth: m.tileWidth,
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
                    if (mapsRes.loading) return 'loading'
                    if (mapsRes.error) return 'error'
                    const { maps } = mapsRes.data
                    const btn_disable = maps.length === 0 ? false : true
                    return (
                        <Mutation mutation={MutationList.ADD_MAP} refetchQueries={[refetch]}>
                            {(addMaps, addProjectRes) => (
                                <Mutation mutation={MutationList.CLEAR_MAPS} refetchQueries={[refetch]}>
                                    {(clearMaps, clearProjectsRes) => (
                                        <div className='test-manager-wrapper'>
                                            maps
                                            <div className="test-btn-box">
                                                <Button className='test-btn' disabled={btn_disable} onClick={() => this.handleAddMap(addMaps)}>ADD</Button>
                                                <Button className='test-btn' onClick={() => this.handleClear(clearMaps)}>CLEAR</Button>
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