const LayerModel = require('../../models/mongo-layer')
const {
    GraphQLString,
} = require('graphql');




module.exports = {
    type: GraphQLString,
    resolve: (parent, params) => {
        const res = LayerModel.deleteMany({}).exec()
        if (res) return 'success'
        else return 'fail'
    }
}