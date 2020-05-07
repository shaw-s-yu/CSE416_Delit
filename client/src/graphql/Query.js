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
    ){
        user(
            id:$userId
        ){
            projectsOwned(
                searchName: $search
                skip: $pageSkip
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
    ){
        user(
            id:$userId
        ){
            projectsRelated(
                searchName: $search
                skip: $pageSkip
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
    ){
        user(
            id:$userId
        ){
            projectsShared(
                searchName: $search
                skip: $pageSkip
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
            owner
            imageId
            width
            height
            tileWidth
            tileHeight
        }
    }
    `,
    GET_TILESETS: graphql`
    query user(
        $userId: String!
        $pageSkip: Int!
        $search: String!
    ){
        user(
            id:$userId
        ){
            tilesets(
                searchName: $search
                skip: $pageSkip
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
        }
    }
    `,
    GET_OWNED_TILESETS: graphql`
    query user(
        $userId: String!
        $pageSkip: Int!
        $search: String!
    ){
        user(
            id:$userId
        ){
            tilesetsOwned(
                searchName: $search
                skip: $pageSkip
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
    GET_MAPS: graphql`
    query map($id: String!){
        maps(id:$id){
            _id
            mapJsonFile{
                width
                height
                infinite
                layers{
                    data
                    width
                    height
                    id
                    name
                    opacity
                    type
                    visible
                    x
                    y
                }
                nextLayerid
                nextObjectid
                orientation
                renderorder
                tiledversion
                tileWidth
                tilesheight
                tilesets{
                    columns
                    firstgid
                    image
                    imageWidth
                    imageheight
                    margin
                    name
                    spacing
                    tilecount
                    tileheight
                    tilewidth
                }
                type
                version
            }
        }
    }`,
}
