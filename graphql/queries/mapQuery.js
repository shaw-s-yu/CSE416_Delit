

const MapModel = require('../../models/mongo-map');
const MapType = require('../types/MapType')

const {
    GraphQLString,
} = require('graphql');

module.exports = {
    type: MapType,
    args: {
        id: {
            name: '_id',
            type: GraphQLString
        },
    },
    resolve: (root, params) => {
        const map = MapModel.findById(params.id).exec()
        if (!map) {
            throw new Error('Error')
        }
        return map
    }
}