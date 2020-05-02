const TilesetModel = require('../../models/mongo-tileset')
const { GraphQLObjectType, GraphQLString, GraphQLInt } = require('graphql');


module.exports = new GraphQLObjectType({
    name: 'tileset',
    fields: () => {
        return {
            _id: { type: GraphQLString },
            name: { type: GraphQLString },
            owner: { type: GraphQLString },
            imageId: { type: GraphQLString },
            width: { type: GraphQLInt },
            height: { type: GraphQLInt },
            tileWidth: { type: GraphQLInt },
            tileHeight: { type: GraphQLInt },
        }
    }
});

