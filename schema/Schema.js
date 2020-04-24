var GraphQLDate = require('graphql-date');
var ProjectModel = require('../models/mongo-project');

const _ = require('lodash');
const {
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLString,
} = require('graphql');
//dummy data
const colors = [
    {
        name: "red",
        value: "#f00"
    },
    {
        name: "green",
        value: "#0f0"
    },
    {
        name: "blue",
        value: "#00f"
    },
];

const colorType = new GraphQLObjectType({
    name: 'color',
    fields: () => ({
        name:{type:GraphQLString},
        value:{type:GraphQLString},
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        color:{
            type:colorType,
            args:{name:{type:GraphQLNonNull}},
            resolve(parent, args){
                return _.find(colors, {name: args.name});
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
            name: {
                type: GraphQLString
            },
            creator: {
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
                    creator: {
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
                    creator: {
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
                    return projectModel.findByIdAndUpdate(params.id, { name: params.text, creator: params.creator, lastUpdate: new Date() }, function (err) {
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