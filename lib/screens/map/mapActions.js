Object.defineProperty(exports,"__esModule",{value:true});exports.Actions=undefined;exports.





updateFrequentFlyer=updateFrequentFlyer;var _keymirror=require('keymirror');var _keymirror2=_interopRequireDefault(_keymirror);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var Actions=exports.Actions=(0,_keymirror2.default)({UPDATE_FREQUENT_FLYER:null});function updateFrequentFlyer(data){
return{
type:Actions.UPDATE_FREQUENT_FLYER,
data:data};

}