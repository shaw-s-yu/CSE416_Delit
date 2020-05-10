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
                    sortBy: { type: GraphQLString },
                    sortOrder: { type: GraphQLInt }
                },
                type: new GraphQLList(ProjectType),
                resolve: (parent, args) => {
                    let projects = null;
                    const { sortBy, skip, sortOrder } = args;
                    projects = ProjectModel.find({
                        $and: [
                            { owner: parent._id },
                            { name: new RegExp('^.*' + args.searchName + '.*$', 'i') }
                        ],
                    }).sort({ [sortBy]: sortOrder }).skip(skip).limit(6).exec();

                    if (!projects) throw new Error('Error');
                    return projects
                }
            },
            projectsOwnedAmount: {
                args: { searchName: { type: GraphQLString } },
                type: GraphQLInt,
                resolve: (parent, args) => {
                    const projectsAmount = ProjectModel.find({
                        $and: [
                            { name: new RegExp('^.*' + args.searchName + '.*$', 'i') },
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
                    sortBy: { type: GraphQLString },
                    sortOrder: { type: GraphQLInt }
                },
                type: new GraphQLList(ProjectType),
                resolve: (parent, args) => {

                    let projects = null;
                    const { sortBy, skip, sortOrder } = args;

                    projects = ProjectModel.find({
                        $and: [
                            { name: new RegExp('^.*' + args.searchName + '.*$', 'i') },
                            {
                                $or: [
                                    { owner: parent._id },
                                    { editors: parent._id }
                                ]
                            }]

                    }).sort({ [sortBy]: sortOrder }).skip(skip).limit(6).exec();

                    if (!projects) throw new Error('Error');
                    return projects
                }
            },
            projectsRelatedAmount: {
                args: { searchName: { type: GraphQLString } },
                type: GraphQLInt,
                resolve: (parent, args) => {
                    const projectsAmount = ProjectModel.find({
                        $and: [
                            { name: new RegExp('^.*' + args.searchName + '.*$', 'i') },
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
                    sortBy: { type: GraphQLString },
                    sortOrder: { type: GraphQLInt }
                },
                type: new GraphQLList(ProjectType),
                resolve: (parent, args) => {
                    let projects = null;
                    const { sortBy, skip, sortOrder } = args;
                    projects = ProjectModel.find({
                        $and: [
                            { name: new RegExp('^.*' + args.searchName + '.*$', 'i') },
                            { editors: parent._id }
                        ]

                    }).sort({ [sortBy]: sortOrder }).skip(skip).limit(6).exec();
                    if (!projects) throw new Error('Error');
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
                            { name: new RegExp('^.*' + args.searchName + '.*$', 'i') }
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
                    sortBy: { type: GraphQLString },
                    sortOrder: { type: GraphQLInt }
                },
                type: new GraphQLList(TilesetType),
                resolve: (parent, args) => {
                    let tilesets = null;
                    const { sortBy, skip, sortOrder } = args;
                    tilesets = TilesetModel.find({
                        $and: [
                            { name: new RegExp('^.*' + args.searchName + '.*$', 'i') },
                            { published: true }
                        ]
                    }).sort({ [sortBy]: sortOrder }).skip(skip).limit(6).exec();
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
                    const tilesetsAmount = TilesetModel.find({
                        name: new RegExp('^.*' + args.searchName + '.*$', 'i')
                    }).countDocuments();
                    if (!tilesetsAmount) throw new Error('Error');
                    return tilesetsAmount
                }
            },
            tilesetsOwned: {
                args: {
                    skip: { type: GraphQLInt },
                    searchName: { type: GraphQLString },
                    sortBy: { type: GraphQLString },
                    sortOrder: { type: GraphQLInt }
                },
                type: new GraphQLList(TilesetType),
                resolve: (parent, args) => {
                    let tilesets = null;
                    const { sortBy, skip, sortOrder } = args;
                    tilesets = TilesetModel.find({
                        $and: [
                            { owner: parent._id },
                            { name: new RegExp('^.*' + args.searchName + '.*$', 'i') }
                        ]
                    }).sort({ [sortBy]: sortOrder }).skip(skip).limit(6).exec();

                    if (!tilesets) throw new Error('Error');
                    return tilesets
                }
            },
            tilesetsOwnedAmount: {
                args: { searchName: { type: GraphQLString } },
                type: GraphQLInt,
                resolve: (parent, args) => {
                    const tilesetsAmount = TilesetModel.find({
                        $and: [
                            { name: new RegExp('^.*' + args.searchName + '.*$', 'i') },
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
                    sortBy: { type: GraphQLString },
                    sortOrder: { type: GraphQLInt }
                },
                type: new GraphQLList(TilesetType),
                resolve: (parent, args) => {
                    let tilesets = null;
                    const { sortBy, skip, sortOrder } = args;
                    tilesets = TilesetModel.find({
                        $and: [
                            { name: new RegExp('^.*' + args.searchName + '.*$', 'i') },
                            {
                                $or: [
                                    { owner: parent._id },
                                    { editors: parent._id }
                                ]
                            }]

                    }).sort({ [sortBy]: sortOrder }).skip(skip).limit(6).exec();

                    if (!tilesets) throw new Error('Error');
                    return tilesets
                }
            },
            tilesetsRelatedAmount: {
                args: { searchName: { type: GraphQLString } },
                type: GraphQLInt,
                resolve: (parent, args) => {
                    let tilesetsAmount = TilesetModel.find({
                        $and: [
                            { name: new RegExp('^.*' + args.searchName + '.*$', 'i') },
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
                    sortBy: { type: GraphQLString },
                    sortOrder: { type: GraphQLInt }
                },
                type: new GraphQLList(TilesetType),
                resolve: (parent, args) => {
                    let tilesets = null;
                    const { sortBy, skip, sortOrder } = args;
                    tilesets = TilesetModel.find({
                        $and: [
                            { editors: parent._id },
                            { name: new RegExp('^.*' + args.searchName + '.*$', 'i') }
                        ]
                    }).sort({ [sortBy]: sortOrder }).skip(skip).limit(6).exec();

                    if (!tilesets) throw new Error('Error');
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
                            { name: new RegExp('^.*' + args.searchName + '.*$', 'i') }
                        ]
                    }).countDocuments();
                    if (!tilesetsAmount) throw new Error('Error');
                    return tilesetsAmount
                }
            },
            tilesetsSelectable: {
                args: {
                    searchName: { type: GraphQLString },
                    skip: { type: GraphQLInt },
                    sortBy: { type: GraphQLString },
                    sortOrder: { type: GraphQLInt }
                },
                type: new GraphQLList(TilesetType),
                resolve: (parent, args) => {
                    const { sortBy, skip, sortOrder } = args;
                    let tilesets = TilesetModel.find({
                        $and: [
                            { name: new RegExp('^.*' + args.searchName + '.*$', 'i') },
                            { $or: [ {editors: parent._id}, { owner: parent._id }, {published: true} ] },
                        ]
                    }).sort({ [sortBy]: sortOrder }).skip(skip).limit(6).exec();

                    if (!tilesets) throw new Error('Error');
                    return tilesets
                }
            },
            tilesetsSelectableAmount: {
                args: { searchName: { type: GraphQLString } },
                type: GraphQLInt,
                resolve: (parent, args) => {
                    let tilesetsAmount = TilesetModel.find({
                        $and: [
                            { name: new RegExp('^.*' + args.searchName + '.*$', 'i') },
                            { $or: [ {editors: parent._id}, { owner: parent._id }, {published: true},  ] },
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
