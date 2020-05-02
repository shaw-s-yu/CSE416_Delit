const ProjectType = require('../types/ProjectType')
const ProjectModel = require('../../models/mongo-project')
const {
    GraphQLNonNull,
    GraphQLString,
    GraphQLList
} = require('graphql');




module.exports = {
    type: ProjectType,
    args: {
        id: {
            type: new GraphQLNonNull(GraphQLString)
        },
        invites: {
            type: new GraphQLList(GraphQLString)
        }
    },
    resolve: (root, params) => {
        ProjectModel.findOne({ _id: params.id }).then(currentProject => {
            if (!currentProject) throw new Error('error')
            else {
                let { editors } = currentProject
                editors = editors.concat(params.invites)

                const updatedProject = ProjectModel.findByIdAndUpdate(params.id, { editors }).exec();
                if (!updatedProject) throw new Error('error')
                else
                    return updatedProject
            }
        })
    }
}