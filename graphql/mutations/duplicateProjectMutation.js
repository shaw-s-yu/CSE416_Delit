const ProjectModel = require('../../models/mongo-project');
const {
    GraphQLNonNull,
    GraphQLString,
} = require('graphql');

const ProjectType = require('../types/ProjectType');

module.exports = {
    type: ProjectType,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        owner: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, params) => {
        ProjectModel.findOne({ _id: params.id }).then(currentProject => {
            if (!currentProject) throw new Error('error');
            else {
                let { editors } = currentProject;
                const index = editors.indexOf(params.owner);
                if (index !== -1) {
                    editors.splice(index, 1)
                }
                editors.push(currentProject.owner);
                const newProject = new ProjectModel({
                    name: params.name,
                    name_lower: params.name.toLowerCase(),
                    owner: params.owner,
                    editors: currentProject.editors,
                    imageId: currentProject.imageId
                }).save();
                if (!newProject) throw new Error('Error');
                return newProject
            }
        })
    }
}