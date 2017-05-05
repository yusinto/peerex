Object.defineProperty(exports,"__esModule",{value:true});var _redux=require('redux');
var _mapReducer=require('../screens/map/mapReducer');var _mapReducer2=_interopRequireDefault(_mapReducer);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var appReducer=(0,_redux.combineReducers)({
map:_mapReducer2.default});exports.default=


appReducer;