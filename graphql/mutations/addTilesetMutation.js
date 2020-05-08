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
        imageId: { type: new GraphQLNonNull(GraphQLString) },
        width: { type: new GraphQLNonNull(GraphQLInt) },
        height: { type: new GraphQLNonNull(GraphQLInt) },
        tileWidth: { type: new GraphQLNonNull(GraphQLInt) },
        tileHeight: { type: new GraphQLNonNull(GraphQLInt) },
    },
    resolve: (root, params) => {
        params.name_lower = params.name.toLowerCase();
        const newTileset = new TilesetModel(params).save();
        if (!newTileset) {
            throw new Error('Error');
        }
        return newTileset
    }
}

