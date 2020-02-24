import { combineReducers } from 'redux';
import authReducer from './authReducer';
import mongodbReducer from './mongodbReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  mongodb: mongodbReducer,
});

export default rootReducer;