const TilesetType = require('../types/TilesetType')
const TilesetModel = require('../../models/mongo-tileset')
const {
    GraphQLNonNull,
    GraphQLString,
} = require('graphql');

module.exports = {
    type: TilesetType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, params) => {
        const remTileset = TilesetModel.findByIdAndRemove(params.id).exec();
        if (!remTileset) {
            throw new Error('Error')
        }
        return remTileset;
    }
}