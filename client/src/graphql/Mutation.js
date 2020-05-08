import gql from "graphql-tag";

export default {
    ADD_PROJECT: gql`
    mutation addProject(
            $name: String!,
            $owner: String!,
            $editors: [String],
            $imageId: String!
        ){
            addProject(
                name: $name,
                owner: $owner,
                editors: $editors
                imageId: $imageId
                ){
                name
                owner
                editors
            }
        }
    `,
    REMOVE_PROJECT: gql`
    mutation removeProject(
            $id: String!
        ){
            removeProject(id: $id){
                name
                owner
                editors
                ownerInfo{
                    username
                }
            }
        }
    `,
    UPDATE_PROJECT: gql`
    mutation updateProject(
            $id: String!,
            $name: String!,
        ){
            updateProject(id: $id, name: $name){
                name
                owner
                editors
                ownerInfo{
                    username
                }
            }
        
        }
    `,

    CLEAR_PROJECTS: gql`
    mutation {
        clearProjects
    }
    `,

    INVITE_2PROJECT: gql`
    mutation invite2Project(
        $id:String!
        $users:[String]!,
    ){
        invite2Project(id: $id, invites:$users){
            name
            owner
            editors
            ownerInfo{
                username
            }
        }
    }
    `,

    DUPLICATE_PROJECT: gql`
    mutation duplicateProject(
        $id:String!
        $name:String!
        $owner:String!
    ){
        duplicateProject(id: $id, name:$name, owner:$owner){
            name
            owner
            editors
            ownerInfo{
                username
            }
        }
    }
    `,

    ADD_TILESET: gql`
    mutation addTileset(
        $name:String!
        $projectName:String
        $owner:String!
        $editors:[String]
        $imageId:String!
        $tileWidth:Int
        $tileHeight:Int
        $width: Int!
        $height:Int!

        $margin:Int
        $spacing:Int
        $tilecount:Int
        $firstgid:Int
        $columns:Int
    ){
        addTileset(
            name:$name
            projectName:$projectName
            owner:$owner
            editors:$editors
            imageId:$imageId
            width:$width
            height:$height
            tileWidth:$tileWidth
            tileHeight:$tileHeight
            margin:$margin
            spacing:$spacing
            tilecount:$tilecount
            firstgid:$firstgid
            columns:$columns
        ){
            imageId
            width
            height
            tileWidth
            tileHeight
            margin
            spacing
            tilecount
            firstgid
            columns
        }
    }`,

    CLEAR_TILESETS: gql`
    mutation {
        clearTilesets
    }
    `,

    REMOVE_TILESET: gql`
    mutation removeTileset(
            $id: String!
        ){
            removeTileset(id: $id){
                name
                owner
                editors
                ownerInfo{
                    username
                }
            }
        }
    `,


    INVITE_2TILESET: gql`
    mutation invite2Tileset(
        $id:String!
        $users:[String]!,
    ){
        invite2Tileset(id: $id, invites:$users){
            name
            owner
            editors
            ownerInfo{
                username
            }
        }
    }
    `,

    UPDATE_TILESET: gql`
    mutation updateTileset(
        $id: String!,
        $name: String!,
    ){
        updateTileset(id: $id, name: $name){
            name
            owner
            editors
            ownerInfo{
                username
            }
        }
    
    }`,

    DUPLICATE_TILESET: gql`
    mutation duplicateTileset(
        $id:String!
        $name:String!
        $owner:String!
    ){
        duplicateTileset(id: $id, name:$name, owner:$owner){
            name
            owner
            editors
            ownerInfo{
                username
            }
        }
    }
    `,


    // ADD_MAP: gql`
    // mutation addMap(
    //         $width: Number!,
    //         $height: Number,
    //         $infinite: Boolean,
    //         $layers: [String],
    //         $nextLayerid: Number,
    //         $nextObjectid: Number,
    //         $orientation: String,
    //         $renderorder: String,
    //         $tiledversion: String,
    //         $tilewidth: Number,
    //         $tilesheight: Number,
    //         $tilesets: [String],
    //         $type: String,
    //         $version: Number
    // ){
    //     addMap(
    //             width: $width,
    //             height: $height,
    //             infinite: $infinite,
    //                 data: $data,
    //                 width: $width,
    //                 height: $height,
    //                 id: $id,
    //                 name: $name,
    //                 opacity: $opacity,
    //                 type: $type,
    //                 visible: $visible,
    //                 x: $x,
    //                 y: $y,
    //             nextLayerid: $nextLayerid,
    //             nextObjectid: $nextObjectid,
    //             orientation: $orientation,
    //             renderorder: $renderorder,
    //             tiledversion: $tiledversion,
    //             tilewidth: $tilewidth,
    //             tilesheight: $tilesheight,
    //                 columns: $columns,
    //                 firstgid: $firstgid,
    //                 imageId: $imageId,
    //                 width: $width,
    //                 height: $height,
    //                 margin: $margin,
    //                 name: $name,
    //                 spacing: $spacing,
    //                 tilecount: $tilecount,
    //                 tileHeight: $tileHeight,
    //                 tileWidth: $tileWidth
    //             type: $type,
    //             version: $version,
    //         ){
    //                 width,
    //                 height,
    //                 infinite,
    //                 layers
    //                     data,
    //                     width,
    //                     height,
    //                     id,
    //                     name,
    //                     opacity,
    //                     type,
    //                     visible,
    //                     x,
    //                     y,
    //             nextLayerid,
    //             nextObjectid,
    //             orientation,
    //             renderorder,
    //             tiledversion,
    //             tilewidth,
    //             tilesheight,
    //                 columns,
    //                 firstgid,
    //                 imageId,
    //                 width,
    //                 height,
    //                 margin,
    //                 name,
    //                 spacing,
    //                 tilecount,
    //                 tileHeight,
    //                 tileWidth
    //             type,
    //             version,
    //     }
    // }
    // `,

    ADD_MAP: gql`
    mutation addMap(
        $id: String,
        $width: Number,
        $height: Number,
        $infinite: Boolean,
        $layers: [String],
        $nextlayerid: Number,
        $nextobjectid: Number,
        $orientation: String,
        $renderorder: String,
        $tiledversion: String,
        $tileheight: Number,
        $tilewidth: Number,
        $tilesets: [String],
        $type: String,
        $version: Number
    ){
        addMap(
            id: $id
            width: $width
            height: $height
            infinite: $infinite
            layers: $layers
            nextlayerid: $nextlayerid
            nextobjectid: $nextobjectid
            orientation: $orientation
            renderorder: $renderorder
            tiledversion: $tiledversion
            tileheight: $tileheight
            tilewidth: $tilewidth
            tilesets: $tilesets
            type: $type
            version: $version
        ){
            id
            width
            height
            infinite
            layers
            nextlayerid
            nextobjectid
            orientation
            renderorder
            tiledversion
            tileheight
            tilewidth
            tilesets
            type
            version
        }
    }`
    ,


    CLEAR_MAPS: gql`
    mutation clearMaps{
        clearMaps
    }
    `,

    ADD_LAYER: gql`
    mutation addLayer(
        $data: [Number],
        $width: Number,
        $height: Number,
        $id: Number,
        $name: String,
        $opacity: Number,
        $type: String,
        $visible: Boolean,
        $x: Number,
        $y: Number,
    ){
        addLayer(
            data: $data
            height: $height
            id: $id
            name: $name
            opacity: $opacity
            type: $type
            visible: $visible
            width: $width
            x: $x
            y: $y
        ){
            data
            height
            id
            name
            opacity
            type
            visible
            width
            x
            y
        }
    }
    `,
    CLEAR_LAYERS: gql`
    mutation clearLayers{
        clearLayers
    }
    `
}