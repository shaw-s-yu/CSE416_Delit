import * as actionCreators from '../actions/actionCreators'




const workScreenReducer = (state = initState, action) => {
    if (action.type === actionCreators.WINDOW_SELECT) {
        let { order } = state;
        order.push(order.splice(order.indexOf("map"), 1)[0]);
        return {
            ...state,
            order: order
        }
    }
    return state;
}

export default workScreenReducer;

const rect = document.body.getBoundingClientRect();
const { width, height } = rect
const tilesetWindow = {
    x: width * 0.8,
    y: height * 0.7 * 0.4,
    width: width * 0.2,
    height: height * 0.7 * 0.6,
}

const propertyWindow = {
    x: 0,
    y: 0,
    width: width * 0.2,
    height: height * 0.7
}

const mapWindow = {
    x: width * 0.2,
    y: 0,
    width: width * 0.6,
    height: height * 0.7
}

const layerWindow = {
    x: width * 0.8,
    y: 0,
    width: width * 0.2,
    height: height * 0.7 * 0.4
}

const initState = {
    tileset: tilesetWindow,
    property: propertyWindow,
    map: mapWindow,
    layer: layerWindow,
    order: ['map', 'property', 'layer', 'tileset'],
};