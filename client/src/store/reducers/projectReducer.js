import * as actionCreators from '../actions/actionCreators'

const initState = {

};

const projectReducer = (state = initState, action) => {
    if (action.type === actionCreators.FORMAT_PROJECT) {
        let { project } = action
        return {
            ...state,
            ...project
        }
    }
    return state;
}

export default projectReducer;