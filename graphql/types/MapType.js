const { GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLFloat } = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'map',
    fields: () => {
        return {
            _id: { type: GraphQLString },
            width: { type: new GraphQLNonNull(GraphQLInt) },
            height: { type: new GraphQLNonNull(GraphQLInt) },
            infinite: { type: GraphQLBoolean },
            nextlayerid: { type: GraphQLInt },
            nextobjectid: { type: GraphQLInt },
            orientation: { type: GraphQLString },
            renderorder: { type: GraphQLString },
            tiledversion: { type: GraphQLString },
            tileHeight: { type: new GraphQLNonNull(GraphQLInt) },
            tileWidth: { type: new GraphQLNonNull(GraphQLInt) },
            type: { type: GraphQLString },
            version: { type: GraphQLFloat }
        }
    }
});
