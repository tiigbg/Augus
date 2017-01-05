import { combineReducers } from 'redux';
import Routes from './Routes';
import Exhibitions from './Exhibitions';
import Settings from './Settings';
import Map from './Map';

const rootReducer = combineReducers({
  routes: Routes,
  exhibitions: Exhibitions,
  map: Map,
  settings: Settings,
});

export default rootReducer;
