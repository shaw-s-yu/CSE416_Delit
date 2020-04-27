import gql from 'graphql-tag'

export default {
    GET_PROJECTS: gql`
    {
        projects{
            _id
            name
            editors
            owner
        }
    }
    `
}