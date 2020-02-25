import * as actionCreators from '../actions/actionCreators.js'


export const createSocketHandler = () => (dispatch, getState) => {
  dispatch({ type: 'CREATE_SOCKET' })
}

export const loginHandler = (data, socket) => (dispatch, getState) => {
  socket.emit('login_input', data, (err, msg) => {
    if (err)
      dispatch({ type: actionCreators.LOGIN_ERROR, value: msg })
    else
      dispatch({ type: actionCreators.LOGIN_SUCCESS, value: msg })
  })
};

export const logoutHandler = (data, socket) => (dispatch, getState) => {

};

export const registerHandler = (data, socket) => (dispatch, getState) => {
  socket.emit('register_input', data, (err, msg) => {
    if (err)
      dispatch({ type: actionCreators.REGISTER_ERROR, value: msg })
    else
      dispatch({ type: actionCreators.REGISTER_SUCCESS, value: msg })
  })
};