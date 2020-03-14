import * as actionCreators from '../actions/actionCreators'

const initState = {};

const tilesetReducer = (state = initState, action) => {
    if (action.type === actionCreators.TILESET_UNSELECT) {
        return {
            selected: null,
        }
    } else if (action.type === actionCreators.TILESET_SELECT) {
        return {
            selected: action.value,
        }
    }
    return state;
}

export default tilesetReducer;