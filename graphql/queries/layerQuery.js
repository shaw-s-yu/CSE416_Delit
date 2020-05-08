

const LayerModel = require('../../models/mongo-layer');
const LayerType = require('../types/LayerType')

const {
    GraphQLString,
} = require('graphql');

module.exports = {
    type: LayerType,
    args: {
        id: {
            name: '_id',
            type: GraphQLString
        },
    },
    resolve: (root, params) => {
        const layer = LayerModel.findById(params.id).exec()
        if (!layer) {
            throw new Error('Error')
        }
        return layer
    }
}