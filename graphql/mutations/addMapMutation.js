const MapModel = require('../../models/mongo-project')
const {
    GraphQLList,
    GraphQLNonNull,
    GraphQLString,
} = require('graphql');

const MapType = require('../types/MapType')

module.exports = {
    type: MapType,
    args: {
        id: {
            name: '_id',
            type: GraphQLString
        },
        mapJsonFile: {
            name: 'MapJsonFile',
            type: new GraphQLNonNull(GraphQLString)
        },
    },
    resolve: (root, params) => {
        const mapModel = new MapModel(params);
        const newMap = mapModel.save();
        if (!newMap) {
            throw new Error('Error');
        }
        return newMap
    }
}