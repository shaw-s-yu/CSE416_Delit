const TilesetModel = require('../../models/mongo-tileset');
const TilesetType = require('../types/TilesetType')

const {
    GraphQLString,
} = require('graphql');

module.exports = {
    type: TilesetType,
    args: {
        id: {
            name: '_id',
            type: GraphQLString
        }
    },
    resolve: (parent, args) => {
        const tileset = TilesetModel.findById(args.id).exec()
        if (!tileset) {
            throw new Error('Error')
        }
        return tileset
    }
}