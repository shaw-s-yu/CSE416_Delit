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

module.exports = {
    type: MapType,
    args: {
        id:{
            type: GraphQLString
        },
        width: {
            type: GraphQLInt
        },
        height: {
            type: GraphQLInt
        },
        infinite: {
            type: GraphQLBoolean
        },
        nextlayerid: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        nextobjectid: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        orientation: {
            type: new GraphQLNonNull(GraphQLString)
        },
        renderorder: {
            type: new GraphQLNonNull(GraphQLString)
        },
        tiledversion: {
            type: new GraphQLNonNull(GraphQLString)
        },
        tilewidth: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        tileheight: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        type: {
            type: new GraphQLNonNull(GraphQLString)
        },
        version: {
            type: new GraphQLNonNull(GraphQLFloat)
        },
        layers: {
            type: new GraphQLList(GraphQLString)
        },

        tilesets: {
            type: new GraphQLList(GraphQLString)
        },
    },
    resolve: (root, params) => {
        const mapModel = new MapModel(params);
        const newMap = mapModel.save();
        if (!newMap) {
            throw new Error('Error');
        }
        return newMap
    }
}