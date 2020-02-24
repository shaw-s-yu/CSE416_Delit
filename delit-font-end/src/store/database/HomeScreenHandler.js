import * as actionCreators from '../actions/actionCreators.js'


export const createSocketHandler = () => (dispatch, getState) => {
  console.log('ff')
  dispatch({ type: 'CREATE_SOCKET' })
}

export const loginHandler = ({ credentials, sockets }) => (dispatch, getState) => {
  // firebase.auth().signInWithEmailAndPassword(
  //   credentials.email,
  //   credentials.password,
  // ).then(() => {
  //   console.log("LOGIN_SUCCESS");
  //   dispatch({ type: 'LOGIN_SUCCESS' });
  // }).catch((err) => {
  //   dispatch({ type: 'LOGIN_ERROR', err });
  // });
};

export const logoutHandler = (firebase) => (dispatch, getState) => {
  firebase.auth().signOut().then(() => {
    dispatch(actionCreators.logoutSuccess);
  });
};

export const registerHandler = (newUser, firebase) => (dispatch, getState, { getFirestore }) => {
  const firestore = getFirestore();
  firebase.auth().createUserWithEmailAndPassword(
    newUser.email,
    newUser.password,
  ).then(resp => firestore.collection('users').doc(resp.user.uid).set({
    firstName: newUser.firstName,
    lastName: newUser.lastName,
    initials: `${newUser.firstName[0]}${newUser.lastName[0]}`,
  })).then(() => {
    dispatch(actionCreators.registerSuccess);
  }).catch((err) => {
    dispatch(actionCreators.registerError);
  });
};