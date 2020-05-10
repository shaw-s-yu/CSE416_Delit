import * as actionCreators from '../actions/actionCreators'

const initState = {
    projects: [],
    maps: [],
    tilesets: [],
    layers: [],
    projectId: null,
};

const projectReducer = (state = initState, action) => {
    if (action.type === actionCreators.TEST_PROJECT_ADD) {
        let { projects } = state
        let toAdd = []
        for (let i in projects)
            toAdd.push(projects[i])
        for (let i in action.item)
            toAdd.push(action.item[i])
        return {
            ...state,
            projects: toAdd,
        }
    }
    return state;
}

export default projectReducer;