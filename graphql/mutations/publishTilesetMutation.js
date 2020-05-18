const TilesetModel = require('../../models/mongo-tileset')
const TilesetType = require('../types/TilesetType')
const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLBoolean,
} = require('graphql');




module.exports = {
    type: TilesetType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        published: {
            type: new GraphQLNonNull(GraphQLBoolean)
        },
    },
    resolve: (root, params) => {
        console.log("params.id", params.id);
        return TilesetModel.findByIdAndUpdate(params.id, { published: params.published }, function (err) {
            if (err) return next(err);
        });
    }
}