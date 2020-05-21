const TilesetModel = require('../../models/mongo-tileset');
const {
    GraphQLNonNull,
    GraphQLString,
} = require('graphql');

const TilesetType = require('../types/TilesetType');
const mongoose = require('mongoose');
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
        TilesetModel.findOne({ _id: params.id }).then(currentTileset => {
            if (!currentTileset) throw new Error('error');
            else {
                let { width, height, editors, imageId, tileWidth, 
                    tileHeight, spacing, margin, tilecount, firstgid, columns } = currentTileset;
                const index = editors.indexOf(params.owner);
                if (index !== -1) {
                    editors.splice(index, 1)
                }
                // editors.push(owner);
                const newTileset = new TilesetModel({
                    _id: params._id ? params._id : mongoose.Types.ObjectId(),
                    name: params.name,
                    owner: params.owner,
                    published: false,
                    width, height, imageId, tileWidth, tileHeight, editors,
                    spacing, margin, tilecount, firstgid, columns,
                }).save();
                if (!newTileset) throw new Error('Error');
                return newTileset
            }
        })
    }
}