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
                projectName: $search
                skip: $pageSkip
                ){
                name
                _id
                imageId
                ownerInfo{
                    username
                }
                teamInfo{
                    username
                    picture
                }
            }
            projectsOwnedAmount(projectName: $search)
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
                projectName: $search
                skip: $pageSkip
                ){
                name
                _id
                imageId
                ownerInfo{
                    username
                }
                teamInfo{
                    username
                    picture
                }
            }
            projectsRelatedAmount(projectName: $search)
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
                projectName: $search
                skip: $pageSkip
                ){
                name
                _id
                imageId
                ownerInfo{
                    username
                }
                teamInfo{
                    username
                    picture
                }
            }
            projectsSharedAmount(projectName: $search)
        }
    }`,


}
