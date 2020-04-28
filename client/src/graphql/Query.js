import graphql from 'graphql-tag'
export default {
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
    }
    `
}
