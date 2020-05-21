const TilesetModel = require('../../models/mongo-tileset')
const {
    GraphQLNonNull,
    GraphQLList,
    GraphQLString,
    GraphQLInt,
    GraphQLBoolean
} = require('graphql');

const TilesetType = require('../types/TilesetType')
const mongoose = require('mongoose');
const ImageModel = require('../../models/mongo-image')


module.exports = {
    type: TilesetType,
    args: {
        _id: { type: GraphQLString },
        name: { type: new GraphQLNonNull(GraphQLString) },
        owner: { type: new GraphQLNonNull(GraphQLString) },
        editors: { type: new GraphQLList(GraphQLString) },
        imageId: { type: GraphQLString },
        tileWidth: { type: new GraphQLNonNull(GraphQLInt) },
        tileHeight: { type: new GraphQLNonNull(GraphQLInt) },
        width: { type: new GraphQLNonNull(GraphQLInt) },
        height: { type: new GraphQLNonNull(GraphQLInt) },
        columns: { type: GraphQLInt },
        margin: { type: GraphQLInt },
        spacing: { type: GraphQLInt },
        tilecount: { type: GraphQLInt },
        published: { type: GraphQLBoolean }
    },
    resolve: (root, params) => {
        new ImageModel({
        }).save().then(newImage => {
            if (!newImage) throw new Error('create image fail')
            console.log(newImage, params.imageId)
            const newTileset = new TilesetModel({
                ...params,
                imageId: newImage._id,
                _id: params._id ? params._id : mongoose.Types.ObjectId(),
                columns: params.columns ? params.columns : Math.floor(params.width / params.tileWidth),
                margin: params.margin ? params.margin : 0,
                spacing: params.spacing ? params.spacing : 0,
                tilecount: params.tilecount ? params.tilecount : Math.floor(params.width / params.tileHeight) * Math.floor(params.height / params.tileHeight),
                published: params.published ? params.published : false,
            }).save();
            if (!newTileset) {
                throw new Error('Error');
            }
            return newTileset
        })
    }
}

