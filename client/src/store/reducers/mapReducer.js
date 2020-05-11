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

    else if (action.type === actionCreators.SELECT_TILESET_GRIDS) {
        console.log(action.selectedGrids)
        return {
            ...state,
            selectedGrids: action.selectedGrids
        }
    }
    return state;
}

export default mapReducer;

const initState = {
    selectedGrids: []
};