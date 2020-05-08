const { GraphQLObjectType, 
        GraphQLString, 
        GraphQLNonNull, 
        GraphQLInt,
        GraphQLBoolean,
        GraphQLList,
        GraphQLFloat } = require('graphql');


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
        // id:{
        //     type: GraphQLString
        // },
        width: {
            type: GraphQLInt
        },
        height: {
            type: GraphQLInt
        },
        infinite: {
            type: GraphQLBoolean
        },
        nextlayerid: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        nextobjectid: {
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
        tileheight: {
            type: new GraphQLNonNull(GraphQLInt)
        },
        type: {
            type: new GraphQLNonNull(GraphQLString)
        },
        version: {
            type: new GraphQLNonNull(GraphQLFloat)
        },
        layers: {
            type: new GraphQLList(GraphQLString)
        },

        tilesets: {
            type: new GraphQLList(GraphQLString)
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
            id:{
                type: GraphQLString
            },
            width: {
                type: GraphQLInt
            },
            height: {
                type: GraphQLInt
            },
            infinite: {
                type: GraphQLBoolean
            },
            nextlayerid: {
                type: new GraphQLNonNull(GraphQLInt)
            },
            nextobjectid: {
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
            tileheight: {
                type: new GraphQLNonNull(GraphQLInt)
            },
            type: {
                type: new GraphQLNonNull(GraphQLString)
            },
            version: {
                type: new GraphQLNonNull(GraphQLFloat)
            },
            layers: {
                type: new GraphQLList(GraphQLString)
            },

            tilesets: {
                type: new GraphQLList(GraphQLString)
            },
        }
    }
});

// const UserType = require('./UserType')
// const LayerType = require('./LayerType')
// const TilesetType = require('./TilesetType')
