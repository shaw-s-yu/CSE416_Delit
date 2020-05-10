import * as actionCreators from '../actions/actionCreators'

const layerReducer = (state = initState, action) => {
    if (action.type === actionCreators.FORMAT_PROJECT) {
        let { layersInfo } = action.project
        return {
            ...state,
            layerList: layersInfo
        }
    }


    else if (action.type === actionCreators.LAYER_SELECT) {
        return {
            ...state,
            selected: action.id,

        }
    } else if (action.type === actionCreators.LAYER_UNSELECT) {
        return {
            ...state,
            selected: null,
        }
    } else if (action.type === actionCreators.LAYER_RENAME) {
        let { layerList } = state
        for (let i = 0; i < layerList.length; i++)
            if (layerList[i]._id === action.id) {
                layerList[i].name = action.name
                break;
            }
        return {
            ...state,
            layerList
        }
    } else if (action.type === actionCreators.LAYER_DELETE) {
        let { layerList } = state
        for (let i = 0; i < layerList.length; i++)
            if (layerList[i]._id === action.id) {
                layerList.splice(i, 1)
                break;
            }
        return {
            ...state,
            layerList,
            selected: null
        }
    } else if (action.type === actionCreators.LAYER_MOVE_UP) {
        let layerList = state.layerList.map(e => e)
        for (let i = 0; i < layerList.length; i++)
            if (layerList[i]._id === action.id) {
                if (i === 0) {
                    break;
                }
                let layer = layerList[i];
                layerList[i] = layerList[i - 1];
                layerList[i - 1] = layer;
                break;
            }
        return {
            ...state,
            layerList: layerList,
            selected: null
        }
    } else if (action.type === actionCreators.LAYER_MOVE_DOWN) {
        let layerList = state.layerList.map(e => e);
        for (let i = 0; i < layerList.length - 1; i++)
            if (layerList[i]._id === action.id) {
                let layer = layerList[i];
                layerList[i] = layerList[i + 1];
                layerList[i + 1] = layer;
                break;
            }
        return {
            ...state,
            layerList,
            selected: null
        }
    } else if (action.type === actionCreators.LAYER_VISIBILITY_TOGGLE) {
        let { id, isVisible } = action;
        let { layerList } = state;
        const layers = layerList.map((layer) => {
            if (layer._id === id) {
                layer.visible = isVisible;
            }
            return layer;
        });
        return {
            ...state,
            layerList: layers,
        }
    } else if (action.type === actionCreators.LAYER_LOCK_TOGGLE) {
        let { id, isLock } = action;
        let { layerList } = state;
        const layers = layerList.map((layer) => {
            if (layer._id === id) {
                layer.lock = isLock;
            }
            return layer;
        });
        return {
            ...state,
            layerList: layers,
        }
    }else if (action.type === actionCreators.LAYER_PASS_OPACITY) {
        let {value} = action;
        let {selected, layerList} = state;
        for (let i = 0; i < layerList.length; i++) {
            if (layerList[i]._id === selected) {
                layerList[i].opacity = value;
            }
        }
        const layers = layerList.map( (layer) => {
           if (layer._id === selected) {
               layer.opacity = value
           }
           return layer;
        });
        return {
            ...state,
            layerList: layers,
        }
    }
    return state;
}

export default layerReducer;

const layers = [
]


const initState = {
    layerList: layers,
    selected: null
};