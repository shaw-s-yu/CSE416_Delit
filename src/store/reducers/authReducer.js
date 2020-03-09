import * as actionCreators from '../actions/actionCreators'

// REDUCERS ARE CALLED WHEN AN ACTION IS DISPATCHED,
// THEIR JOB IS TO ADVANCE THE STATE. THEY WILL UPDATE
// AND RETURN THE NEW, UPDATED STATE

const initState = {};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case actionCreators.LOGIN_ERROR:
      return {
        authError: action.value,
      };
    case actionCreators.LOGIN_SUCCESS:
      return {
        email: action.value,
      };
    case actionCreators.LOGOUT_SUCCESS:
      return state;
    case actionCreators.REGISTER_SUCCESS:
      return {
        email: action.value,
      };
    case actionCreators.REGISTER_ERROR:
      return {
        authError: action.value,
      };
    case actionCreators.CLEAR_ERROR:
      return {
        authError: null,
      };

    default:
      return state;
  }
};

export default authReducer;