import graphql from 'graphql-tag'
export default {

    EMPTY_QUERY: graphql`{
        empty
    }`,
    GET_TILESETS: graphql`
    {
        tilesets{
            _id
            name
            imageId
            
            
            owner
            imagewidth
            imageheight
            tilewidth
            tileheight
            spacing
            margin
            columns
            projectName
            firstgid
            ownerInfo{  
                username
            }
        }
    }`,
    GET_MY_OWNED_TILESETS: graphql`
    query user(
        $userId: String!
        $pageSkip: Int!
        $search: String!
    ){
        user(
            id:$userId
        ){
            tilesetsOwned(
                tilesetName: $search
                skip: $pageSkip
                ){
                name
                _id
                image
                imagewidth
                imageheight
                tilewidth
                tileheight
                ownerInfo{
                    username
                }
            }
            tilesetsOwnedAmount(tilesetName: $search)
        }
    }`,
    GET_MY_RELATED_TILESETS: graphql`
    query user(
        $userId: String!
        $pageSkip: Int!
        $search: String!
    ){
        user(
            id:$userId
        ){
            tilesetsRelated(
                tilesetName: $search
                skip: $pageSkip
                ){
                name
                _id
                imageId
                width
                height
                tilewidth
                tileheight
                ownerInfo{
                    username
                }
            }
            tilesetsRelatedAmount(tilesetName: $search)
        }
    }`,
    GET_MY_SHARED_TILESETS: graphql`
    query user(
        $userId: String!
        $pageSkip: Int!
        $search: String!
    ){
        user(
            id:$userId
        ){
            tilesetsShared(
                tilesetName: $search
                skip: $pageSkip
                ){
                name
                _id
                imageId
                width
                height
                tilewidth
                tileheight
                ownerInfo{
                    username
                }
            }
            tilesetsSharedAmount(tilesetName: $search)
        }
    }`,


}
