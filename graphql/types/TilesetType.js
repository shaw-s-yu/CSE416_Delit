const TilesetModel = require('../../models/mongo-tileset')
const { GraphQLObjectType, GraphQLString, GraphQLInt, GraphQLList} = require('graphql');
const UserType = require('./UserType')

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

