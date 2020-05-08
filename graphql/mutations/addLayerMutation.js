const LayerModel = require('../../models/mongo-layer')
const {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} = require('graphql');

const LayerType = require('../types/LayerType')

module.exports = {
    type: LayerType,
    args: {
        id: {
            name: '_id',
            type: GraphQLString
        },
    },
    resolve: (root, params) => {
        const newLayerModel = new LayerModel(params);
        const newLayer = newLayerModel.save();
        if (!newLayer) {
            throw new Error('Error');
        }
        return newLayer
    }
}