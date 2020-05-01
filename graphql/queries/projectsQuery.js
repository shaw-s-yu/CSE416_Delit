
const ProjectModel = require('../../models/mongo-project');
const ProjectType = require('../types/ProjectType')

const {
    GraphQLList,
} = require('graphql');

module.exports = {
    type: new GraphQLList(ProjectType),
    resolve: () => {
        const projects = ProjectModel.find().exec()
        if (!projects) {
            throw new Error('Error')
        }
        return projects
    }
}