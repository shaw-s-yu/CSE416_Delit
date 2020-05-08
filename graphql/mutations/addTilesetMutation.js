const TilesetModel = require('../../models/mongo-tileset')
const {
    GraphQLNonNull,
    GraphQLList,
    GraphQLString,
    GraphQLInt
} = require('graphql');

const TilesetType = require('../types/TilesetType')

module.exports = {
    type: TilesetType,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        owner: { type: new GraphQLNonNull(GraphQLString) },
        editors: { type: new GraphQLList(GraphQLString) },

        projectName: {
            type: GraphQLString
        },
        columns: {
            type: GraphQLInt
        },
        firstgid: {
            type: GraphQLInt
        },
        image: {
            type: GraphQLString
        },
        imagewidth: {
            type: GraphQLInt
        },
        imageheight: {
            type: GraphQLInt
        },
        margin: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString
        },
        spacing: {
            type: GraphQLInt
        },
        tilecount: {
            type: GraphQLInt
        },
        tileheight: {
            type: GraphQLInt
        },
        tilewidth: {
            type: GraphQLInt
        },
        // image: { type: new GraphQLNonNull(GraphQLString) },
        // imageWidth: { type: new GraphQLNonNull(GraphQLInt) },
        // imageheight: { type: new GraphQLNonNull(GraphQLInt) },
        // tileWidth: { type: new GraphQLNonNull(GraphQLInt) },
        // tileHeight: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: (root, params) => {
        const newTileset = new TilesetModel(params).save()
        if (!newTileset) {
            throw new Error('Error');
        }
        return newTileset
    }
}

