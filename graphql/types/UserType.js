const { GraphQLObjectType, GraphQLString, GraphQLList, GraphQLInt } = require('graphql');
const ProjectModel = require('../../models/mongo-project');
const TilesetModel = require('../../models/mongo-tileset');

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
                    searchName: { type: GraphQLString },
                     sortBt: { type: GraphQLString},
                },
                type: new GraphQLList(ProjectType),
                resolve: (parent, args) => {
                    let projects = null;
                    const { sortBt, skip} = args;
                    const searchName = args.searchName.toLowerCase();
                    if (sortBt === "name") {
                        projects = ProjectModel.find({
                            $and: [
                                {owner: parent._id},
                                {name_lower: {$regex: `.*${searchName}.*`}}
                            ],
                        }).sort({"name_lower": 1}).skip(skip).limit(6).exec();
                    }else if(sortBt === "date") {
                        projects = ProjectModel.find({
                            $and: [
                                {owner: parent._id},
                                {name_lower: {$regex: `.*${searchName}.*`}}
                            ],
                        }).sort({"lastUpdate": -1}).skip(skip).limit(6).exec();
                    }
                    if (!projects) throw new Error('Error');
                    return projects
                }
            },
            projectsOwnedAmount: {
                args: { searchName: { type: GraphQLString } },
                type: GraphQLInt,
                resolve: (parent, args) => {
                    const searchName = args.searchName.toLowerCase();
                    const projectsAmount = ProjectModel.find({
                        $and: [
                            { name_lower: { $regex: `.*${searchName}.*` } },
                            { owner: parent._id }
                        ]
                    }).countDocuments();
                    if (!projectsAmount) throw new Error('Error');
                    return projectsAmount
                }
            },
            projectsRelated: {
                args: {
                    searchName: { type: GraphQLString },
                    skip: { type: GraphQLInt },
                    sortBt: { type: GraphQLString},
                },
                type: new GraphQLList(ProjectType),
                resolve: (parent, args) => {
                    let projects = null;
                    const { sortBt, skip} = args;
                    const searchName = args.searchName.toLowerCase();
                    if (sortBt === "name") {
                        projects = ProjectModel.find({
                            $and: [
                                {name_lower: {$regex: `.*${searchName}.*`}},
                                {
                                    $or: [
                                        {owner: parent._id},
                                        {editors: parent._id}
                                    ]
                                }]

                        }).sort({"name_lower": 1}).skip(skip).limit(6).exec();
                    } else if (sortBt === "date") {
                        projects = ProjectModel.find({
                            $and: [
                                {name_lower: {$regex: `.*${searchName}.*`}},
                                {
                                    $or: [
                                        {owner: parent._id},
                                        {editors: parent._id}
                                    ]
                                }]

                        }).sort({"lastUpdate": -1}).skip(skip).limit(6).exec();
                    }
                    if (!projects) throw new Error('Error');
                    return projects
                }
            },
            projectsRelatedAmount: {
                args: { searchName: { type: GraphQLString } },
                type: GraphQLInt,
                resolve: (parent, args) => {
                    const searchName = args.searchName.toLowerCase();
                    const projectsAmount = ProjectModel.find({
                        $and: [
                            { name_lower: { $regex: `.*${searchName}.*` } },
                            {
                                $or: [
                                    { owner: parent._id },
                                    { editors: parent._id }
                                ]
                            }]
                    }).countDocuments();
                    if (!projectsAmount) throw new Error('Error');
                    return projectsAmount
                }
            },
            projectsShared: {
                args: {
                    searchName: { type: GraphQLString },
                    skip: { type: GraphQLInt },
                    sortBt: { type: GraphQLString},
                },
                type: new GraphQLList(ProjectType),
                resolve: (parent, args) => {
                    let projects = null;
                    const { sortBt, skip} = args;
                    const searchName = args.searchName.toLowerCase();
                    if (sortBt === "name") {
                        projects = ProjectModel.find({
                            $and: [
                                {editors: parent._id},
                                {name_lower: {$regex: `.*${searchName}.*`}}
                            ]
                        }).sort({"name_lower": 1}).skip(skip).limit(6).exec();
                    } else if (sortBt === "date") {
                        projects = ProjectModel.find({
                            $and: [
                                {editors: parent._id},
                                {name_lower: {$regex: `.*${searchName}.*`}}
                            ]
                        }).sort({"lastUpdate": -1}).skip(skip).limit(6).exec();
                    }
                    if (!projects) throw new Error('Error');
                    return projects
                }
            },
            projectsSharedAmount: {
                args: { searchName: { type: GraphQLString }},
                type: GraphQLInt,
                resolve: (parent, args) => {
                    const searchName = args.searchName.toLowerCase();
                    const projectsAmount = ProjectModel.find({
                        $and: [
                            { editors: parent._id },
                            { name_lower: { $regex: `.*${searchName}.*` }}
                        ]
                    }).countDocuments();
                    if (!projectsAmount) throw new Error('Error');
                    return projectsAmount
                }
            },



            //------------------------------------------------------------------------------------------
            tilesets: {
                args: {
                    skip: { type: GraphQLInt },
                    searchName: { type: GraphQLString },
                    sortBt: { type: GraphQLString},
                },
                type: new GraphQLList(TilesetType),
                resolve: (parent, args) => {
                    let tilesets = null;
                    const { sortBt, skip} = args;
                    const searchName = args.searchName.toLowerCase();
                    if (sortBt === "name") {
                        tilesets = TilesetModel.find({name_lower: {$regex: `.*${searchName}.*`}}).sort({"name_lower": 1}).skip(skip).limit(6).exec();
                    } else if (sortBt === "date") {
                        tilesets = TilesetModel.find({name_lower: {$regex: `.*${searchName}.*`}}).sort({"lastUpdate": -1}).skip(skip).limit(6).exec();
                    }
                    if (!tilesets) {
                        throw new Error('Error');
                    }
                    return tilesets;
                }
            },
            tilesetsAmount: {
                args: { searchName: { type: GraphQLString } },
                type: GraphQLInt,
                resolve: (parent, args) => {
                    const searchName = args.searchName.toLowerCase();
                    const tilesetsAmount = TilesetModel.find({ name_lower: { $regex: `.*${searchName}.*` } }).countDocuments();
                    if (!tilesetsAmount) throw new Error('Error');
                    return tilesetsAmount
                }
            },
            tilesetsOwned: {
                args: {
                    skip: { type: GraphQLInt },
                    searchName: { type: GraphQLString },
                    sortBt: { type: GraphQLString},
                },
                type: new GraphQLList(TilesetType),
                resolve: (parent, args) => {
                    let tilesets = null;
                    const { sortBt, skip} = args;
                    const searchName = args.searchName.toLowerCase();
                    if (sortBt === "name") {
                        tilesets = TilesetModel.find({
                            $and: [
                                {owner: parent._id},
                                {name_lower: {$regex: `.*${searchName}.*`}}
                            ]
                        }).sort({"lastUpdate": -1}).sort({"name_lower": 1}).skip(skip).limit(6).exec();
                    } else if (sortBt === "date") {
                        tilesets = TilesetModel.find({
                            $and: [
                                {owner: parent._id},
                                {name_lower: {$regex: `.*${searchName}.*`}}
                            ]
                        }).sort({"lastUpdate": -1}).sort({"lastUpdate": -1}).skip(skip).limit(6).exec();
                    }
                    if (!tilesets) throw new Error('Error');
                    return tilesets
                }
            },
            tilesetsOwnedAmount: {
                args: { searchName: { type: GraphQLString } },
                type: GraphQLInt,
                resolve: (parent, args) => {
                    const searchName = args.searchName.toLowerCase();
                    const tilesetsAmount = TilesetModel.find({
                        $and: [
                            { name_lower: { $regex: `.*${searchName}.*` } },
                            { owner: parent._id }
                        ]
                    }).countDocuments();
                    if (!tilesetsAmount) throw new Error('Error');
                    return tilesetsAmount
                }
            },
            tilesetsRelated: {
                args: {
                    searchName: { type: GraphQLString },
                    skip: { type: GraphQLInt },
                    sortBt: { type: GraphQLString},
                },
                type: new GraphQLList(TilesetType),
                resolve: (parent, args) => {
                    let tilesets = null;
                    const { sortBt, skip} = args;
                    const searchName = args.searchName.toLowerCase();
                    if (sortBt === "name") {
                        tilesets = TilesetModel.find({
                            $and: [
                                {name_lower: {$regex: `.*${searchName}.*`}},
                                {
                                    $or: [
                                        {owner: parent._id},
                                        {editors: parent._id}
                                    ]
                                }]

                        }).sort({"name-lower": 1}).skip(skip).limit(6).exec();
                    } else if (sortBt === "date") {
                        tilesets = TilesetModel.find({
                            $and: [
                                {name_lower: {$regex: `.*${searchName}.*`}},
                                {
                                    $or: [
                                        {owner: parent._id},
                                        {editors: parent._id}
                                    ]
                                }]

                        }).sort({"lastUpdate": -1}).skip(skip).limit(6).exec();
                    }
                    if (!tilesets) throw new Error('Error');
                    return tilesets
                }
            },
            tilesetsRelatedAmount: {
                args: { searchName: { type: GraphQLString } },
                type: GraphQLInt,
                resolve: (parent, args) => {
                    const searchName = args.searchName.toLowerCase();
                    let tilesetsAmount = TilesetModel.find({
                        $and: [
                            { name_lower: { $regex: `.*${searchName}.*` } },
                            {
                                $or: [
                                    { owner: parent._id },
                                    { editors: parent._id }
                                ]
                            }]
                    }).countDocuments();
                    if (!tilesetsAmount) throw new Error('Error');
                    return tilesetsAmount
                }
            },
            tilesetsShared: {
                args: {
                    searchName: { type: GraphQLString },
                    skip: { type: GraphQLInt },
                    sortBt: { type: GraphQLString},
                },
                type: new GraphQLList(TilesetType),
                resolve: (parent, args) => {
                    let tilesets = null;
                    const { sortBt, skip} = args;
                    const searchName = args.searchName.toLowerCase();
                    if (sortBt === "name") {
                        tilesets = TilesetModel.find({
                            $and: [
                                {editors: parent._id},
                                {name_lower: {$regex: `.*${searchName}.*`}}
                            ]
                        }).sort({"name_lower": 1}).skip(skip).limit(6).exec();
                    } else if (sortBt === "date") {
                        tilesets = TilesetModel.find({
                            $and: [
                                {editors: parent._id},
                                {name_lower: {$regex: `.*${searchName}.*`}}
                            ]
                        }).sort({"lastUpdate": -1}).skip(skip).limit(6).exec();
                    }
                    if (!tilesets) throw new Error('Error');
                    return tilesets
                }
            },
            tilesetsSharedAmount: {
                args: { searchName: { type: GraphQLString } },
                type: GraphQLInt,
                resolve: (parent, args) => {
                    const searchName = args.searchName.toLowerCase();
                    let tilesetsAmount = TilesetModel.find({
                        $and: [
                            { editors: parent._id },
                            { name_lower: { $regex: `.*${searchName}.*` } }
                        ]
                    }).countDocuments();
                    if (!tilesetsAmount) throw new Error('Error');
                    return tilesetsAmount
                }
            },
        }
    }
});

const ProjectType = require('./ProjectType');
const TilesetType = require('../types/TilesetType');
