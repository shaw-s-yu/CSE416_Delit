const { GraphQLObjectType, GraphQLString } = require('graphql');

module.exports = new GraphQLObjectType({
    name: 'project',
    fields: () => {
        return {
            _id: {
                type: GraphQLString
            },
            data: {
                type: GraphQLString
            }
        }
    }
});
