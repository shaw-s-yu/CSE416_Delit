const { GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLList, GraphQLInt } = require('graphql');
const UserModel = require('../../models/mongo-user')
const LayerModel = require('../../models/mongo-layer')
const TilesetModel = require('../../models/mongo-tileset')
const MapModel = require('../../models/mongo-map')
var GraphQLDate = require('graphql-date');

module.exports = new GraphQLObjectType({
    name: 'project',
    fields: () => {
        return {
            _id: {
                type: GraphQLString
            },
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
            mapId: {
                type: new GraphQLNonNull(GraphQLString)
            },
            tilesetId: {
                type: new GraphQLList(GraphQLString)
            },
            tilesetFirstgid: {
                type: new GraphQLList(GraphQLInt)
            },
            layerId: {
                type: new GraphQLList(GraphQLString)
            },
            editors: {
                type: new GraphQLList(GraphQLString)
            },
            customPropertyName: {
                type: new GraphQLList(GraphQLString)
            },
            customPropertyValue: {
                type: new GraphQLList(GraphQLString)
            },
            lastUpdate: {
                type: new GraphQLNonNull(GraphQLDate)
            },
            ownerInfo: {
                type: UserType,
                resolve: (parent, args) => {
                    const user = UserModel.findById(parent.owner);
                    if (!user) throw new Error('Error');
                    return user
                }
            },
            teamInfo: {
                type: new GraphQLList(UserType),
                resolve: (parent, args) => {
                    let users = []
                    let user = UserModel.findById(parent.owner);
                    if (!user) throw new Error('Error')
                    else users.push(user)
                    parent.editors.forEach(e => {
                        let user = UserModel.findById(e)
                        if (!user) throw new Error('Error')
                        else users.push(user)
                    })
                    return users
                }
            },
            layersInfo: {
                type: new GraphQLList(LayerType),
                resolve: (parent, args) => {
                    let layers = []
                    parent.layerId.forEach(e => {
                        let layer = LayerModel.findById(e)
                        if (!layer) throw new Error('project get layers failed')
                        else layers.push(layer)
                    })
                    return layers
                }
            },
            tilesetsInfo: {
                type: new GraphQLList(TilesetType),
                resolve: (parent, args) => {
                    let tilesets = []
                    parent.tilesetId.forEach(e => {
                        let tileset = TilesetModel.findById(e)
                        if (!tileset) throw new Error('project get tilesets failed')
                        else tilesets.push(tileset)
                    })
                    return tilesets
                }
            },
            mapInfo: {
                type: MapType,
                resolve: (parent, args) => {
                    let map = MapModel.findById(parent.mapId)
                    if (!map) throw new Error('project get map failed')
                    return map
                }
            },
            getLayer: {
                args: {
                    // id: {
                    //     type: GraphQLString
                    // },
                    searchId: {
                        type: GraphQLString
                    },
                },
                type: LayerType,
                resolve: (parent, args) => {
                    let layer = LayerModel.find({
                        $and: [
                            {
                                id: new RegExp('^.*' + args.searchName + '.*$', 'i')
                            }
                        ]
                    }).exec();

                    if (!layer) throw new Error('cannot find layer')
                    return layer
                }
            }
        }
    }
});

const UserType = require('./UserType')
const LayerType = require('./LayerType')
const TilesetType = require('./TilesetType')
const MapType = require('./MapType')