Object.defineProperty(exports,"__esModule",{value:true});exports.storeInstance=undefined;exports.default=





function(){
exports.storeInstance=storeInstance=(0,_redux.createStore)(_reducer2.default,(0,_redux.compose)((0,_redux.applyMiddleware)(_reduxThunk2.default)));
return storeInstance;
};var _redux=require('redux');var _reduxThunk=require('redux-thunk');var _reduxThunk2=_interopRequireDefault(_reduxThunk);var _reducer=require('./reducer');var _reducer2=_interopRequireDefault(_reducer);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var storeInstance=exports.storeInstance=void 0;