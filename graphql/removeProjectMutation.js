const ProjectType = require('./schemas/ProjectSchema')
const {
    GraphQLNonNull,
    GraphQLString,
} = require('graphql');

module.exports = {
    type: ProjectType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, params) => {
        const remProject = ProjectModel.findByIdAndRemove(params.id).exec();
        if (!remProject) {
            throw new Error('Error')
        }
        return remProject;
    }
}