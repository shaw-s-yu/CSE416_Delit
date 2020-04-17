import * as actionCreators from '../actions/actionCreators.js'


export const createSocketHandler = () => (dispatch, getState) => {
  dispatch({ type: 'CREATE_SOCKET' })
}

export const loginSuccessHandler = (user) => (dispatch, getState) => {
  dispatch({ type: actionCreators.LOGIN_SUCCESS, user })
};

export const loginErrorHandler = (errmsg) => (dispatch, getState) => {
  dispatch({ type: actionCreators.LOGIN_ERROR, errmsg })
};

export const logoutHandler = () => (dispatch, getState) => {
  dispatch({ type: actionCreators.LOGOUT_SUCCESS })
};