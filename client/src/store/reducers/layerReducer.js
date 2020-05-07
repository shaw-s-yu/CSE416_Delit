import * as actionCreators from '../actions/actionCreators'
import React from 'react';
import { v1 } from 'uuid';

const layerReducer = (state = initState, action) => {
    if (action.type === actionCreators.LAYER_SELECT) {
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
        let { layerList } = state
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
            layerList,
            selected: null
        }
    }  else if (action.type === actionCreators.LAYER_MOVE_DOWN) {
        let {layerList} = state;
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

        return state;
    }

    return state;
}

export default layerReducer;

const layers = [
    { name: "background layer", ref: React.createRef(), _id: v1() },
    { name: "block layer", ref: React.createRef(), _id: v1() },
    { name: "dummy layer", ref: React.createRef(), _id: v1() },
]


const initState = {
    layerList: layers,
    selected: null
};