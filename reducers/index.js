import { combineReducers } from 'redux';
import Adventures from './Adventures';
import Map from './Map';

const rootReducer = combineReducers({
  adventures : Adventures,
  map : Map
});

export default rootReducer;
