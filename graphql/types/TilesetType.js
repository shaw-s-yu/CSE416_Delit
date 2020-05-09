const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList, GraphQLNonNull } = require('graphql');
const UserType = require('./UserType')
const UserModel = require('../../models/mongo-user')

module.exports = new GraphQLObjectType({
    name: 'tileset',
    fields: () => {
        return {
            _id: {
                type: GraphQLString
            },
            name: {
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
                    let users = [];
                    let user = UserModel.findById(parent.owner);
                    if (!user) throw new Error('Error');
                    else users.push(user);
                    parent.editors.forEach(e => {
                        let user = UserModel.findById(e);
                        if (!user) throw new Error('Error');
                        else users.push(user)
                    });
                    return users
                }
            },

            columns: {
                type: GraphQLInt
            },

            imageId: {
                type: GraphQLString
            },
            width: {
                type: GraphQLInt
            },
            height: {
                type: GraphQLInt
            },
            margin: {
                type: GraphQLInt
            },
            spacing: {
                type: GraphQLInt
            },
            tilecount: {
                type: GraphQLInt
            },
            tileHeight: {
                type: GraphQLInt
            },
            tileWidth: {
                type: GraphQLInt
            }
        }
    }
});
