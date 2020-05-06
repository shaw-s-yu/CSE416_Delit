const MapModel = require('../../models/mongo-map');
const MapType = require('../types/MapType')

const {
    GraphQLList,
} = require('graphql');

module.exports = {
    type: new GraphQLList(MapType),
    resolve: () => {
        const maps = MapModel.find().exec()
        if (!maps) {
            throw new Error('Error')
        }
        return maps
    }
}