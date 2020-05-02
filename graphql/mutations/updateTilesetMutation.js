const TilesetModel = require('../../models/mongo-tileset')
const TilesetType = require('../types/TilesetType')

const {
    GraphQLNonNull,
    GraphQLString,
} = require('graphql');

module.exports = {
    type: TilesetType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
    },
    resolve: (root, params) => {
        return TilesetModel.findByIdAndUpdate(params.id, { name: params.name }, function (err) {
            if (err) return next(err);
        });
    }
}