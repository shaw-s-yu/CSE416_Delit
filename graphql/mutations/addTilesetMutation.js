const TilesetModel = require('../../models/mongo-tileset')
const {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt
} = require('graphql');

const TilesetType = require('../types/TilesetType')

module.exports = {
    type: TilesetType,
    args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        owner: { type: new GraphQLNonNull(GraphQLString) },
        imageId: { type: new GraphQLNonNull(GraphQLString) },
        width: { type: new GraphQLNonNull(GraphQLInt) },
        height: { type: new GraphQLNonNull(GraphQLInt) },
        tileWidth: { type: new GraphQLNonNull(GraphQLInt) },
        tileHeight: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: (root, params) => {
        const newTileset = new TilesetModel(params).save()
        if (!newTileset) {
            throw new Error('Error');
        }
        return newTileset
    }
}

