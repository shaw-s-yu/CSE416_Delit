const TilesetModel = require('../../models/mongo-tileset')
const {
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLString
} = require('graphql');

const TilesetType = require('../types/TilesetType')

module.exports = {
    type: TilesetType,
    args: {
        image: { type: new GraphQLNonNull(GraphQLString) }
    },
    resolve: (root, params) => {
        const newTileset = new TilesetModel(params).save()
        if (!newTileset) {
            throw new Error('Error');
        }
        return newTileset
    }
}

