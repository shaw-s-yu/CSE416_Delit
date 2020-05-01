const TilesetModel = require('../../models/mongo-tileset')
const { GraphQLObjectType, GraphQLString } = require('graphql');


module.exports = new GraphQLObjectType({
    name: 'tileset',
    fields: () => {
        return {
            _id: { type: GraphQLString },
            imageId: { type: GraphQLString },
        }
    }
});

