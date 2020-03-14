import { combineReducers } from 'redux';
import authReducer from './authReducer';
import backendReducer from './backendReducer'
import tilesetReducer from './tilesetReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  backend: backendReducer,
  tileset: tilesetReducer,
});

export default rootReducer;