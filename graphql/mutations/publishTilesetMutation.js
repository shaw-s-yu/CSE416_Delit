const TilesetModel = require('../../models/mongo-tileset')
const {
    GraphQLNonNull,
    GraphQLString,
} = require('graphql');




module.exports = {
    type: GraphQLString,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
    },
    resolve: (root, params) => {
        TilesetModel.findOne({ _id: params.id }).then(currentTileset => {
            if (!currentTileset) throw new Error('error')
            else {
                currentTileset.published = true
                currentTileset.save().then(publishedTileset => {
                    if (!publishedTileset) throw new Error('error')
                    return 'published'
                })
            }
        })
    }
}