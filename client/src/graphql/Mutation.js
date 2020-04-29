import gql from "graphql-tag";

export default {
    ADD_PROJECT: gql`
    mutation addProject(
            $name: String!,
            $owner: String!,
            $editors: [String],
        ){
            addProject(
            name: $name,
            owner: $owner,
            editors: $editors
            ){
                name
                owner
                editors
            }
        }
    `,

    CLEAR_PROJECTS: gql`
    mutation {
        clearProjects
    }
    `
}