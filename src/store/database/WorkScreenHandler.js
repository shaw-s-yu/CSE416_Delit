import * as actionCreators from '../actions/actionCreators.js'

export const tilsetImgInitHandler = (name, value) => (dispatch, getState) => {
    dispatch({ type: actionCreators.TILESET_IMG_INIT, name: name, value: value });
}

export const unselectTilesetHandler = () => (dispatch, getState) => {
    dispatch({ type: actionCreators.TILESET_UNSELECT });
}

export const selectTilesetHandler = (selected) => (dispatch, getState) => {
    dispatch({ type: actionCreators.TILESET_SELECT, value: selected });
}

export const moveWindowHandler = (name, value) => (dispatch, getState) => {
    dispatch({ type: actionCreators.WINDOW_MOVE, name: name, value: value });
}

export const resizeWindowHandler = (window, size) => (dispatch, getState) => {
    dispatch({ type: actionCreators.WINDOW_RESIZE, window, size });
}

export const selectPropertyHandler = (window, index) => (dispatch, getState) => {
    dispatch({ type: actionCreators.PROPERTY_SELECT, window: window, index: index });
}

export const unselectPropertyHandler = () => (dispatch, getState) => {
    dispatch({ type: actionCreators.PROPERTY_UNSELECT });
}

export const changePropertyHandler = (name, index, type, value) => (dispatch, getState) => {
    dispatch({ type: actionCreators.PROPERTY_CHANGE, window: name, index: index, name: type, value: value });
}

export const deletePropertyHandler = () => (dispatch, getState) => {
    dispatch({ type: actionCreators.PROPERTY_DELETE });
}

export const scrollXHandler = (window, data) => (dispatch, getState) => {
    dispatch({ type: actionCreators.SCROLL_X, window: window, data: data });
}

export const scrollYHandler = (window, data) => (dispatch, getState) => {
    dispatch({ type: actionCreators.SCROLL_Y, window: window, data: data });
}


export const handleToTop = (window, callback) => (dispatch, getState) => {
    let target = document.getElementById(window)
    if (target.style.zIndex === "4") {
        return
    }

    let map = document.getElementById('map')
    let property = document.getElementById('property')
    let layer = document.getElementById('layer')
    let tileset = document.getElementById('tileset')
    map.style.zIndex -= map.style.zIndex === "1" ? 0 : 1
    property.style.zIndex -= property.style.zIndex === "1" ? 0 : 1
    layer.style.zIndex -= layer.style.zIndex === "1" ? 0 : 1
    tileset.style.zIndex -= tileset.style.zIndex === "1" ? 0 : 1

    target.style.zIndex = 4
}