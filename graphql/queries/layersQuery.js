const LayerModel = require('../../models/mongo-map');
const LayerType = require('../types/LayerType')

const {
    GraphQLList,
} = require('graphql');

module.exports = {
    type: new GraphQLList(LayerType),
    resolve: () => {
        const layers = LayerModel.find().exec()
        if (!layers) {
            throw new Error('Error')
        }
        return layers
    }
}