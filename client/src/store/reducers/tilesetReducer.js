import * as actionCreators from '../actions/actionCreators'

const initState = {
    imgs: {}
};

const tilesetReducer = (state = initState, action) => {

    if (action.type === actionCreators.FORMAT_PROJECT) {
        let { tilesetsInfo } = action.project
        return {
            ...state,
            tilesets: tilesetsInfo
        }
    }
    else if (action.type === actionCreators.TILESET_UNSELECT) {
        return {
            ...state,
            selected: null,
        }
    } else if (action.type === actionCreators.TILESET_SELECT) {
        return {
            ...state,
            selected: action.value,
        }
    } else if (action.type === actionCreators.TILESET_IMG_INIT) {
        let { imgs } = state
        imgs[action.name] = action.value
        return {
            ...state,
            imgs,
        }
    }

    return state;
}

export default tilesetReducer;