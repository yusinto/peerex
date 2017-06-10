Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};exports.default=







reducer;var _merchantDetailsActions=require('./merchantDetailsActions');var initialState={sourceId:'',brand:'',last4:''};function reducer(){var state=arguments.length>0&&arguments[0]!==undefined?arguments[0]:initialState;var action=arguments.length>1&&arguments[1]!==undefined?arguments[1]:{};var
type=action.type,data=action.data;

switch(type){
case _merchantDetailsActions.Actions.UPDATE_MERCHANT_DETAILS:
return _extends({},
state,
data);


default:
return state;}

}