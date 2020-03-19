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

export const resizeWindowHandler = (name, value) => (dispatch, getState) => {
    dispatch({ type: actionCreators.WINDOW_RESIZE, name: name, value: value });
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