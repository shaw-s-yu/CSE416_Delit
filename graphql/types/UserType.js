const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
const ProjectModel = require('../../models/mongo-project')
const TilesetModel = require('../../models/mongo-tileset')



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
                    searchName: { type: GraphQLString }
                },
                type: new GraphQLList(ProjectType),
                resolve: (parent, args) => {
                    const projects = ProjectModel.find({
                        $and: [
                            { owner: parent._id },
                            { name: { $regex: `.*${args.searchName}.*` } }
                        ],
                        // $orderby:{
                        //     lastUpdate: -1
                        // }
                    }).sort({"lastUpdate": -1}).skip(args.skip).limit(6).exec()
                    if (!projects) throw new Error('Error')
                    return projects
                }
            },
            projectsOwnedAmount: {
                args: { searchName: { type: GraphQLString } },
                type: GraphQLInt,
                resolve: (parent, args) => {
                    const projectsAmount = ProjectModel.find({
                        $and: [
                            { name: { $regex: `.*${args.searchName}.*` } },
                            { owner: parent._id }
                        ]
                    }).countDocuments()
                    if (!projectsAmount) throw new Error('Error')
                    return projectsAmount
                }
            },
            projectsRelated: {
                args: {
                    searchName: { type: GraphQLString },
                    skip: { type: GraphQLInt }
                },
                type: new GraphQLList(ProjectType),
                resolve: (parent, args) => {
                    const projects = ProjectModel.find({
                        $and: [
                            { name: { $regex: `.*${args.searchName}.*` } },
                            {
                                $or: [
                                    { owner: parent._id },
                                    { editors: parent._id }
                                ]
                            }]

                    }).sort({"lastUpdate": -1}).skip(args.skip).limit(6).exec()
                    if (!projects) throw new Error('Error')
                    return projects
                }
            },
            projectsRelatedAmount: {
                args: { searchName: { type: GraphQLString } },
                type: GraphQLInt,
                resolve: (parent, args) => {
                    const projectsAmount = ProjectModel.find({
                        $and: [
                            { name: { $regex: `.*${args.searchName}.*` } },
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
                    searchName: { type: GraphQLString },
                    skip: { type: GraphQLInt }
                },
                type: new GraphQLList(ProjectType),
                resolve: (parent, args) => {
                    const projects = ProjectModel.find({
                        $and: [
                            { editors: parent._id },
                            { name: { $regex: `.*${args.searchName}.*` } }
                        ]
                    }).sort({"lastUpdate": -1}).skip(args.skip).limit(6).exec()
                    if (!projects) throw new Error('Error')
                    return projects
                }
            },
            projectsSharedAmount: {
                args: { searchName: { type: GraphQLString } },
                type: GraphQLInt,
                resolve: (parent, args) => {
                    const projectsAmount = ProjectModel.find({
                        $and: [
                            { editors: parent._id },
                            { name: { $regex: `.*${args.searchName}.*` } }
                        ]
                    }).countDocuments()
                    if (!projectsAmount) throw new Error('Error')
                    return projectsAmount
                }
            },



            //------------------------------------------------------------------------------------------

            tilesets: {
                args: {
                    skip: { type: GraphQLInt },
                    searchName: { type: GraphQLString }
                },
                type: new GraphQLList(TilesetType),
                resolve: (parent, args) => {
                    const tilesets = TilesetModel.find({ name: { $regex: `.*${args.searchName}.*` } }).sort({"lastUpdate": -1}).skip(args.skip).limit(6).exec()
                    if (!tilesets) {
                        throw new Error('Error')
                    }
                    return tilesets
                }
            },
            tilesetsAmount: {
                args: { searchName: { type: GraphQLString } },
                type: GraphQLInt,
                resolve: (parent, args) => {
                    const tilesetsAmount = TilesetModel.find({ name: { $regex: `.*${args.searchName}.*` } }).countDocuments()
                    if (!tilesetsAmount) throw new Error('Error')
                    return tilesetsAmount
                }
            },
            tilesetsOwned: {
                args: {
                    skip: { type: GraphQLInt },
                    searchName: { type: GraphQLString },
                },
                type: new GraphQLList(TilesetType),
                resolve: (parent, args) => {
                    const tilesets = TilesetModel.find({
                        $and: [
                            { owner: parent._id },
                            { name: { $regex: `.*${args.searchName}.*` } }
                        ]
                    }).sort({"lastUpdate": -1}).sort({"lastUpdate": -1}).skip(args.skip).limit(6).exec()
                    if (!tilesets) throw new Error('Error')
                    return tilesets
                }
            },
            tilesetsOwnedAmount: {
                args: { searchName: { type: GraphQLString } },
                type: GraphQLInt,
                resolve: (parent, args) => {
                    const tilesetsAmount = TilesetModel.find({
                        $and: [
                            { name: { $regex: `.*${args.searchName}.*` } },
                            { owner: parent._id }
                        ]
                    }).countDocuments()
                    if (!tilesetsAmount) throw new Error('Error')
                    return tilesetsAmount
                }
            },
            tilesetsRelated: {
                args: {
                    searchName: { type: GraphQLString },
                    skip: { type: GraphQLInt }
                },
                type: new GraphQLList(TilesetType),
                resolve: (parent, args) => {
                    let tilesets = TilesetModel.find({
                        $and: [
                            { name: { $regex: `.*${args.searchName}.*` } },
                            {
                                $or: [
                                    { owner: parent._id },
                                    { editors: parent._id }
                                ]
                            }]

                    }).sort({"lastUpdate": -1}).skip(args.skip).limit(6).exec()
                    if (!tilesets) throw new Error('Error')
                    return tilesets
                }
            },
            tilesetsRelatedAmount: {
                args: { searchName: { type: GraphQLString } },
                type: GraphQLInt,
                resolve: (parent, args) => {
                    let tilesetsAmount = TilesetModel.find({
                        $and: [
                            { name: { $regex: `.*${args.searchName}.*` } },
                            {
                                $or: [
                                    { owner: parent._id },
                                    { editors: parent._id }
                                ]
                            }]
                    }).countDocuments()
                    if (!tilesetsAmount) throw new Error('Error')
                    return tilesetsAmount
                }
            },
            tilesetsShared: {
                args: {
                    searchName: { type: GraphQLString },
                    skip: { type: GraphQLInt }
                },
                type: new GraphQLList(TilesetType),
                resolve: (parent, args) => {
                    let tilesets = TilesetModel.find({
                        $and: [
                            { editors: parent._id },
                            { name: { $regex: `.*${args.searchName}.*` } }
                        ]
                    }).sort({"lastUpdate": -1}).skip(args.skip).limit(6).exec()
                    if (!tilesets) throw new Error('Error')
                    return tilesets
                }
            },
            tilesetsSharedAmount: {
                args: { searchName: { type: GraphQLString } },
                type: GraphQLInt,
                resolve: (parent, args) => {
                    let tilesetsAmount = TilesetModel.find({
                        $and: [
                            { editors: parent._id },
                            { name: { $regex: `.*${args.searchName}.*` } }
                        ]
                    }).countDocuments()
                    if (!tilesetsAmount) throw new Error('Error')
                    return tilesetsAmount
                }
            },
        }
    }
});

const ProjectType = require('./ProjectType')
const TilesetType = require('../types/TilesetType')
