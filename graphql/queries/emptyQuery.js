
const {
    GraphQLString,
} = require('graphql');


module.exports = {
    type: GraphQLString,
    resolve: () => {
        return 'hi, its empty'
    }
}