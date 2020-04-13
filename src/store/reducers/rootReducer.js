import { combineReducers } from 'redux';
import authReducer from './authReducer';
import backendReducer from './backendReducer'
import tilesetReducer from './tilesetReducer'
import propertyReducer from './propertyReducer'
import mapReducer from './mapReducer'
import layerReducer from './layerReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  backend: backendReducer,
  tileset: tilesetReducer,
  property: propertyReducer,
  map: mapReducer,
  layer: layerReducer
});

export default rootReducer;