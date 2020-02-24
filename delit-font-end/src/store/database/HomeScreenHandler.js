import * as actionCreators from '../actions/actionCreators.js'


export const createSocketHandler = () => (dispatch, getState) => {
  dispatch({ type: 'CREATE_SOCKET' })
}

export const loginHandler = (data, socket) => (dispatch, getState) => {
  console.log(data)
  socket.emit('login_input', data)
};

export const logoutHandler = (firebase) => (dispatch, getState) => {
  firebase.auth().signOut().then(() => {
    dispatch(actionCreators.logoutSuccess);
  });
};

export const registerHandler = (data, socket) => (dispatch, getState) => {
  socket.emit('register_input', data)
};