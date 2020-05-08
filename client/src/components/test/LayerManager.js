import React from 'react'
import QueryList from '../../graphql/Query'
import { Mutation, Query } from 'react-apollo'
import { v1 } from 'uuid'
import MutationList from '../../graphql/Mutation'

class LayerManager extends React.Component {

    handleAddLayer = (callback) => {
        const { dataToAdd } = this.props
        dataToAdd.forEach(l => {
            callback({
                variables: {
                    data: l.data,
                    height: l.height,
                    id: l.id,
                    name: l.name,
                    opacity: l.opacity,
                    type: l.type,
                    visible: l.visible,
                    width: l.width,
                    x: l.x,
                    y: l.y
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
                    
                    console.log(layersRes.data)
                    if (layersRes.data)
                        {/* console.log(layersRes.data) */}
                        console.log("3333333333333333333333333")
                    if (layersRes.loading) return 'loading'
                    if (layersRes.error) return 'error'
                    const { layers } = layersRes.data
                    return (
                        <Mutation mutation={MutationList.ADD_LAYER} refetchQueries={[refetch]}>
                            {(addLayers, addProjectRes) => (
                                <Mutation mutation={MutationList.CLEAR_LAYERS} refetchQueries={[refetch]}>
                                    {(clearLayers, clearProjectsRes) => (
                                        <div className='test-manager-wrapper'>
                                            layers
                                            <div className="test-btn-box">
                                                <button className='test-btn' onClick={() => this.handleAddLayer(addLayers)}>ADD</button>
                                                <button className='test-btn' onClick={() => this.handleClear(clearLayers)}>CLEAR</button>
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

export default LayerManager