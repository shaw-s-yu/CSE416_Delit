const ProjectModel = require('../../models/mongo-project')
const ProjectType = require('../types/ProjectType')

const {
    GraphQLNonNull,
    GraphQLString,
} = require('graphql');

module.exports = {
    type: ProjectType,
    args: {
        id: {
            name: 'id',
            type: new GraphQLNonNull(GraphQLString)
        },
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
    },
    resolve: (root, params) => {
        return ProjectModel.findByIdAndUpdate(params.id, { name: params.text, creator: params.creator, lastUpdate: new Date() }, function (err) {
            if (err) return next(err);
        });
    }
}