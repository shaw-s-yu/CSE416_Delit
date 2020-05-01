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
                    skip: { type: GraphQLInt },
                    projectName: { type: GraphQLString }
                },
                type: new GraphQLList(ProjectType),
                resolve: (parent, args) => {
                    const projects = ProjectModel.find({
                        $and: [
                            { owner: parent._id },
                            { name: { $regex: `.*${args.projectName}.*` } }
                        ]
                    }).skip(args.skip).limit(6).exec()
                    if (!projects) throw new Error('Error')
                    return projects
                }
            },
            projectsOwnedAmount: {
                args: { projectName: { type: GraphQLString } },
                type: GraphQLInt,
                resolve: (parent, args) => {
                    const projectsAmount = ProjectModel.find({
                        $and: [
                            { name: { $regex: `.*${args.projectName}.*` } },
                            { owner: parent._id }
                        ]
                    }).countDocuments()
                    if (!projectsAmount) throw new Error('Error')
                    return projectsAmount
                }
            },
            projectsRelated: {
                args: {
                    projectName: { type: GraphQLString },
                    skip: { type: GraphQLInt }
                },
                type: new GraphQLList(ProjectType),
                resolve: (parent, args) => {
                    let projects = ProjectModel.find({
                        $and: [
                            { name: { $regex: `.*${args.projectName}.*` } },
                            {
                                $or: [
                                    { owner: parent._id },
                                    { editors: parent._id }
                                ]
                            }]

                    }).skip(args.skip).limit(6).exec()
                    if (!projects) throw new Error('Error')
                    return projects
                }
            },
            projectsRelatedAmount: {
                args: { projectName: { type: GraphQLString } },
                type: GraphQLInt,
                resolve: (parent, args) => {
                    let projectsAmount = ProjectModel.find({
                        $and: [
                            { name: { $regex: `.*${args.projectName}.*` } },
                            {
                                $or: [
                                    { owner: parent._id },
                                    { editors: parent._id }
                                ]
                            }]
                    }).countDocuments()
                    if (!projectsAmount) throw new Error('Error')
                    return projectsAmount
                }
            },
            projectsShared: {
                args: {
                    projectName: { type: GraphQLString },
                    skip: { type: GraphQLInt }
                },
                type: new GraphQLList(ProjectType),
                resolve: (parent, args) => {
                    let projects = ProjectModel.find({
                        $and: [
                            { editors: parent._id },
                            { name: { $regex: `.*${args.projectName}.*` } }
                        ]
                    }).skip(args.skip).limit(6).exec()
                    if (!projects) throw new Error('Error')
                    return projects
                }
            },
            projectsSharedAmount: {
                args: { projectName: { type: GraphQLString } },
                type: GraphQLInt,
                resolve: (parent, args) => {
                    let projectsAmount = ProjectModel.find({
                        $and: [
                            { editors: parent._id },
                            { name: { $regex: `.*${args.projectName}.*` } }
                        ]
                    }).countDocuments()
                    if (!projectsAmount) throw new Error('Error')
                    return projectsAmount
                }
            }
        }
    }
});

const ProjectType = require('./ProjectType')