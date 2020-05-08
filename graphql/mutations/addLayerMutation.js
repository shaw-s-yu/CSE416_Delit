const LayerModel = require('../../models/mongo-layer')
const {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean
} = require('graphql');

const LayerType = require('../types/LayerType')

module.exports = {
    type: LayerType,
    args: {
        id: {
            name: '_id',
            type: GraphQLString
        },
        data: {
            type: new GraphQLList(GraphQLInt)
        },
        width: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        height: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        id: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString
        },
        opacity: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        type: {
            type: GraphQLString
        },
        visible: {
            type: GraphQLBoolean
        },
        x: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        y: {
            type: new GraphQLNonNull(GraphQLInt)
        }
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