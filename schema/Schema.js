var GraphQLSchema = require('graphql').GraphQLSchema;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLList = require('graphql').GraphQLList;
var GraphQLObjectType = require('graphql').GraphQLObjectType;
var GraphQLNonNull = require('graphql').GraphQLNonNull;
var GraphQLID = require('graphql').GraphQLID;
var GraphQLString = require('graphql').GraphQLString;
var GraphQLInt = require('graphql').GraphQLInt;
var GraphQLDate = require('graphql-date');
var ProjectModel = require('../models/mongo-project');

// const {
//     GraphQLSchema,
//     GraphQLObjectType,
//     GraphQLString,
// } = require('graphql');


const queryObj = new GraphQLObjectType({
    name: 'myFirstQuery',
    description: 'a hello world demo',
    fields: {
        project: {
            name: 'a hello world query',
            description: 'a hello world demo',
            type: GraphQLString,
            resolve(parentValue, args, request) {
                return 'hello world !';
            }
        }
    }
});



var projectType = new GraphQLObjectType({
    name: 'project',
    fields: function () {
        return {
            _id: {
                type: GraphQLString
            },
            projectName: {
                type: GraphQLString
            },
            creater: {
                type: GraphQLString
            },
            lastUpdate: {
                type: GraphQLDate
            }
        }
    }
});



var queryType = new GraphQLObjectType({
    name: 'Query',
    fields: function () {
        return {
            projects: {
                type: new GraphQLList(projectType),
                resolve: function () {
                    const projects = ProjectModel.find().exec()
                    if (!projects) {
                        throw new Error('Error')
                    }
                    return projects
                }
            },
            project: {
                type: projectType,
                args: {
                    id: {
                        name: '_id',
                        type: GraphQLString
                    },
                    creater: {
                        name: 'username',
                        type: GraphQLString
                    }
                },
                resolve: function (root, params) {
                    const projectDetails = projectModel.findById(params.id).exec()
                    if (!projectDetails) {
                        throw new Error('Error')
                    }
                    return projectDetails
                }
            }
        }
    }
});





var mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: function () {
        return {
            addProject: {
                type: projectType,
                args: {
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    creater: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve: function (root, params) {
                    const projectModel = new ProjectModel(params);
                    const newProject = projectModel.save();
                    if (!newProject) {
                        throw new Error('Error');
                    }
                    return newProject
                }
            },
            updateProject: {
                type: projectType,
                args: {
                    id: {
                        name: 'id',
                        type: new GraphQLNonNull(GraphQLString)
                    },
                    name: {
                        type: new GraphQLNonNull(GraphQLString)
                    },
                },
                resolve(root, params) {
                    return projectModel.findByIdAndUpdate(params.id, { name: params.text, creater: params.creater, lastUpdate: new Date() }, function (err) {
                        if (err) return next(err);
                    });
                }
            },
            removeProject: {
                type: projectType,
                args: {
                    id: {
                        type: new GraphQLNonNull(GraphQLString)
                    }
                },
                resolve(root, params) {
                    const remProject = projectModel.findByIdAndRemove(params.id).exec();
                    if (!remProject) {
                        throw new Error('Error')
                    }
                    return remProject;
                }
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: queryType,
    mutation: mutation
});