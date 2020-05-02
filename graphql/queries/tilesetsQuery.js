
const TilesetModel = require('../../models/mongo-tileset');
const TilesetType = require('../types/TilesetType')

const {
    GraphQLList,
} = require('graphql');

module.exports = {
    type: new GraphQLList(TilesetType),
    resolve: () => {
        const tilesets = TilesetModel.find().exec()
        if (!tilesets) {
            throw new Error('Error')
        }
        return tilesets
    }
}