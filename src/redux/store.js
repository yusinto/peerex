import {createStore, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducer';

export let storeInstance;

export default function () {
  storeInstance = createStore(reducers, compose(applyMiddleware(thunk)));
  return storeInstance;
}
