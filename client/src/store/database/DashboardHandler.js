import * as actionCreators from '../actions/actionCreators.js'

export const passProjectIdHandler = (id) => (dispatch, getState) => {
    dispatch({ type: actionCreators.PASS_PROJECT_ID })
}