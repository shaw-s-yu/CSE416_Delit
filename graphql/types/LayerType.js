const { GraphQLObjectType, 
    GraphQLString, 
    GraphQLNonNull, 
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList, } = require('graphql');

module.exports = new GraphQLObjectType({
    name: "layers",
    fields:{
        data: {
            type: new GraphQLList(GraphQLInt)
        },
        width: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        height: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        id: {
            type: GraphQLInt
        },
        name: {
            type: GraphQLString
        },
        opacity: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        type: {
            type: GraphQLString
        },
        visible: {
            type: GraphQLBoolean
        },
        x: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        y: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    }
})