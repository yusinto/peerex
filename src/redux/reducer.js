import {combineReducers} from 'redux';
import login from '../screens/login/loginReducer';
import map from '../screens/map/mapReducer';

const appReducer = combineReducers({
  login,
  map,
});

export default appReducer;

