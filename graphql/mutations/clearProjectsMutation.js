const ProjectModel = require('../../models/mongo-project')
const {
    GraphQLString,
} = require('graphql');




module.exports = {
    type: GraphQLString,
    resolve: (parent, params) => {
        const res = ProjectModel.deleteMany({}).exec()
        if (res) return 'success'
        else return 'fail'
    }
}