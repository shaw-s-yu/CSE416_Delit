import * as actionCreators from '../actions/actionCreators'

const initState = {
    loaded: false
};

const projectReducer = (state = initState, action) => {
    if (action.type === actionCreators.FORMAT_PROJECT) {
        let { project } = action
        return {
            ...state,
            ...project,
            loaded: true
        }
    }
    return state;
}

export default projectReducer;