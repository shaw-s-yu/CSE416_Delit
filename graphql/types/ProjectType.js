const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLID } = require('graphql');
const UserModel = require('../../models/mongo-user')


module.exports = new GraphQLObjectType({
    name: 'project',
    fields: () => {
        return {
            id: {
                type: GraphQLID
            },
            name: {
                type: GraphQLString
            },
            img: {
                type: GraphQLString
            },
            ownerId: {
                type: GraphQLID,
            },
            editors: {
                type: new GraphQLList(GraphQLString)
            },
            ownerInfo: {
                type: UserType,
                resolve: (parent, args) => {
                    const user = UserModel.findById(parent.ownerId);
                    if (!user) throw new Error('Error');
                    return user
                }
            },

        }
    }
});

const UserType = require('./UserType')