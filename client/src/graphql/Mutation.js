import gql from "graphql-tag";

export default {
    ADD_PROJECT: gql`
    mutation addProject(
            $name: String!,
            $owner: String!,
            $editors: [String],
            $imageId: String!,
            $mapId:String!,
            $tilesetId:[String],
            $tilesetFirstgid:[Int],
            $layerId:[String]
        ){
            addProject(
                name: $name,
                owner: $owner,
                editors: $editors
                imageId: $imageId
                mapId:$mapId
                tilesetId:$tilesetId
                tilesetFirstgid:$tilesetFirstgid
                layerId:$layerId
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
        $id:String
        $name:String!
        $owner:String!
        $editors:[String]
        $imageId:String!
        $tileWidth:Int!
        $tileHeight:Int!
        $width: Int!
        $height:Int!
        
        $columns:Int
        $margin:Int
        $spacing:Int
        $tilecount:Int
        $published: Boolean
    ){
        addTileset(
            _id:$id
            name:$name
            owner:$owner
            editors:$editors
            imageId:$imageId
            tileWidth:$tileWidth
            tileHeight:$tileHeight
            width:$width
            height:$height
            
            columns:$columns
            margin:$margin
            spacing:$spacing
            tilecount:$tilecount
            published: $published   
        ){
            _id
            name
            owner
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

    ADD_MAP: gql`
    mutation addMap(
        $id: String
        $width: Int!
        $height: Int!
        $infinite: Boolean
        $nextlayerid: Int
        $nextobjectid: Int
        $orientation: String
        $renderorder: String
        $tiledversion: String
        $tileHeight: Int!
        $tileWidth: Int!
        $type: String
        $version: Float
    ){
        addMap(
            _id:$id
            width: $width
            height: $height
            infinite: $infinite
            nextlayerid: $nextlayerid
            nextobjectid: $nextobjectid
            orientation: $orientation
            renderorder: $renderorder
            tiledversion: $tiledversion
            tileHeight: $tileHeight
            tileWidth: $tileWidth
            type: $type
            version: $version
        ){
            _id
            width
            height
            tileWidth
            tileHeight
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
        $_id: String
        $data: [Int]
        $width: Int!
        $height: Int!
        $name: String!,
        $opacity: Int!,
        $type: String,
        $visible: Boolean,
        $x: Int,
        $y: Int,
    ){
        addLayer(
            _id:$_id
            data: $data
            width: $width
            height: $height
            name: $name
            opacity: $opacity
            type: $type
            visible: $visible
            x: $x
            y: $y
        ){
            _id
            data
            height
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
    `,

    CREATE_PROJECT_PACK: gql`
    mutation createProjectPack(
        $name: String!
        $owner: String!
        $editors: [String]
        $imageId: String!
        $width: Int!
        $height: Int!
        $tileWidth: Int!
        $tileHeight: Int!
    ){
        createProjectPack(
            name:$name
            owner:$owner
            editors:$editors
            imageId:$imageId
            width:$width
            height:$height
            tileWidth:$tileWidth
            tileHeight:$tileHeight
        ){
            name
            ownerInfo{
                username
            }
        }
    }
    `,

    REMOVE_PROJECT_PACK: gql`
    mutation removeProjectPack(
        $id:String!
    ){
        removeProjectPack(
            id:$id
        )
    }
    `,

    PUBLISH_TILESET: gql`
    mutation publishTileset(
        $id:String!
        $published: Boolean!
    ){
        publishTileset(
            id:$id
            published:$published
        ){
            _id
            name
            owner
            editors
            ownerInfo{
                username
            }
        }
    }
    `,
}