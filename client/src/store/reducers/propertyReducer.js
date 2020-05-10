import * as actionCreators from '../actions/actionCreators'

const propertyReducer = (state = initState, action) => {

    if (action.type === actionCreators.FORMAT_PROJECT) {
        const { mapInfo, tilesetsInfo, layersInfo } = action.project
        const map = formateMap(mapInfo)
        const tilesets = formateTilesets(tilesetsInfo)
        const layers = formateLayers(layersInfo)
        console.log(map, tilesets, layers)
        return {
            ...state,
            map, tilesets, layers,
            display: map,
        }
    }

    else if (action.type === actionCreators.PROPERTY_SELECT) {
        return {
            ...state,
            selected: {
                window: action.window,
                index: action.index,
            }
        }
    } else if (action.type === actionCreators.PROPERTY_UNSELECT) {
        return {
            ...state,
            selected: null,
        }
    } else if (action.type === actionCreators.PROPERTY_CHANGE) {
        let properties = state[action.window]
        properties[action.index][action.name] = action.value
        return {
            ...state,
            [action.name]: properties
        }
    } else if (action.type === actionCreators.PROPERTY_DELETE) {
        if (!state.selected) return { ...state }
        const { window, index } = state.selected
        let properties = state[window]
        properties.splice(index, 1)
        return {
            ...state,
            [window]: properties,
            selected: null
        }
    }

    return state;
}

export default propertyReducer;


const initState = {
    map: [],
    layer: [],
    tilesets: [],
};


const formateMap = (mapInfo) => {
    const { width, height, tileWidth, tileHeight } = mapInfo
    return { width, height, tileWidth, tileHeight }
}

const formateTilesets = (tilesetsInfo) => {
    let tilesets = []
    for (let i = 0; i < tilesetsInfo.length; i++) {
        const { width, height } = tilesetsInfo[i]
        tilesets.push({
            width, height
        })
    }

    return tilesets
}

const formateLayers = (layersInfo) => {
    let layers = []
    for (let i = 0; i < layersInfo.length; i++) {
        const { opacity, visible, name } = layersInfo[i]
        layers.push({
            opacity, visible, name
        })
    }
    return layers
}