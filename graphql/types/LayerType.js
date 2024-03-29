const { GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLInt,
    GraphQLBoolean,
    GraphQLList, } = require('graphql');

module.exports = new GraphQLObjectType({
    name: "layers",
    fields: () => {
        return {
            _id: { 
                type: GraphQLString 
            },
            data: { 
                type: new GraphQLList(GraphQLInt) 
            },
            width: { 
                type: new GraphQLNonNull(GraphQLInt) 
            },
            height: {
                type: new GraphQLNonNull(GraphQLInt) 
            },
            name: { 
                type: new GraphQLNonNull(GraphQLString) 
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
                type: GraphQLInt
            },
            y: {
                type: GraphQLInt
            },


        }
    }
})