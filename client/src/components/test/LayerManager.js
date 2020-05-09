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
                    _id: m._id,
                    data: m.data,
                    height: m.height,
                    width: m.width,
                    id: m.id,
                    name: m.name,
                    opacity: m.opacity,
                    type: m.type,
                    visible: m.visible,
                    x: m.x,
                    y: m.y
                }
            })
        })
    }

    handleClear = (callback) => {
        callback()
    }


    render() {
        const refetch = {
            query: QueryList.GET_ALL_LAYERS
        }

        return (
            <Query query={QueryList.GET_ALL_LAYERS}>
                {(layersRes) => {
                    if (layersRes.loading) return 'loading'
                    if (layersRes.error) return 'error'
                    const { layers } = layersRes.data
                    const btn_disable = layers.length === 0 ? false : true
                    return (
                        <Mutation mutation={MutationList.ADD_LAYER} refetchQueries={[refetch]}>
                            {(addLayers, addProjectRes) => (
                                <Mutation mutation={MutationList.CLEAR_LAYERS} refetchQueries={[refetch]}>
                                    {(clearLayers, clearProjectsRes) => (
                                        <div className='test-manager-wrapper'>
                                            layers
                                            <div className="test-btn-box">
                                                <Button className='test-btn' disabled={btn_disable} onClick={() => this.handleAddMap(addLayers)}>ADD</Button>
                                                <Button className='test-btn' onClick={() => this.handleClear(clearLayers)}>CLEAR</Button>
                                            </div>
                                            {layers.map(p => <div key={v1()} className="test-context">{JSON.stringify(p)}</div>)}
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