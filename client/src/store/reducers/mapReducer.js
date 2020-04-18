import * as actionCreators from '../actions/actionCreators'

const mapReducer = (state = initState, action) => {
    if (action.type === actionCreators.MAP_SELECT_TOOL) {
        return {
            ...state,
            selectedTool: action.tool,

        }
    }
    return state;
}

export default mapReducer;

const initState = {

};