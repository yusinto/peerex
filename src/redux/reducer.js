import {combineReducers} from 'redux';
import login from '../screens/login/loginReducer';
import map from '../screens/map/mapReducer';
import merchantDetails from '../screens/merchant/merchantDetailsReducer';

const appReducer = combineReducers({
  login,
  map,
  merchantDetails,
});

export default appReducer;

