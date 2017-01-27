import { combineReducers } from 'redux';
import Routes from './Routes';
import Exhibitions from './Exhibitions';
import Settings from './Settings';

const rootReducer = combineReducers({
  routes: Routes,
  exhibitions: Exhibitions,
  settings: Settings,
});

export default rootReducer;
