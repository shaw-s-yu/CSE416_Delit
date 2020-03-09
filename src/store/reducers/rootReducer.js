import { combineReducers } from 'redux';
import authReducer from './authReducer';
import backendReducer from './backendReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  backend: backendReducer,
});

export default rootReducer;