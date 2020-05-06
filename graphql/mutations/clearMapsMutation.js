const MapModel = require('../../models/mongo-map')
const {
    GraphQLString,
} = require('graphql');




module.exports = {
    type: GraphQLString,
    resolve: (parent, params) => {
        const res = MapModel.deleteMany({}).exec()
        if (res) return 'success'
        else return 'fail'
    }
}