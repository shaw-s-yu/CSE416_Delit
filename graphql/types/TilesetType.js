<<<<<<< HEAD
const TilesetModel = require('../../models/mongo-tileset')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} = require('graphql');
const UserType = require('./UserType')
=======
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList } = require('graphql');
const UserModel = require('../../models/mongo-user')
>>>>>>> 7066f1d62c83e71b99ca4c4c3d78c740e03173b8

module.exports = new GraphQLObjectType({
    name: 'tileset',
    fields: () => {
        return {
<<<<<<< HEAD
            _id: {
                type: GraphQLString
            },
            name: {
                type: GraphQLString
            },
            owner: {
                type: GraphQLString,
            },
            imageId: {
                type: GraphQLString
            },
            width: {
                type: GraphQLInt,
            },
            height: {
                type: GraphQLInt,
            },
            tileWidth: {
                type: GraphQLInt,
            },
            tileHeight: {
                type: GraphQLInt,
            },
            editors: {
                type: new GraphQLList(GraphQLString)
            },
            tilesetId:{
                type: new GraphQLList(GraphQLString)
            },
=======
            _id: { type: GraphQLString },
            name: { type: GraphQLString },
            owner: { type: GraphQLString },
            editors: { type: new GraphQLList(GraphQLString) },
            imageId: { type: GraphQLString },
            width: { type: GraphQLInt },
            height: { type: GraphQLInt },
            tileWidth: { type: GraphQLInt },
            tileHeight: { type: GraphQLInt },
>>>>>>> 7066f1d62c83e71b99ca4c4c3d78c740e03173b8
            ownerInfo: {
                type: UserType,
                resolve: (parent, args) => {
                    const user = UserModel.findById(parent.owner);
                    if (!user) throw new Error('Error');
                    return user
                }
            },
<<<<<<< HEAD
=======
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
>>>>>>> 7066f1d62c83e71b99ca4c4c3d78c740e03173b8
        }
    }
});

const UserType = require('./UserType')