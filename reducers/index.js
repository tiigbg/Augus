import { combineReducers } from 'redux';
import Adventures from './Adventures';
import Map from './Map';

const rootReducer = combineReducers({
  exhibitions : Adventures,
  map : Map
});

export default rootReducer;
