
const ImageModel = require('../../models/mongo-image');
const ImageType = require('../types/ImageType')

const {
    GraphQLString,
} = require('graphql');

module.exports = {
    type: ImageType,
    args: {
        id: {
            name: '_id',
            type: GraphQLString
        },
    },
    resolve: (root, params) => {
        const image = ImageModel.findById(params.id).exec()
        if (!image) {
            throw new Error('Error')
        }
        return image
    }
}