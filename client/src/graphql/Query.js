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
    ){
        user(
            id:$userId
        ){
            projectsOwned(skip: $pageSkip){
                name
                ownerInfo{
                    username
                }
            }
            projectsOwnedAmount
        }
    }`,
    GET_MY_RELATED_PROJECTS: graphql`
    query user(
        $userId: String!
        $pageSkip: Int!
    ){
        user(
            id:$userId
        ){
            projectsRelated(skip: $pageSkip){
                name
                ownerInfo{
                    username
                }
            }
            projectsRelatedAmount
        }
    }`,
    GET_MY_SHARED_PROJECTS: graphql`
    query user(
        $userId: String!
        $pageSkip: Int!
    ){
        user(
            id:$userId
        ){
            projectsShared(skip: $pageSkip){
                name
                ownerInfo{
                    username
                }
            }
            projectsSharedAmount
        }
    }`,


}
