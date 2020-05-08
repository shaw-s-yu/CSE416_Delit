const TilesetModel = require('../../models/mongo-tileset')
const {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} = require('graphql');

const TilesetType = require('../types/TilesetType')

module.exports = {
    type: TilesetType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        owner: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, params) => {
        console.log(params.name)
        TilesetModel.findOne({ _id: params.id }).then(currentTileset => {
            if (!currentTileset) throw new Error('error')
            else {
                let { imagewidth, imageheight, editors, image, tilewidth, 
                    tileheight, owner, spacing, margin, tilecount, firstgid } = currentTileset
                const index = editors.indexOf(params.owner)
                if (index !== -1) {
                    editors.splice(index, 1)
                }
                editors.push(owner)
                const newTileset = new TilesetModel({
                    name: params.name,
                    owner: params.owner,
                    imagewidth, imageheight, image, tilewidth, tileheight, editors,
                    spacing, margin, tilecount, firstgid
                }).save()
                if (!newTileset) throw new Error('Error')
                return newTileset
            }
        })
    }
}