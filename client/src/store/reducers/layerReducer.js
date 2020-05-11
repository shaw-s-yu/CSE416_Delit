import * as actionCreators from '../actions/actionCreators'
import { v1 } from 'uuid'

const layerReducer = (state = initState, action) => {

    if (action.type === actionCreators.FORMAT_PROJECT) {
        let layerList = action.project.layersInfo.map(e => {
            e.locked = false
            return e
        })

        let layerFormat = { ...action.project.layersInfo[0] }

        return {
            ...state,
            layerList,
            layerFormat
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
            if (layerList[i]._id === state.selected.id) {
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
        let layerList = []
        for (let i in state.layerList) {
            layerList.push({
                ...state.layerList[i],
                visible: state.layerList[i]._id === action.id ? !state.layerList[i].visible : state.layerList[i].visible
            })
        }
        return {
            ...state,
            layerList,
        }
    } else if (action.type === actionCreators.LAYER_LOCK_TOGGLE) {
        let layerList = []
        for (let i in state.layerList) {
            layerList.push({
                ...state.layerList[i],
                locked: state.layerList[i]._id === action.id ? !state.layerList[i].locked : state.layerList[i].locked
            })
        }
        return {
            ...state,
            layerList,
        }
    } else if (action.type === actionCreators.LAYER_PASS_OPACITY) {
        let layerList = []
        for (let i in state.layerList) {
            layerList.push({
                ...state.layerList[i],
                opacity: state.layerList[i]._id === state.selected ? (action.value / 100) : state.layerList[i].opacity
            })
        }
        return {
            ...state,
            layerList,
        }
    } else if (action.type === actionCreators.ADD_LAYER) {
        let layerList = state.layerList.map(e => e)
        let layerToAdd = { ...state.layerFormat }
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

    else if (action.type === actionCreators.LAYER_RESTORE) {
        const layerList = action.layerList.map(e => e)
        if (!layerList) return { ...state }
        return {
            ...state,
            layerList
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