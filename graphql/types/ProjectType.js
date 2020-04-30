const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const UserModel = require('../../models/mongo-user')


module.exports = new GraphQLObjectType({
    name: 'project',
    fields: () => {
        return {
            _id: {
                type: GraphQLString
            },
            name: {
                type: GraphQLString
            },
            imageId: {
                type: GraphQLString
            },
            owner: {
                type: GraphQLString,
            },
            editors: {
                type: new GraphQLList(GraphQLString)
            },
            ownerInfo: {
                type: UserType,
                resolve: (parent, args) => {
                    const user = UserModel.findById(parent.owner);
                    if (!user) throw new Error('Error');
                    return user
                }
            },

        }
    }
});

const UserType = require('./UserType')