Object.defineProperty(exports,"__esModule",{value:true});exports.Actions=undefined;exports.





updateMerchantDetails=updateMerchantDetails;var _keymirror=require('keymirror');var _keymirror2=_interopRequireDefault(_keymirror);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var Actions=exports.Actions=(0,_keymirror2.default)({UPDATE_MERCHANT_DETAILS:null});function updateMerchantDetails(data){
return{
type:Actions.UPDATE_MERCHANT_DETAILS,
data:data};

}