

const ProjectModel = require('../../models/mongo-project');
const ProjectType = require('../types/ProjectType')

const {
    GraphQLString,
} = require('graphql');

module.exports = {
    type: ProjectType,
    args: {
        id: {
            name: '_id',
            type: GraphQLString
        },
    },
    resolve: (root, params) => {
        const project = ProjectModel.findById(params.id).exec()
        if (!project) {
            throw new Error('Error')
        }
        return project
    }
}