import { combineReducers } from 'redux';
import authReducer from './authReducer';
import backendReducer from './backendReducer'
import tilesetReducer from './tilesetReducer'
import workScreenReducer from './workScreenReducer'
import propertyReducer from './propertyReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  backend: backendReducer,
  tileset: tilesetReducer,
  workScreen: workScreenReducer,
  property: propertyReducer,
});

export default rootReducer;