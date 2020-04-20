import * as actionCreators from '../actions/actionCreators.js'

export const projectAddHandler = (item) => (dispatch, getState) => {
    dispatch({ type: actionCreators.TEST_PROJECT_ADD, item });
}

export const mapAddHandler = (item) => (dispatch, getState) => {
    dispatch({ type: actionCreators.TEST_MAP_ADD, item });
}

export const tilesetAddHandler = (item) => (dispatch, getState) => {
    dispatch({ type: actionCreators.TEST_TILESET_ADD, item });
}

export const clearHandler = () => (dispatch, getState) => {
    dispatch({ type: actionCreators.TEST_CLEAR });
}