Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');






var _reactNativeButton=require('react-native-button');var _reactNativeButton2=_interopRequireDefault(_reactNativeButton);
var _reactNativeFbsdk=require('react-native-fbsdk');
var _FontAwesome=require('../../../node_modules/react-native-vector-icons/FontAwesome');var _FontAwesome2=_interopRequireDefault(_FontAwesome);
var _styles=require('./../../styles');
var _loginActions=require('./loginActions');
var _reactRedux=require('react-redux');
var _constants=require('../../constants');
var _facebookLogic=require('../../logic/facebookLogic');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var mapStateToProps=function mapStateToProps(state){var
login=state.login;
return{
email:login.email,
loginType:login.loginType,
stripeCustomerId:login.stripeCustomerId};

};var

Login=function(_Component){_inherits(Login,_Component);function Login(){var _ref,_this2=this;var _temp,_this,_ret;_classCallCheck(this,Login);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=Login.__proto__||Object.getPrototypeOf(Login)).call.apply(_ref,[this].concat(args))),_this),_this.









onClickFBLogin=function _callee(){var loginResult,data,loginToken,infoRequest;return regeneratorRuntime.async(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:
loginResult=void 0;_context.prev=1;_context.next=4;return regeneratorRuntime.awrap(

_reactNativeFbsdk.LoginManager.logInWithReadPermissions(['email','public_profile']));case 4:loginResult=_context.sent;_context.next=11;break;case 7:_context.prev=7;_context.t0=_context['catch'](1);


console.log('FB login error: '+JSON.stringify(_context.t0));return _context.abrupt('return');case 11:if(!



loginResult.isCancelled){_context.next=15;break;}
console.log('FB login cancelled');_context.next=22;break;case 15:_context.next=17;return regeneratorRuntime.awrap(

_reactNativeFbsdk.AccessToken.getCurrentAccessToken());case 17:data=_context.sent;
loginToken=data.accessToken.toString();
console.log('FB login success! '+loginToken);
infoRequest=new _reactNativeFbsdk.GraphRequest(
'/me',
{
accessToken:data.accessToken,
parameters:{
fields:{
string:'email,name,first_name,middle_name,last_name'}}},



function(error,result){return _this.onFBGraphRequestEnded(error,result);});


new _reactNativeFbsdk.GraphRequestManager().addRequest(infoRequest).start();case 22:case'end':return _context.stop();}}},null,_this2,[[1,7]]);},_this.



onFBGraphRequestEnded=function(error,result){
if(error){
console.log('onFBGraphRequestEnded Error fetching data: '+error.toString());
}else{
console.log('onFBGraphRequestEnded Success fetching data: '+JSON.stringify(result));

_this.updateCustomer({
email:result.email,
loginType:'Facebook'});

}
},_this.

updateCustomer=function _callee2(_ref2){var email=_ref2.email,loginType=_ref2.loginType;var result,resultJson;return regeneratorRuntime.async(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:_context2.prev=0;_context2.next=3;return regeneratorRuntime.awrap(

fetch(_constants.LAMBDA_API+'/create-or-update-customer',
{
method:'POST',
headers:{
'Accept':'application/json',
'Content-Type':'application/json'},

body:JSON.stringify({email:email,loginType:loginType})}));case 3:result=_context2.sent;_context2.next=6;return regeneratorRuntime.awrap(


result.json());case 6:resultJson=_context2.sent;

console.log('successfully created/updated customer! '+JSON.stringify(resultJson));
_this.props.updateLoginAction(resultJson);
_this.props.navigation.navigate('Map');_context2.next=15;break;case 12:_context2.prev=12;_context2.t0=_context2['catch'](0);

console.log('failed to create/update customer! customer: '+email+', '+loginType);case 15:case'end':return _context2.stop();}}},null,_this2,[[0,12]]);},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(Login,[{key:'componentWillMount',value:function componentWillMount(){return regeneratorRuntime.async(function componentWillMount$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:_context3.next=2;return regeneratorRuntime.awrap((0,_facebookLogic.getFacebookEmail)(this.onFBGraphRequestEnded));case 2:case'end':return _context3.stop();}}},null,this);}},{key:'render',value:function render()



{
return(
_react2.default.createElement(_reactNative.View,{style:styles.container},
_react2.default.createElement(_reactNative.Image,{source:require('../../../assets/images/logo-peerex.png'),style:styles.logoPeerex}),
_react2.default.createElement(_reactNative.Text,{style:styles.welcome},'Welcome to Peerex'),


_react2.default.createElement(_reactNativeButton2.default,{
containerStyle:styles.loginButton,
styleDisabled:{color:'red'},
onPress:this.onClickFBLogin},
_react2.default.createElement(_reactNative.View,{style:styles.fbLogoContainer},
_react2.default.createElement(_FontAwesome2.default,{style:styles.fbLogo,name:'facebook',size:20,color:'#FFFFFF'}),
_react2.default.createElement(_reactNative.Text,{style:styles.continueWithFbText},'Continue with Facebook')))));




}}]);return Login;}(_react.Component);Login.navigationOptions={title:'Welcome',header:null};


var styles=_reactNative.StyleSheet.create({
container:{
flex:1,
justifyContent:'flex-start',
alignItems:'center'},

logoPeerex:{
marginTop:68},

fbLogoContainer:{
flex:1,
flexDirection:'row',
justifyContent:'center',
alignItems:'center'},

fbLogo:{
position:'absolute',
left:20},

continueWithFbText:{
fontSize:14,
color:_styles.colors.white},


welcome:{
marginTop:17,
marginBottom:49,
color:_styles.colors.primaryLight,

fontSize:18},

textInputContainer:{
marginTop:20,
height:42,
width:'90%',
borderBottomColor:_styles.colors.primary,
borderBottomWidth:1},

textInput:{
height:42,
paddingLeft:10,
paddingRight:10},

loginButton:{
marginTop:20,
height:40,
width:'90%',
backgroundColor:_styles.colors.primary,
borderRadius:4,
overflow:'hidden'},

forgotPassword:{
marginTop:27,
fontSize:12,
fontWeight:'500',
color:_styles.colors.font},

noAccount:{
marginTop:61,
fontSize:12,
fontWeight:'300',
color:_styles.colors.font},

signUpButtonContainer:{
marginTop:15,
height:40,
width:'90%',
borderRadius:4,
overflow:'hidden',
borderWidth:1,
borderColor:_styles.colors.font},

signUpButtonText:{
fontSize:14,
color:_styles.colors.font,

marginTop:11,
textAlign:'center'}});exports.default=



(0,_reactRedux.connect)(mapStateToProps,{updateLoginAction:_loginActions.updateLogin})(Login);