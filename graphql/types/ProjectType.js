const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLInt } = require('graphql');
const UserModel = require('../../models/mongo-user')
var GraphQLDate = require('graphql-date');

module.exports = new GraphQLObjectType({
    name: 'project',
    fields: () => {
        return {
            _id: {
                type: GraphQLString
            },
            name: {
                type: new GraphQLNonNull(GraphQLString)
            },
            owner: {
                type: new GraphQLNonNull(GraphQLString)
            },
            editors: {
                type: new GraphQLList(GraphQLString)
            },
            imageId: {
                type: new GraphQLNonNull(GraphQLString)
            },
            mapId: {
                type: new GraphQLNonNull(GraphQLString)
            },
            tilesetId: {
                type: new GraphQLList(GraphQLString)
            },
            tilesetFirstgid: {
                type: new GraphQLList(GraphQLInt)
            },
            layerId: {
                type: new GraphQLList(GraphQLString)
            },
            editors: {
                type: new GraphQLList(GraphQLString)
            },
            lastUpdate: {
                type: new GraphQLNonNull(GraphQLDate)
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
            },
        }
    }
});

const UserType = require('./UserType')