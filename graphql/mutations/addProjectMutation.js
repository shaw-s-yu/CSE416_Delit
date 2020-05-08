const ProjectModel = require('../../models/mongo-project')
const {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} = require('graphql');

const ProjectType = require('../types/ProjectType')

module.exports = {
    type: ProjectType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        owner: {
            type: new GraphQLNonNull(GraphQLString)
        },
        editors: {
            type: new GraphQLList(GraphQLString)
        },
        imageId: {
            type: new GraphQLNonNull(GraphQLString)
        },
        // mapId: {
        //     type: new GraphQLNonNull(GraphQLString)
        // },
        // lastUpdate: {
        //     type: Date
        // }
    },
    resolve: (root, params) => {
        params.name_lower = params.name.toLowerCase();
        const projectModel = new ProjectModel(params);
        const newProject = projectModel.save();
        if (!newProject) {
            throw new Error('Error');
        }
        return newProject
    }
}