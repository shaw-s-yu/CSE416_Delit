const MapModel = require('../../models/mongo-map')
const {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat
} = require('graphql');

const MapType = require('../types/MapType')
const mongoose = require('mongoose');

module.exports = {
    type: MapType,
    args: {
        _id: { type: GraphQLString },
        width: { type: new GraphQLNonNull(GraphQLInt) },
        height: { type: new GraphQLNonNull(GraphQLInt) },
        infinite: { type: GraphQLBoolean },
        nextlayerid: { type: GraphQLInt },
        nextobjectid: { type: GraphQLInt },
        orientation: { type: GraphQLString },
        renderorder: { type: GraphQLString },
        tiledversion: { type: GraphQLString },
        tileHeight: { type: new GraphQLNonNull(GraphQLInt) },
        tileWidth: { type: new GraphQLNonNull(GraphQLInt) },
        type: { type: GraphQLString },
        version: { type: GraphQLFloat }
    },
    resolve: (root, params) => {
        const newMap = new MapModel({
            ...params,
            _id: params._id ? params._id : mongoose.Types.ObjectId(),
            infinite: params.infinite ? params.infinite : false,
            nextlayerid: params.nextlayerid ? params.nextlayerid : 2,
            nextobjectid: params.nextobjectid ? params.nextobjectid : 1,
            orientation: params.orientation ? params.orientation : 'orthogonal',
            tiledversion: params.tiledversion ? params.tiledversion : `${new Date().getFullYear()}.${new Date().getMonth()}.${new Date().getDate()}`,
            type: params.type ? params.type : 'map',
            version: params.version ? params.version : 1.1

        }).save()
        if (!newMap) {
            throw new Error('Error');
        }
        return newMap
    }
}