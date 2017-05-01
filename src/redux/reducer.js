import {combineReducers} from 'redux';
import map from '../screens/map/mapReducer';

const appReducer = combineReducers({
  map,
});

export default appReducer;

