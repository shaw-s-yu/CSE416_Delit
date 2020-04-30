const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
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
                args: {
                    skip: { type: GraphQLInt }
                },
                type: new GraphQLList(ProjectType),
                resolve: (parent, args) => {
                    const projects = ProjectModel.find({ owner: parent._id }).skip(args.skip).limit(6).exec()
                    if (!projects) throw new Error('Error')
                    return projects
                }
            },
            projectsOwnedAmount: {
                type: GraphQLInt,
                resolve: (parent, args) => {
                    const projectsAmount = ProjectModel.find({ owner: parent._id }).countDocuments()
                    if (!projectsAmount) throw new Error('Error')
                    return projectsAmount
                }
            },
            projectsRelated: {
                args: {
                    skip: { type: GraphQLInt }
                },
                type: new GraphQLList(ProjectType),
                resolve: (parent, args) => {
                    let projects = ProjectModel.find({
                        $or: [
                            { owner: parent._id },
                            { editors: parent._id }]
                    }).skip(args.skip).limit(6).exec()
                    if (!projects) throw new Error('Error')
                    return projects
                }
            },
            projectsRelatedAmount: {
                type: GraphQLInt,
                resolve: (parent, args) => {
                    let projectsAmount = ProjectModel.find({
                        $or: [
                            { owner: parent._id },
                            { editors: parent._id }]
                    }).countDocuments()
                    if (!projectsAmount) throw new Error('Error')
                    return projectsAmount
                }
            },
            projectsShared: {
                args: {
                    skip: { type: GraphQLInt }
                },
                type: new GraphQLList(ProjectType),
                resolve: (parent, args) => {
                    let projects = ProjectModel.find({ editors: parent._id }).skip(args.skip).limit(6).exec()
                    if (!projects) throw new Error('Error')
                    return projects
                }
            },
            projectsSharedAmount: {
                type: GraphQLInt,
                resolve: (parent, args) => {
                    let projectsAmount = ProjectModel.find({ editors: parent._id }).countDocuments()
                    if (!projectsAmount) throw new Error('Error')
                    return projectsAmount
                }
            }
        }
    }
});

const ProjectType = require('./ProjectType')