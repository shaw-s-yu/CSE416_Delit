const { GraphQLObjectType, GraphQLString, GraphQLList } = require('graphql');
const ProjectModel = require('../../models/mongo-project')



module.exports = new GraphQLObjectType({
    name: 'user',
    fields: () => {
        return {
            _id: { type: GraphQLString },
            id: { type: GraphQLString },
            username: { type: GraphQLString },
            picture: { type: GraphQLString },
            provider: { type: GraphQLString },
            projectsOwned: {
                type: new GraphQLList(ProjectType),
                resolve: (parent, args) => {
                    const projects = ProjectModel.find({ owner: parent._id }).exec()
                    if (!projects) throw new Error('Error')
                    return projects
                }
            },
            projectsRelated: {
                type: new GraphQLList(ProjectType),
                resolve: (parent, args) => {
                    let projects = ProjectModel.find({
                        $or: [
                            { owner: parent._id },
                            { editors: parent._id }]
                    }).exec()
                    if (!projects) throw new Error('Error')
                    return projects
                }
            },
            projectsShared: {
                type: new GraphQLList(ProjectType),
                resolve: (parent, args) => {
                    let projects = ProjectModel.find({ editors: parent._id }).exec()
                    if (!projects) throw new Error('Error')
                    return projects
                }
            }
        }
    }
});

const ProjectType = require('./ProjectType')