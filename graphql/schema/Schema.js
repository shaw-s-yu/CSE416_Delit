const addProjectMutation = require('../mutations/addProjectMutation')
const clearProjectsMutation = require('../mutations/clearProjectsMutation')
const updateProjectMutation = require('../mutations/updateProjectMutation')
const removeProjectMutation = require('../mutations/removeProjectMutation')
const addTilesetMutation = require('../mutations/addTilesetMutation')
const invite2ProjectMutation = require('../mutations/invite2ProjectMutation')
const emptyQuery = require('../queries/emptyQuery')
const projectQuery = require('../queries/projectsQuery')
const projectsQuery = require('../queries/projectQuery')
const userQuery = require('../queries/userQuery')
const tilesetQuery = require('../queries/tilesetQuery')

const {
    GraphQLSchema,
    GraphQLObjectType,
} = require('graphql');


const queryType = new GraphQLObjectType({
    name: 'Query',
    fields: () => {
        return {
            empty: emptyQuery,
            projects: projectQuery,
            project: projectsQuery,
            user: userQuery,
            tileset: tilesetQuery
        }
    }
});





const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: () => {
        return {
            addProject: addProjectMutation,
            updateProject: updateProjectMutation,
            removeProject: removeProjectMutation,
            clearProjects: clearProjectsMutation,
            addTileset: addTilesetMutation,
            invite2Project: invite2ProjectMutation,
        }
    }
});

module.exports = new GraphQLSchema({
    query: queryType,
    mutation: mutation
});