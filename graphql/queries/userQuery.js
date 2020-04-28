

const UserType = require('../types/UserType')
const UserModel = require('../../models/mongo-user')

const {
    GraphQLString,
} = require('graphql');

module.exports = {
    type: UserType,
    args: { id: { name: '_id', type: GraphQLString } },
    resolve: (parent, args) => {
        const user = UserModel.findById(args.id).exec()
        if (!user) throw new Error('Error')
        return user
    }
}