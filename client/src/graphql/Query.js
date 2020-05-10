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
        $sortBy: String!
        $sortOrder: Int!
    ){
        user(
            id:$userId
        ){
            projectsOwned(
                searchName: $search
                skip: $pageSkip
                sortBy: $sortBy
                sortOrder: $sortOrder
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
        $sortBy: String!
        $sortOrder: Int!
    ){
        user(
            id:$userId
        ){
            projectsRelated(
                searchName: $search
                skip: $pageSkip
                sortBy: $sortBy
                sortOrder: $sortOrder
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
        $sortBy: String!
        $sortOrder: Int!
    ){
        user(
            id:$userId
        ){
            projectsShared(
                searchName: $search
                skip: $pageSkip
                sortBy: $sortBy
                sortOrder: $sortOrder
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
            columns
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
            margin
            spacing
            tilecount
            published
        }
    }
    `,
    GET_TILESETS: graphql`
    query user(
        $userId: String!
        $pageSkip: Int!
        $search: String!
        $sortBy: String!
        $sortOrder: Int!
    ){
        user(
            id:$userId
        ){
            tilesets(
                searchName: $search
                skip: $pageSkip
                sortBy: $sortBy
                sortOrder: $sortOrder
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
                published
            }
            tilesetsAmount(searchName: $search)
        }
    }
    `,
    GET_MY_OWNED_TILESETS: graphql`
    query user(
        $userId: String!
        $pageSkip: Int!
        $search: String!
        $sortBy: String!
        $sortOrder: Int!
    ){
        user(
            id:$userId
        ){
            tilesetsOwned(
                searchName: $search
                skip: $pageSkip
                sortBy: $sortBy
                sortOrder: $sortOrder
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
                published
            }
            tilesetsOwnedAmount(searchName: $search)
        }
    }`,
    GET_MY_SHARED_TILESETS: graphql`
    query user(
        $userId: String!
        $pageSkip: Int!
        $search: String!
        $sortBy: String!
        $sortOrder: Int!
    ){
        user(
            id:$userId
        ){
            tilesetsShared(
                searchName: $search
                skip: $pageSkip
                sortBy: $sortBy
                sortOrder: $sortOrder
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
                published
            }
            tilesetsSharedAmount(searchName: $search)
        }
    }`,
    GET_ALL_MAPS: graphql`
    {
        maps{
            _id
            width
            height
            infinite
            nextlayerid
            nextobjectid
            orientation
            renderorder
            tiledversion
            tileHeight
            tileWidth
            type
            version
        }
    }`,
    GET_MAP: graphql`
    query map($id: String!){
        map(id:$id){
            _id
            width
            height
            infinite
            nextlayerid
            nextobjectid
            orientation
            renderorder
            tiledversion
            tileHeight
            tileWidth
            type
            version
        }
    }
    `,

    GET_ALL_LAYERS: graphql`
    {
        layers{
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
    GET_LAYER: graphql`
    query layer($id: String!){
        layer(id:$id){
            _id
            idNumber
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
    GET_PROJECT: graphql`
    query project($id: String!){
        project(id:$id){
            _id
            name
            owner
            editors
            imageId
            mapId
            tilesetId
            tilesetFirstgid
            layerId
            editors
            lastUpdate
            ownerInfo{
                username
                _id
            }
            teamInfo{
                username
                _id
            }
            layersInfo{
                _id
                data
                width
                height
                name
                opacity
                type
                visible
                x
                y
            }
            tilesetsInfo{
                _id
                name
                owner
                editors
                ownerInfo{
                    username
                    _id
                }
                teamInfo{
                    username
                    _id
                }
                columns
                imageId
                width
                height
                margin
                spacing
                tilecount
                tileHeight
                tileWidth
                published
            }
            mapInfo{
                _id
                width
                height
                infinite
                nextlayerid
                nextobjectid
                orientation
                renderorder
                tiledversion
                tileHeight
                tileWidth
                type
                version
            }
        }
    }
    `,


    GET_LAYER_FROM_PROJECT: graphql`
    query project(
        $id: String!
        $searchId: String!
    ){
        project(
            id:$id
            ){
            getLayer(
                searchId: $searchId
            ){
                _id
                idNumber
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
    }
    `,


}
