import * as actionCreators from '../actions/actionCreators'

const propertyReducer = (state = initState, action) => {

    if (action.type === actionCreators.FORMAT_PROJECT) {
        const { mapInfo, tilesetsInfo, layersInfo, customPropertyName, customPropertyValue } = action.project
        const map = formateMap(mapInfo)
        const tilesets = formateTilesets(tilesetsInfo)
        const layers = formateLayers(layersInfo)
        const custom = formateProperty(customPropertyName, customPropertyValue);
        return {
            ...state,
            map, tilesets, layers, custom,
            display: map,
        }
    }
    else if (action.type === actionCreators.ADD_LAYER) {
        let layerList = []
        for (let i in state.layers) {
            layerList.push({ ...state.layers[i] })
        }
        layerList.push({
            name: action.layer.name,
            visible: action.layer.visible + '',
            opacity: action.layer.opacity
        })

        return {
            ...state,
            layers: layerList,
        }
    }

    else if (action.type === actionCreators.LAYER_RENAME) {
        let layers = []
        for (let i = 0; i < state.layers.length; i++) {
            if (i === action.id)
                layers.push({
                    ...state.layers[i],
                    name: action.name
                })
            else {
                layers.push({ ...state.layers[i] })
            }
        }
        return {
            ...state,
            layers,
            display: layers[action.id]
        }
    }

    else if (action.type === actionCreators.LAYER_VISIBILITY_TOGGLE) {
        let layers = []
        for (let i = 0; i < state.layers.length; i++) {
            layers.push({
                ...state.layers[i],
                visible: i === action.id ? !state.layers[i].visible : state.layers[i].visible
            })
        }
        return {
            ...state,
            layers,
            display: layers[action.id]
        }
    }

    else if (action.type === actionCreators.LAYER_RESTORE) {
        const layers = action.layerList.map(e => e)
        if (!layers) return { ...state }
        return {
            ...state,
            layers
        }
    }

    else if (action.type === actionCreators.LAYER_SELECT) {
        return {
            ...state,
            selectedLayer: action.id,
        }
    }

    else if (action.type === actionCreators.LAYER_DELETE) {
        let layers = state.layers.map(e => e)
        for (let i = 0; i < layers.length; i++)
            if (i === action.id) {
                layers.splice(i, 1)
                break;
            }
        return {
            ...state,
            layers,
            selected: null
        }
    }

    else if (action.type === actionCreators.SELECT_PROPERTY_WINDOW) {
        let display = state.map
        if (action.window === 'layers' || action.window === 'map  ') {
            display = state[action.window][action.index]
        }
        return {
            ...state,
            display
        }
    }
    else if (action.type === actionCreators.SELECT_PROPERTY_TILE) {
        let display = { ...state[action.window][action.index] }
        display.id = action.id
        return {
            ...state,
            display
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
        let custom = []
        for (let i = 0; i < state.custom.length; i++) {
            custom.push({
                ...state.custom[i],
                [action.name]: i === action.index ? action.value : state.custom[i][action.name]
            })
        }
        return {
            ...state,
            custom
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
    } else if (action.type === actionCreators.ADD_PROPERTY) {
        let custom = []
        for (let i in state.custom) {
            custom.push({
                ...state.custom[i]
            })
        }
        custom.push({
            name: 'Click To Enter',
            type: 'String',
            value: 'Click To Enter'
        })
        return {
            ...state,
            custom
        }
    }
    else if (action.type === actionCreators.RESTORE_CUSTOM_PROPERTY) {
        let custom = []
        for (let i in action.custom) {
            custom.push({
                ...action.custom[i]
            })
        }
        return {
            ...state,
            custom
        }
    }

    return state;
}

export default propertyReducer;


const initState = {
    map: [],
    layer: [],
    tilesets: [],
    custom: []
};


const formateMap = (mapInfo) => {
    const { width, height, tileWidth, tileHeight } = mapInfo
    return { width, height, tileWidth, tileHeight }
}

const formateTilesets = (tilesetsInfo) => {
    let tilesets = []
    for (let i = 0; i < tilesetsInfo.length; i++) {
        const { width, height, tileWidth, tileHeight } = tilesetsInfo[i]
        tilesets.push({
            width, height, tileWidth, tileHeight
        })
    }

    return tilesets
}

const formateLayers = (layersInfo) => {
    let layers = []
    for (let i = 0; i < layersInfo.length; i++) {
        const { opacity, visible, name } = layersInfo[i]
        layers.push({
            opacity, visible: visible + '', name,
        })
    }
    return layers
}

const formateProperty = (customPropertyName, customPropertyValue) => {
    let custom = [];
    for (let i = 0; i < customPropertyName.length; i++) {
        custom.push({
            name:customPropertyName[i], type:"String", value:customPropertyValue[i],
        })
    }
    return custom;
}