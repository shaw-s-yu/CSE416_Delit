import * as actionCreators from '../actions/actionCreators'




const workScreenReducer = (state = initState, action) => {
    if (action.type === actionCreators.WINDOW_RESIZE) {
        let window = state[action.name];
        window.size = action.value;
        return {
            ...state,
            [action.name]: window,
        }
    }
    return state;
}

export default workScreenReducer;

const rect = document.body.getBoundingClientRect();
const { width, height } = rect
const tilesetWindow = {
    position: { x: width * 0.8, y: height * 0.28 },
    size: { width: width * 0.2, height: height * 0.42 },
}

const propertyWindow = {
    position: { x: 0, y: 0 },
    size: { width: width * 0.2, height: height * 0.7 },
}

const mapWindow = {
    position: { x: width * 0.2, y: 0 },
    size: { width: width * 0.6, height: height * 0.7 },
}

const layerWindow = {
    position: { x: width * 0.8, y: 0 },
    size: { width: width * 0.2, height: height * 0.28 },
}

const initState = {
    tileset: tilesetWindow,
    property: propertyWindow,
    map: mapWindow,
    layer: layerWindow,
    order: ['map', 'property', 'layer', 'tileset'],
};