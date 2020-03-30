import { combineReducers } from 'redux';
import authReducer from './authReducer';
import backendReducer from './backendReducer'
import tilesetReducer from './tilesetReducer'
import propertyReducer from './propertyReducer'
import mapReducer from './mapReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  backend: backendReducer,
  tileset: tilesetReducer,
  property: propertyReducer,
  map: mapReducer
});

export default rootReducer;