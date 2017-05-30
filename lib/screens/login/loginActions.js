Object.defineProperty(exports,"__esModule",{value:true});exports.Actions=undefined;exports.





updateLogin=updateLogin;var _keymirror=require('keymirror');var _keymirror2=_interopRequireDefault(_keymirror);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var Actions=exports.Actions=(0,_keymirror2.default)({UPDATE_LOGIN:null});function updateLogin(data){
return{
type:Actions.UPDATE_LOGIN,
data:data};

}