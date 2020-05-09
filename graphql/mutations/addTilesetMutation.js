const TilesetModel = require('../../models/mongo-tileset')
const {
    GraphQLNonNull,
    GraphQLList,
    GraphQLString,
    GraphQLInt
} = require('graphql');

const TilesetType = require('../types/TilesetType')
const mongoose = require('mongoose');


module.exports = {
    type: TilesetType,
    args: {
        _id: { type: GraphQLString },
        name: { type: new GraphQLNonNull(GraphQLString) },
        owner: { type: new GraphQLNonNull(GraphQLString) },
        editors: { type: new GraphQLList(GraphQLString) },
        imageId: { type: new GraphQLNonNull(GraphQLString) },
        tileWidth: { type: new GraphQLNonNull(GraphQLInt) },
        tileHeight: { type: new GraphQLNonNull(GraphQLInt) },
        width: { type: new GraphQLNonNull(GraphQLInt) },
        height: { type: new GraphQLNonNull(GraphQLInt) },
        columns: { type: GraphQLInt },
        firstgid: { type: GraphQLInt },
        margin: { type: GraphQLInt },
        spacing: { type: GraphQLInt },
        tilecount: { type: GraphQLInt }
    },
    resolve: (root, params) => {
        const newTileset = new TilesetModel({
            ...params,
            _id: params._id ? params._id : mongoose.Types.ObjectId(),
            columns: params.columns ? params.columns : Math.floor(params.width / params.tileWidth),
            firstgid: params.firstgid ? params.firstgid : 1,
            margin: params.margin ? params.margin : 0,
            spacing: params.spacing ? params.spacing : 0,
            tilecount: params.tilecount ? params.tilecount : Math.floor(params.width / params.tileHeight) * Math.floor(params.height / params.tileHeight)
        }).save();
        if (!newTileset) {
            throw new Error('Error');
        }
        return newTileset
    }
}

