const { GraphQLObjectType, GraphQLString } = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'map',
    fields: () => {
        return {
            _id: {
                type: GraphQLString
            },
            MapJsonFile: {
                type: GraphQLString
            }
        }
    }
});
