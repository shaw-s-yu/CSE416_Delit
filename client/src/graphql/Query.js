import graphql from 'graphql-tag'
import { gql } from 'apollo-boost';
export default {
    GET_PROJECTS: graphql`
    {
        projects{
            _id
            name
            editors
            ownerId
            ownerInfo
        }
    }
    `
}

const getProjectsQuery = gql`
    {
        projects {
            id
            name
            img
            editors
            ownerInfo {
                username
            }
        }
    }
`

export { getProjectsQuery };