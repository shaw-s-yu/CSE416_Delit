const TilesetType = require('../types/TilesetType')
const TilesetModel = require('../../models/mongo-tileset')
const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLList
} = require('graphql');




module.exports = {
    type: TilesetType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        invites: {
            type: new GraphQLList(GraphQLString)
        }
    },
    resolve: (root, params) => {
        TilesetModel.findOne({ _id: params.id }).then(currentTileset => {
            if (!currentTileset) throw new Error('error')
            else {
                let { editors } = currentTileset
                editors = editors.concat(params.invites)
                const updatedTileset = TilesetModel.findByIdAndUpdate(params.id, { editors }).exec();
                if (!updatedTileset) throw new Error('error')
                else
                    return updatedTileset
            }
        })
    }
}