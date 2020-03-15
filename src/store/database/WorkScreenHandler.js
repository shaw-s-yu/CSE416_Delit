import * as actionCreators from '../actions/actionCreators.js'

export const unselectTilesetHandler = () => (dispatch, getState) => {
    dispatch({ type: actionCreators.TILESET_UNSELECT });
}

export const selectTilesetHandler = (selected) => (dispatch, getState) => {
    dispatch({ type: actionCreators.TILESET_SELECT, value: selected });
}

export const selectWindowHandler = (selected) => (dispatch, getState) => {
    dispatch({ type: actionCreators.WINDOW_SELECT, value: selected });
}

export const initWindowHandler = () => (dispatch, getState) => {
    dispatch({ type: actionCreators.WINDOW_INIT });
}

export const moveWindowHandler = () => (dispatch, getState) => {
    dispatch({ type: actionCreators.WINDOW_MOVE });
}