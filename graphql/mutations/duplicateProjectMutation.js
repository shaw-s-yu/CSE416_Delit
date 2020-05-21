const ProjectModel = require('../../models/mongo-project');
const MapModel = require('../../models/mongo-map');
const mongoose = require('mongoose');
const {
    GraphQLNonNull,
    GraphQLString,
} = require('graphql');

const ProjectType = require('../types/ProjectType');

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
        ProjectModel.findOne({ _id: params.id }).then(currentProject => {
            if (!currentProject) throw new Error('error');
            else {
                let { editors } = currentProject;
                const index = editors.indexOf(params.owner);
                if (index !== -1) {
                    editors.splice(index, 1)
                }
                // editors.push(currentProject.owner);
                const mapId = mongoose.Types.ObjectId();
                MapModel.findOne({_id: currentProject.mapId}).then(currentMap => {
                    const newMap = new MapModel({
                        _id: mapId,
                        width: currentMap.width,
                        height: currentMap.height,
                        infinite: currentMap.infinite,
                        nextlayerid: currentMap.nextlayerid,
                        nextobjectid: currentMap.nextobjectid,
                        orientation: currentMap.orientation,
                        renderorder: currentMap.renderorder,
                        tiledversion: currentMap.tiledversion,
                        tileWidth: currentMap.tileWidth,
                        tileHeight: currentMap.tileHeight,
                        type: currentMap.type,
                        version: currentMap.version,
                    }).save();
                    if (!newMap) throw new Error('Error');
                });
                const newProject = new ProjectModel({
                    name: params.name,
                    owner: params.owner,
                    editors: currentProject.editors,
                    imageId: currentProject.imageId,
                    mapId: mapId,
                    tilesetId: currentProject.tilesetId,
                    tilesetFirstgid: currentProject.tilesetFirstgid,
                    layerId: currentProject.layerId,
                    customPropertyName: currentProject.customPropertyName,
                    customPropertyValue: currentProject.customPropertyValue,

                }).save();
                if (!newProject) throw new Error('Error');
                return newProject
            }
        })
    }
}