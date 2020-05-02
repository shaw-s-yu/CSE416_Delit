import gql from "graphql-tag";

export default {
    ADD_PROJECT: gql`
    mutation addProject(
            $name: String!,
            $owner: String!,
            $editors: [String],
            $imageId: String!
        ){
            addProject(
                name: $name,
                owner: $owner,
                editors: $editors
                imageId: $imageId
                ){
                name
                owner
                editors
            }
        }
    `,
    REMOVE_PROJECT: gql`
    mutation removeProject(
            $id: String!
        ){
            removeProject(id: $id){
                name
                owner
                editors
                ownerInfo{
                    username
                }
            }
        }
    `,
    UPDATE_PROJECT: gql`
    mutation updateProject(
            $id: String!,
            $name: String!,
        ){
            updateProject(id: $id, name: $name){
                name
                owner
                editors
                ownerInfo{
                    username
                }
            }
        
        }
    `,

    CLEAR_PROJECTS: gql`
    mutation {
        clearProjects
    }
    `,

    INVITE_2PROJECT: gql`
    mutation invite2Project(
        $id:String!
        $users:[String]!,
    ){
        invite2Project(id: $id, invites:$users){
            name
            owner
            editors
            ownerInfo{
                username
            }
        }
    }
    `,

    DUPLICATE_PROJECT: gql`
    mutation duplicationProject(
        $id:String!
        $name:String!
        $owner:String!
    ){
        duplicationProject(id: $id, name:$name, owner:$owner){
            name
            owner
            editors
            ownerInfo{
                username
            }
        }
    }
    `

}