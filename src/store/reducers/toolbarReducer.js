import * as actionCreators from '../actions/actionCreators'

const initState = {
    selected: null
};

const toolbarReducer = (state = initState, action) => {
    if (action.type === actionCreators.TOOLBAR_SELECT) {
        return {
            ...state,
            selected: action.name,
        }
    } else if (action.type === actionCreators.TOOLBAR_UNSELECT) {
        return {
            ...state,
            selected: null,
        }
    }
    return state;
}

export default toolbarReducer;