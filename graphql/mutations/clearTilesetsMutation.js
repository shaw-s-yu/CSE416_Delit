const TilesetModel = require('../../models/mongo-tileset')
const {
    GraphQLString,
} = require('graphql');




module.exports = {
    type: GraphQLString,
    resolve: (parent, params) => {
        const res = TilesetModel.deleteMany({}).exec()
        if (res) return 'success'
        else return 'fail'
    }
}