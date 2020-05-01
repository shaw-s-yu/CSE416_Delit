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
            teamInfo: {
                type: new GraphQLList(UserType),
                resolve: (parent, args) => {
                    let users = []
                    let user = UserModel.findById(parent.owner);
                    if (!user) throw new Error('Error')
                    else users.push(user)
                    parent.editors.forEach(e => {
                        let user = UserModel.findById(e)
                        if (!user) throw new Error('Error')
                        else users.push(user)
                    })
                    return users
                }
            }

        }
    }
});

const UserType = require('./UserType')