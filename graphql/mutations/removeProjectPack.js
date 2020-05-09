const ProjectModel = require('../../models/mongo-project')
const LayerModel = require('../../models/mongo-layer')
const MapModel = require('../../models/mongo-map')

const {
    GraphQLNonNull,
    GraphQLString,
} = require('graphql');

module.exports = {
    type: GraphQLString,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, params) => {
        ProjectModel.findOneAndDelete(params.id).then(currentProject => {
            if (!currentProject) throw new Error('Error')
            console.log(currentProject)
            for (let i = 0; i < currentProject.layerId.length; i++) {
                const layerToRemove = LayerModel.findByIdAndRemove(currentProject.layerId[i]).exec()
                if (!layerToRemove) throw new Error('remove layer error')
            }

            const mapToRemove = MapModel.findByIdAndRemove(currentProject.mapId).exec()
            if (!mapToRemove) throw new Error('remove map error')

            return 'delete success'
        })
    }
}