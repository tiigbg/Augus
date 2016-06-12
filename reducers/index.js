import { combineReducers } from 'redux';
import Routes from './Routes';
import Exhibitions from './Exhibitions';
import Map from './Map';

const rootReducer = combineReducers({
  routes : Routes,
  exhibitions : Exhibitions,
  map : Map
});

export default rootReducer;
