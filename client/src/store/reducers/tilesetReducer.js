import * as actionCreators from '../actions/actionCreators'

const initState = {
    imgs: {},
    loaded: false,
    selectedGrids: [],
    selectedItem: null,
};

const tilesetReducer = (state = initState, action) => {
    if (action.type === actionCreators.FORMAT_PROJECT) {
        let { tilesetsInfo, tilesetFirstgid } = action.project
        for (let i = 0; i < tilesetsInfo.length; i++) {
            tilesetsInfo[i].firstgid = tilesetFirstgid[i]
        }
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
    }

    else if (action.type === actionCreators.TILESET_LOADED) {
        return {
            ...state,
            loaded: true
        }
    }

    else if (action.type === actionCreators.TILESET_ID_APPLIER) {
        const { id, index } = action
        let tilesets = []
        for (let i = 0; i < state.tilesets.length; i++) {
            if (i === index) {
                tilesets.push({
                    ...state.tilesets[i],
                    canvasId: id
                })
            } else {
                tilesets.push(state.tilesets[i])
            }
        }
        return {
            ...state,
            tilesets
        }
    }

    else if (action.type === actionCreators.SELECT_TILESET_GRIDS) {
        return {
            ...state,
            selectedGrids: action.selectedGrids
        }
    }



    else if (action.type === actionCreators.TILESET_SELECT) {
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

    else if (action.type === actionCreators.UPDATE_TILESETS) {
        let newTilesets = [];
        for (let i = 0; i < action.tilesets.length; i++) {
            newTilesets.push(action.tilesets[i])
        }
        return{
            ...state,
            tilesets: newTilesets
        }
    }

    else if (action.type === actionCreators.PASS_SELECTED_TILESET) {
        console.log("redux: ", action.selectedItem)
        return{
            ...state,
            selectedItem: action.selectedItem
        }
    }
    return state;
}

export default tilesetReducer;