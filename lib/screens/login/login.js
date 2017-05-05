Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');






var _reactNativeButton=require('react-native-button');var _reactNativeButton2=_interopRequireDefault(_reactNativeButton);
var _reactNativeFbsdk=require('react-native-fbsdk');
var _FontAwesome=require('../../../node_modules/react-native-vector-icons/FontAwesome');var _FontAwesome2=_interopRequireDefault(_FontAwesome);
var _styles=require('./../../styles');
var _reactNativeGoogleSignin=require('react-native-google-signin');
var _constants=require('../../constants');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

Login=function(_Component){_inherits(Login,_Component);





function Login(props){_classCallCheck(this,Login);var _this=_possibleConstructorReturn(this,(Login.__proto__||Object.getPrototypeOf(Login)).call(this,
props));
_this.onClickFBLogin=_this.onClickFBLogin.bind(_this);
_this.onClickCreateAccount=_this.onClickCreateAccount.bind(_this);
_this.onClickGoogleLogin=_this.onClickGoogleLogin.bind(_this);return _this;
}_createClass(Login,[{key:'componentDidMount',value:function componentDidMount()

{
this._setupGoogleSignin();
}},{key:'onClickFBLogin',value:function onClickFBLogin()

{var _this2=this;
_reactNativeFbsdk.LoginManager.logInWithReadPermissions(['email','public_profile']).then(
function(result){
if(result.isCancelled){
alert('FB login cancelled');
}else{
_reactNativeFbsdk.AccessToken.getCurrentAccessToken().then(function(data){

_this2.props.navigation.navigate('Map');
});
}
},
function(error){return alert('FB login error: '+error);});

}},{key:'_setupGoogleSignin',value:function _setupGoogleSignin(){var user;return regeneratorRuntime.async(function _setupGoogleSignin$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.prev=0;_context.next=3;return regeneratorRuntime.awrap(




_reactNativeGoogleSignin.GoogleSignin.hasPlayServices({autoResolve:true}));case 3:_context.next=5;return regeneratorRuntime.awrap(
_reactNativeGoogleSignin.GoogleSignin.configure({
iosClientId:GoogleSigniniOSClientID}));case 5:_context.next=7;return regeneratorRuntime.awrap(




_reactNativeGoogleSignin.GoogleSignin.currentUserAsync());case 7:user=_context.sent;
console.log(user);
this.setState({user:user});_context.next=15;break;case 12:_context.prev=12;_context.t0=_context['catch'](0);


console.log("Google signin error",_context.t0.code,_context.t0.message);case 15:case'end':return _context.stop();}}},null,this,[[0,12]]);}},{key:'onClickGoogleLogin',value:function onClickGoogleLogin()



{var _this3=this;
if(!this.state.user){
_reactNativeGoogleSignin.GoogleSignin.signIn().
then(function(user){
console.log(user);
_this3.setState({user:user});
_this3.props.navigation.navigate('Map');
}).
catch(function(err){
console.log('WRONG SIGNIN',err);
}).
done();
}
if(this.state.user){
this.props.navigation.navigate('Map');
}
}},{key:'onClickCreateAccount',value:function onClickCreateAccount()

{

alert('TODO: create account');
}},{key:'render',value:function render()

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
_react2.default.createElement(_reactNative.Text,{style:styles.continueWithFbText},'Continue with Facebook'))),


_react2.default.createElement(_reactNativeButton2.default,{
containerStyle:styles.loginButton,
styleDisabled:{color:'red'},
onPress:this.onClickGoogleLogin},
_react2.default.createElement(_reactNative.View,{style:styles.fbLogoContainer},
_react2.default.createElement(_FontAwesome2.default,{style:styles.fbLogo,name:'google',size:20,color:'#FFFFFF'}),
_react2.default.createElement(_reactNative.Text,{style:styles.continueWithFbText},'Continue with Google'))),


_react2.default.createElement(_reactNativeButton2.default,{
containerStyle:styles.signUpButtonContainer,
style:styles.signUpButtonText,
styleDisabled:{color:'red'},
onPress:this.onClickCreateAccount},'Create Account')));




}}]);return Login;}(_react.Component);Login.navigationOptions={title:'Welcome',header:null};exports.default=Login;


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
textAlign:'center'}});