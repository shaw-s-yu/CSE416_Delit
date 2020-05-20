const ProjectModel = require('../../models/mongo-project')
const MapModel = require('../../models/mongo-map')
const LayerModel = require('../../models/mongo-layer')
const ImageModel = require('../../models/mongo-image')

const {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt
} = require('graphql');

const ProjectType = require('../types/ProjectType')
const mongoose = require('mongoose');

module.exports = {
    type: GraphQLString,
    args: {
        name: {
            type: new GraphQLNonNull(GraphQLString)
        },
        owner: {
            type: new GraphQLNonNull(GraphQLString)
        },
        editors: {
            type: new GraphQLList(GraphQLString)
        },
        imageId: {
            type: new GraphQLNonNull(GraphQLString)
        },
        width: {
            type: new GraphQLNonNull(GraphQLInt)    //map grid number
        },
        height: {
            type: new GraphQLNonNull(GraphQLInt)    //map grid number
        },
        tileWidth: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        tileHeight: {
            type: new GraphQLNonNull(GraphQLInt)
        }
    },
    resolve: (root, params) => {
        let layerId = [], mapId = mongoose.Types.ObjectId(), data = []
        for (let i = 0; i < params.width * params.height; i++)
            data.push(0)
        layerId.push(mongoose.Types.ObjectId())
        new LayerModel({
            _id: layerId[0],
            width: params.width,
            height: params.height,
            data: data,
            name: 'New Layer',
            opacity: 1,
            type: 'tilelayer',
            visible: true,
            id: 1,
            x: 0,
            y: 0
        }).save().then(newLayer => {
            if (!newLayer) throw new Error('create layer fail')
        });

        new MapModel({
            _id: mapId,
            width: params.width,
            height: params.height,
            infinite: false,
            nextlayerid: 2,
            orientation: 'orthogonal',
            renderorder: 'right-down',
            tiledversion: `${new Date().getFullYear()}.${new Date().getMonth()}.${new Date().getDate()}`,
            tileWidth: params.tileWidth,
            tileHeight: params.tileHeight,
            type: 'map',
            version: 1.2
        }).save().then(newMap => {
            if (!newMap) throw new Error('create map fail')
        })

        ImageModel.findOne({ _id: '5eacb076d0ed064dec138c41' }).then(currentImage => {
            if (!currentImage) throw new Error('find image fail')
            new ImageModel({
                data: currentImage.data
            }).save().then(newImage => {
                if (!newImage) throw new Error('create image fail')
                const newProject = new ProjectModel({
                    name: params.name,
                    owner: params.owner,
                    editors: params.editors ? params.editors : [],
                    imageId: newImage._id,
                    tilesetId: [],
                    tilesetFirstgid: [],
                    mapId: mapId,
                    layerId: layerId,
                    customPropertyName: [],
                    customPropertyValue: []
                }).save()
                if (!newProject) throw new Error('create project fail')
                return 'done'
            })
        })
    }
}