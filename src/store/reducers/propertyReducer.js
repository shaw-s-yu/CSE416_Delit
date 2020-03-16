import * as actionCreators from '../actions/actionCreators'
import React from 'react';


const propertyReducer = (state = initState, action) => {
    if (action.type === actionCreators.PROPERTY_SELECT) {
        return {
            ...state,
            selected: {
                name: action.name,
                value: action.value,
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
    }

    return state;
}

export default propertyReducer;

const map = [
    { name: 'name1', value: 'value1', nref: React.createRef(), vref: React.createRef() },
    { name: 'name2', value: 'value2', nref: React.createRef(), vref: React.createRef() },
    { name: 'name3', value: 'value3', nref: React.createRef(), vref: React.createRef() },
]

const layer = [
    { name: 'name4', value: 'value4', nref: React.createRef(), vref: React.createRef() },
    { name: 'name5', value: 'value5', nref: React.createRef(), vref: React.createRef() },
    { name: 'name6', value: 'value6', nref: React.createRef(), vref: React.createRef() },
]


const initState = {
    map: map,
    layer: layer,
};