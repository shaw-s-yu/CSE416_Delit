const { GraphQLObjectType, GraphQLString } = require('graphql');
const UserModel = require('../models/mongo-user')
const GraphQLDate = require('graphql-date');


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
            creator: {
                type: GraphQLString,
            },
            lastUpdate: {
                type: GraphQLDate
            },
            creatorInfo: {
                type: UserType,
                resolve: (parent, args) => {
                    const user = UserModel.findById(parent.creator).exec()
                    if (!user) throw new Error('Error')
                    return user
                }
            }
        }
    }
});

const UserType = require('./UserSchema')