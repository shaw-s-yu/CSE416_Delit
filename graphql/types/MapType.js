const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLNonNull, 
        GraphQLInt,
        GraphQLBoolean,
        GraphQLList, } = require('graphql');


        // const Layers = new GraphQLObjectType({
        //     name: "layers",
        //     fields:{
        //         data: {
        //             type: new GraphQLList(GraphQLInt)
        //         },
        //         width: {
        //             type: new GraphQLNonNull(GraphQLInt)
        //         },
        //         height: {
        //             type: new GraphQLNonNull(GraphQLInt)
        //         },
        //         id: {
        //             type: GraphQLInt
        //         },
        //         name: {
        //             type: GraphQLString
        //         },
        //         opacity: {
        //             type: new GraphQLNonNull(GraphQLInt)
        //         },
        //         type: {
        //             type: GraphQLString
        //         },
        //         visible: {
        //             type: GraphQLBoolean
        //         },
        //         x: {
        //             type: new GraphQLNonNull(GraphQLInt)
        //         },
        //         y: {
        //             type: new GraphQLNonNull(GraphQLInt)
        //         }
        //     }
        // })

// const Tilesets = new GraphQLObjectType({
//     name: "tilesets",
//     fields: {
//         columns: {
//             type: new GraphQLNonNull(GraphQLInt)
//         },
//         firstgid: {
//             type: new GraphQLNonNull(GraphQLInt)
//         },
//         image: {
//             type: new GraphQLNonNull(GraphQLString)
//         },
//         imageWidth: {
//             type: new GraphQLNonNull(GraphQLInt)
//         },
//         height: {
//             type: new GraphQLNonNull(GraphQLInt)
//         },
//         margin: {
//             type: new GraphQLNonNull(GraphQLInt)
//         },
//         name: {
//             type: new GraphQLNonNull(GraphQLString)
//         },
//         spacing: {
//             type: new GraphQLNonNull(GraphQLInt)
//         },
//         tilecount: {
//             type: new GraphQLNonNull(GraphQLInt)
//         },
//         tileheight: {
//             type: new GraphQLNonNull(GraphQLInt)
//         },
//         tilewidth: {
//             type: new GraphQLNonNull(GraphQLInt)
//         }
//     }
// })

const MapJsonFile = new GraphQLObjectType({
    name: "mapJsonFile",
    fields: {
        width: {
            type: GraphQLInt
        },
        height: {
            type: GraphQLInt
        },
        infinite: {
            type: GraphQLBoolean
        },
        nextLayerid: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        nextObjectid: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        orientation: {
            type: new GraphQLNonNull(GraphQLString)
        },
        renderorder: {
            type: new GraphQLNonNull(GraphQLString)
        },
        tiledversion: {
            type: new GraphQLNonNull(GraphQLString)
        },
        tilewidth: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        tilesheight: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        type: {
            type: new GraphQLNonNull(GraphQLString)
        },
        version: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        layers: {
            type: new GraphQLNonNull(GraphQLString)
        },

        tilesets: {
            type: new GraphQLNonNull(GraphQLString)
        },

    }
})

module.exports = new GraphQLObjectType({
    name: 'map',
    fields: () => {
        return {
            _id: {
                type: GraphQLString
            },
            mapJsonFile:{
                type: MapJsonFile
            }
        }
    }
});

// const UserType = require('./UserType')
const LayerType = require('./LayerType')
const TilesetType = require('./TilesetType')
