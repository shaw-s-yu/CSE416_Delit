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
        $owner:String!
        $editors:[String]
        $imageId:String!
        $width: Int!
        $height:Int!
        $tileWidth:Int!
        $tileHeight:Int!
    ){
        addTileset(
            name:$name
            owner:$owner
            editors:$editors
            imageId:$imageId
            width:$width
            height:$height
            tileWidth:$tileWidth
            tileHeight:$tileHeight
        ){
            imageId
            width
            height
            tileWidth
            tileHeight
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

}