import { combineReducers } from 'redux';
import authReducer from './authReducer';
import backendReducer from './backendReducer'
import tilesetReducer from './tilesetReducer'
import workScreenReducer from './workScreenReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  backend: backendReducer,
  tileset: tilesetReducer,
  workScreen: workScreenReducer,
});

export default rootReducer;