const GraphQLDate = require('graphql-date');
const ProjectModel = require('../models/mongo-project');
const UserModel = require('../models/mongo-user')
const UserType = require('./UserSchema')
const ProjectType = require('./ProjectSchema')

const {
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
    GraphQLID,
} = require('graphql');

const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => {
        return {
            projects: {
                type: new GraphQLList(ProjectType),
                resolve: () => {
                    const projects = ProjectModel.find().exec()
                    if (!projects) {
                        throw new Error('Error')
                    }
                    return projects
                }
            },
            project: {
                type: ProjectType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLID
                    },
                },
                resolve: (root, params) => {
                    const project = ProjectModel.findById(params.id).exec()
                    if (!project) {
                        throw new Error('Error')
                    }
                    return project
                }
            },
            user: {
                type: UserType,
                args: { id: { name: '_id', type: GraphQLID } },
                resolve: (parent, args) => {
                    const user = UserModel.findById(args.id).exec()
                    if (!user) throw new Error('Error')
                    return user
                }
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => {
        return {
            addProject: {
                type: ProjectType,
                args: {
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    ownerId: {
                        type: new GraphQLNonNull(GraphQLID)
                    },
                    img: {
                        type: GraphQLString
                    },
                    editors: {
                        type: new GraphQLList(GraphQLString)
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
            },
            updateProject: {
                type: ProjectType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                },
                resolve: (root, params) => {
                    return ProjectModel.findByIdAndUpdate(params.id, { name: params.text, creator: params.creator, lastUpdate: new Date() }, function (err) {
                        if (err) return next(err);
                    });
                }
            },
            removeProject: {
                type: ProjectType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: (root, params) => {
                    const remProject = ProjectModel.findByIdAndRemove(params.id).exec();
                    if (!remProject) {
                        throw new Error('Error')
                    }
                    return remProject;
                }
            },
            clearProjects: {
                type: GraphQLString,
                resolve: (parent, params) => {
                    const res = ProjectModel.deleteMany({}).exec()
                    if (res) return 'success'
                    else return 'fail'
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: queryType,
    mutation: mutation
});