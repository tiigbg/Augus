import { combineReducers } from 'redux';
import Exhibitions from './Exhibitions';
import Map from './Map';

const rootReducer = combineReducers({
  exhibitions : Exhibitions,
  map : Map
});

export default rootReducer;
