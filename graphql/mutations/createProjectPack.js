const ProjectModel = require('../../models/mongo-project')
const {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt
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
        width: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        height: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        tileWidth: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        tileHeight: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: (root, params) => {
        const projectModel = new ProjectModel(params);
        const newProject = projectModel.save();
        if (!newProject) {
            throw new Error('Error');
        }
        return newProject
    }
}