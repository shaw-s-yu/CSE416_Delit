import * as actionCreators from '../actions/actionCreators'

const mapReducer = (state = initState, action) => {
    if (action.type === actionCreators.FORMAT_PROJECT) {
        let { mapInfo } = action.project
        return {
            ...state,
            map: mapInfo
        }
    }

    else if (action.type === actionCreators.MAP_SELECT_TOOL) {
        return {
            ...state,
            selectedTool: action.tool,

        }
    }

    else if (action.type === actionCreators.ADD_LAYER) {
        const map = {
            ...state.map,
            nextlayerid: state.map.nextlayerid + 1
        }
        return {
            ...state, map
        }
    }
    return state;
}

export default mapReducer;

const initState = {
};