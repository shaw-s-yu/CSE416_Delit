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
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        owner: {
            type: new GraphQLNonNull(GraphQLString)
        }
    },
    resolve: (root, params) => {
        console.log(params.name)
        ProjectModel.findOne({ _id: params.id }).then(currentProject => {
            if (!currentProject) throw new Error('error')
            else {
                const newProject = new ProjectModel({
                    name: params.name,
                    owner: params.owner,
                    editors: currentProject.editors,
                    imageId: currentProject.imageId
                }).save()
                if (!newProject) throw new Error('Error')
                return newProject
            }
        })
    }
}