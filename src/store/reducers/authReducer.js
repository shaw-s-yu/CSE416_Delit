import * as actionCreators from '../actions/actionCreators'

const initState = {
    user: null,
    errmsg: null
}

const authReducer = (state = initState, action) => {
    if (action.type === actionCreators.LOGIN_ERROR) {
        return {
            user: null,
            errmsg: action.msg
        }
    } else if (action.type === actionCreators.LOGIN_SUCCESS) {
        return {
            user: action.user,
            errmsg: null
        }
    }
    return state;
}

export default authReducer;
