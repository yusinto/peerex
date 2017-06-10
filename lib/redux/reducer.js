Object.defineProperty(exports,"__esModule",{value:true});var _redux=require('redux');
var _loginReducer=require('../screens/login/loginReducer');var _loginReducer2=_interopRequireDefault(_loginReducer);
var _mapReducer=require('../screens/map/mapReducer');var _mapReducer2=_interopRequireDefault(_mapReducer);
var _merchantDetailsReducer=require('../screens/merchant/merchantDetailsReducer');var _merchantDetailsReducer2=_interopRequireDefault(_merchantDetailsReducer);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

var appReducer=(0,_redux.combineReducers)({
login:_loginReducer2.default,
map:_mapReducer2.default,
merchantDetails:_merchantDetailsReducer2.default});exports.default=


appReducer;