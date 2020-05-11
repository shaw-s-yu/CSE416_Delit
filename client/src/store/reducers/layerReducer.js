import * as actionCreators from '../actions/actionCreators'
import { v1 } from 'uuid'

const layerReducer = (state = initState, action) => {

    if (action.type === actionCreators.FORMAT_PROJECT) {
        let layerList = action.project.layersInfo.map(e => {
            e.locked = false
            return e
        })

        return {
            ...state,
            layerList
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
        let layerList = state.layerList.map(e => e)
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
        }
    } else if (action.type === actionCreators.LAYER_VISIBILITY_TOGGLE) {
        const layerList = state.layerList.map(e => {
            if (e._id === action.id) {
                e.visible = !e.visible
                return e
            } else {
                return e
            }
        })
        return {
            ...state,
            layerList,
        }
    } else if (action.type === actionCreators.LAYER_LOCK_TOGGLE) {
        const layerList = state.layerList.map(e => {
            if (e._id === action.id) {
                e.locked = !e.locked
                return e
            } else {
                return e
            }
        })
        return {
            ...state,
            layerList,
        }
    } else if (action.type === actionCreators.LAYER_PASS_OPACITY) {
        const { value } = action;
        const { selected } = state;
        const layerList = state.layerList.map(e => {
            if (e._id === selected) {
                e.opacity = value / 100
                return e
            } else {
                return e
            }
        })
        return {
            ...state,
            layerList
        }
    } else if (action.type === actionCreators.ADD_LAYER) {
        let layerList = state.layerList.map(e => e)
        let layerToAdd = { ...layerList[0] }
        layerToAdd._id = v1()
        layerToAdd.opacity = 1
        layerToAdd.name = 'New Layer Click to Rename'
        layerToAdd.locked = false
        layerToAdd.visible = true
        layerToAdd.data = layerToAdd.data.map(e => 0)
        layerList.push(layerToAdd)
        return {
            ...state,
            layerList,
        }
    }

    else if (action.type === actionCreators.MAP_STAMP_CLICK) {
        if (!action.data) return { ...state }
        let layerList = state.layerList.map(e => {
            if (e._id === state.selected) {
                for (let i in e.data) {
                    if (action.data[i] !== 0)
                        e.data[i] = action.data[i]
                }
                return e
            } else {
                return e
            }
        })
        return {
            ...state,
            layerList,
        }

    }

    else if (action.type === actionCreators.MAP_FILL_CLICK) {
        if (!action.data) return { ...state }
        let layerList = state.layerList.map(e => {
            if (e._id === state.selected) {
                e.data = action.data
                return e
            } else {
                return e
            }
        })
        return {
            ...state,
            layerList,
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