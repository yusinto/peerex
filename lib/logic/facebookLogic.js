Object.defineProperty(exports,"__esModule",{value:true});exports.getFacebookEmail=undefined;var _this=this;var _reactNativeFbsdk=require('react-native-fbsdk');

var getFacebookEmail=exports.getFacebookEmail=function getFacebookEmail(cb){var token,infoRequest;return regeneratorRuntime.async(function getFacebookEmail$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.next=2;return regeneratorRuntime.awrap(
_reactNativeFbsdk.AccessToken.getCurrentAccessToken());case 2:token=_context.sent;

if(token){
console.log('Found existing token: '+token.accessToken);
infoRequest=new _reactNativeFbsdk.GraphRequest('/me',{
accessToken:token.accessToken,
parameters:{fields:{string:'email,name,first_name,middle_name,last_name'}}},
cb);
new _reactNativeFbsdk.GraphRequestManager().addRequest(infoRequest).start();
}else{
console.log('No existing token.');
}case 4:case'end':return _context.stop();}}},null,_this);};