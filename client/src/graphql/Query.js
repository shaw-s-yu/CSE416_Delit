import graphql from 'graphql-tag'
export default {

    EMPTY_QUERY: graphql`{
        empty
    }`,
    GET_PROJECTS: graphql`
    {
        projects{
            _id
            name
            editors
            owner
            ownerInfo{
                username
            }
        }
    }`,
    GET_MY_OWNED_PROJECTS: graphql`
    query user(
        $userId: String!
        $pageSkip: Int!
        $search: String!
        $sortBt: String!
    ){
        user(
            id:$userId
        ){
            projectsOwned(
                searchName: $search
                skip: $pageSkip
                sortBt: $sortBt
                ){
                name
                _id
                imageId
                ownerInfo{
                    username
                }
                teamInfo{
                    _id
                    username
                    picture
                }
            }
            projectsOwnedAmount(searchName: $search)
        }
    }`,
    GET_MY_RELATED_PROJECTS: graphql`
    query user(
        $userId: String!
        $pageSkip: Int!
        $search: String!
        $sortBt: String!
    ){
        user(
            id:$userId
        ){
            projectsRelated(
                searchName: $search
                skip: $pageSkip
                sortBt: $sortBt
                ){
                name
                _id
                imageId
                ownerInfo{
                    username
                }
                teamInfo{
                    _id
                    username
                    picture
                }
            }
            projectsRelatedAmount(searchName: $search)
        }
    }`,
    GET_MY_SHARED_PROJECTS: graphql`
    query user(
        $userId: String!
        $pageSkip: Int!
        $search: String!
        $sortBt: String!
    ){
        user(
            id:$userId
        ){
            projectsShared(
                searchName: $search
                skip: $pageSkip
                sortBt: $sortBt
                ){
                name
                _id
                imageId
                ownerInfo{
                    username
                }
                teamInfo{
                    _id
                    username
                    picture
                }
            }
            projectsSharedAmount(searchName: $search)
        }
    }`,

    GET_ALL_TILESETS: graphql`
    {
        tilesets{
            _id
            name
            projectName
            owner
            imageId
            width
            height
            tileWidth
            tileHeight
            columns
            firstgid
            margin
            spacing
            tilecount
        }
    }
    `,
    GET_TILESET: graphql`
    query tileset($id: String!){
        tileset(id:$id){
            _id
            name
            ownerInfo{
                username
            }
            teamInfo{
                _id
                username
            }
            imageId
            width
            height
            tileWidth
            tileHeight
            columns
            firstgid
            margin
            spacing
            tilecount
        }
    }
    `,
    GET_TILESETS: graphql`
    query user(
        $userId: String!
        $pageSkip: Int!
        $search: String!
        $sortBt: String!
    ){
        user(
            id:$userId
        ){
            tilesets(
                searchName: $search
                skip: $pageSkip
                sortBt: $sortBt
            ){
                name
                _id
                imageId
                ownerInfo{
                    username
                }
                teamInfo{
                    _id
                    username
                    picture
                }
            }
            tilesetsAmount(searchName: $search)
        }
    }
    `,
    // GET_TILESET: graphql`
    // query tileset($id: String!){
    //     tileset(id:$id){
    //         _id
    //         name
    //         ownerInfo{
    //             username
    //         }
    //         teamInfo{
    //             _id
    //             username
    //         }
    //         imageId
    //         width
    //         height
    //         tilewidth
    //         tileheight
    //         columns
    //         firstgid
    //         margin
    //         spacing
    //         tilecount

    //     }
    // }
    // `,
    GET_MY_OWNED_TILESETS: graphql`
    query user(
        $userId: String!
        $pageSkip: Int!
        $search: String!
        $sortBt: String!
    ){
        user(
            id:$userId
        ){
            tilesetsOwned(
                searchName: $search
                skip: $pageSkip
                sortBt: $sortBt
                ){
                name
                _id
                imageId
                ownerInfo{
                    username
                }
                teamInfo{
                    _id
                    username
                    picture
                }
            }
            tilesetsOwnedAmount(searchName: $search)
        }
    }`,
    GET_MY_SHARED_TILESETS: graphql`
    query user(
        $userId: String!
        $pageSkip: Int!
        $search: String!
        $sortBt: String!
    ){
        user(
            id:$userId
        ){
            tilesetsShared(
                searchName: $search
                skip: $pageSkip
                sortBt: $sortBt
                ){
                name
                _id
                imageId
                ownerInfo{
                    username
                }
                teamInfo{
                    _id
                    username
                    picture
                }
            }
            tilesetsSharedAmount(searchName: $search)
        }
    }`,
    GET_ALL_MAPS: graphql`
    {
        maps{
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
    }`,
    GET_MAP: graphql`
    query map($id: String!){
        map(id:$id){
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
    }
    `,

    GET_ALL_LAYERS: graphql`
    {
        layers{
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
    GET_LAYER: graphql`
    query layer($id: String!){
        layer(id:$id){
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
}
