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
    ){
        user(
            id:$userId
        ){
            projectsOwned{
                name
                ownerInfo{
                    username
                }
            }
        }
    }`,
    GET_MY_RELATED_PROJECTS: graphql`
    query user(
        $userId: String!
    ){
        user(
            id:$userId
        ){
            projectsRelated{
                name
                ownerInfo{
                    username
                }
            }
        }
    }`,
    GET_MY_SHARED_PROJECTS: graphql`
    query user(
        $userId: String!
    ){
        user(
            id:$userId
        ){
            projectsShared{
                name
                ownerInfo{
                    username
                }
            }
        }
    }`,


}
