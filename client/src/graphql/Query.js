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
    GET_tILESET: graphql`
    query tileset($id: String!){
        tileset(id:$id){
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
}
