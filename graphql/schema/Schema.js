const addProjectMutation = require('../mutations/addProjectMutation')
const clearProjectsMutation = require('../mutations/clearProjectsMutation')
const updateProjectMutation = require('../mutations/updateProjectMutation')
const removeProjectMutation = require('../mutations/removeProjectMutation')
const addTilesetMutation = require('../mutations/addTilesetMutation')
const invite2ProjectMutation = require('../mutations/invite2ProjectMutation')
const duplicateProjectMutation = require('../mutations/duplicateProjectMutation')
const emptyQuery = require('../queries/emptyQuery')
const projectQuery = require('../queries/projectsQuery')
const projectsQuery = require('../queries/projectQuery')
const userQuery = require('../queries/userQuery')

const layerQuery = require('../queries/layerQuery')
const layersQuery = require('../queries/layersQuery')

const tilesetQuery = require('../queries/tilesetQuery')
const tilesetsQuery = require('../queries/tilesetsQuery')
const clearTilesetsMutation = require('../mutations/clearTilesetsMutation')
const removeTilesetMutation = require('../mutations/removeTilesetMutation')
const invite2TilesetMutation = require('../mutations/invite2TilesetMutation')
const updateTilesetMutation = require('../mutations/updateTilesetMutation')
const duplicateTilesetMutation = require('../mutations/duplicateTilesetMutation')


const mapQuery = require('../queries/mapQuery')
const mapsQuery = require('../queries/mapsQuery')
const addMapMutation = require('../mutations/addMapMutation')
const clearMapsMutation = require('../mutations/clearMapsMutation')

const addLayerMutation = require('../mutations/addLayerMutation')
const clearLayersMutation = require('../mutations/clearLayersMutation')


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
            tileset: tilesetQuery,
            tilesets: tilesetsQuery,

            map: mapQuery,
            maps: mapsQuery,

            layer: layerQuery,
            layers: layersQuery,
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
            invite2Project: invite2ProjectMutation,
            duplicateProject: duplicateProjectMutation,

            addTileset: addTilesetMutation,
            clearTilesets: clearTilesetsMutation,
            removeTileset: removeTilesetMutation,
            invite2Tileset: invite2TilesetMutation,
            updateTileset: updateTilesetMutation,
            duplicateTileset: duplicateTilesetMutation,

            addMap: addMapMutation,
            clearMaps: clearMapsMutation,

            addLayer: addLayerMutation,
            clearLayer: clearLayersMutation,
        }
    }
});

module.exports = new GraphQLSchema({
    query: queryType,
    mutation: mutation
});