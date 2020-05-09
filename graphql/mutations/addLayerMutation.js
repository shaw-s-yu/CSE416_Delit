const LayerModel = require('../../models/mongo-layer')
const {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean
} = require('graphql');

const LayerType = require('../types/LayerType')
const mongoose = require('mongoose');


module.exports = {
    type: LayerType,
    args: {
        _id: { type: GraphQLString },
        data: { type: new GraphQLList(GraphQLInt) },
        width: { type: new GraphQLNonNull(GraphQLInt) },
        height: { type: new GraphQLNonNull(GraphQLInt) },
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        opacity: { type: GraphQLInt },
        type: { type: GraphQLString },
        visible: { type: GraphQLBoolean },
        x: { type: GraphQLInt },
        y: { type: GraphQLInt }
    },
    resolve: (root, params) => {
        const newLayer = new LayerModel({
            ...params,
            _id: params._id ? params._id : mongoose.Types.ObjectId(),
            id: params.id ? params.id : 1,
            name: params.name ? params.name : 'New Layer',
            opacity: params.opacity ? params.opacity : 1,
            type: params.type ? params.type : 'tilelayer',
            visible: params.visible ? params.visible : true,
            x: params.x ? params.x : 0,
            y: params.y ? params.y : 0
        }).save();
        if (!newLayer) {
            throw new Error('Error');
        }
        return newLayer
    }
}