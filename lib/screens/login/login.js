Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _templateObject=_taggedTemplateLiteral(['\n  mutation UpdateCustomer($id: ID!, $email: String!, $loginToken: String!, $loginType: CUSTOMER_LOGIN_TYPE!, $stripeCustomerId: String) {\n    updateCustomer(id: $id, email: $email, loginToken: $loginToken, loginType: $loginType, stripeCustomerId: $stripeCustomerId) {\n      id\n      stripeCustomerId\n      email\n      loginToken\n      loginType\n    }\n  }\n'],['\n  mutation UpdateCustomer($id: ID!, $email: String!, $loginToken: String!, $loginType: CUSTOMER_LOGIN_TYPE!, $stripeCustomerId: String) {\n    updateCustomer(id: $id, email: $email, loginToken: $loginToken, loginType: $loginType, stripeCustomerId: $stripeCustomerId) {\n      id\n      stripeCustomerId\n      email\n      loginToken\n      loginType\n    }\n  }\n']);var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');






var _reactNativeButton=require('react-native-button');var _reactNativeButton2=_interopRequireDefault(_reactNativeButton);
var _reactNativeFbsdk=require('react-native-fbsdk');
var _FontAwesome=require('../../../node_modules/react-native-vector-icons/FontAwesome');var _FontAwesome2=_interopRequireDefault(_FontAwesome);
var _styles=require('./../../styles');
var _reactApollo=require('react-apollo');
var _graphqlTag=require('graphql-tag');var _graphqlTag2=_interopRequireDefault(_graphqlTag);
var _loginActions=require('./loginActions');
var _reactRedux=require('react-redux');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}function _taggedTemplateLiteral(strings,raw){return Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}));}

var mutation=(0,_graphqlTag2.default)(_templateObject);











var mapStateToProps=function mapStateToProps(state){var
login=state.login;
return{
email:login.email,
loginType:login.loginType,
loginToken:login.loginToken,
stripeCustomerId:login.stripeCustomerId};

};var

Login=function(_Component){_inherits(Login,_Component);














function Login(props){var _this2=this;_classCallCheck(this,Login);var _this=_possibleConstructorReturn(this,(Login.__proto__||Object.getPrototypeOf(Login)).call(this,
props));_this.


































onFBGraphRequestEnded=function _callee(error,result,loginToken){return regeneratorRuntime.async(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:
if(error){
console.log('onFBGraphRequestEnded Error fetching data: '+error.toString());
}else{
console.log('onFBGraphRequestEnded Success fetching data: '+JSON.stringify(result));

_this.updateCustomer({
email:result.email,
loginType:'Facebook',
loginToken:loginToken});

}case 1:case'end':return _context.stop();}}},null,_this2);};_this.


updateCustomer=function _callee2(updateObject){var customer,stripeCustomerId;return regeneratorRuntime.async(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:
console.log('updateCustomer mutation: '+JSON.stringify(updateObject));_context2.next=3;return regeneratorRuntime.awrap(

_this.props.mutate({
variables:_extends({},
updateObject,{
id:'dummyId',
stripeCustomerId:'dummyStripeId'})}));case 3:customer=_context2.sent;



if(customer){
stripeCustomerId=customer.stripeCustomerId;
console.log('successfully created/updated customer! stripeId: '+stripeCustomerId);
_this.props.updateLoginAction(customer);
_this.props.navigation.navigate('Map');
}else{
console.log('failed to create/update customer! customer: '+JSON.stringify(customer));
}case 5:case'end':return _context2.stop();}}},null,_this2);};_this.onClickFBLogin=_this.onClickFBLogin.bind(_this);_this.onClickCreateAccount=_this.onClickCreateAccount.bind(_this);return _this;}_createClass(Login,[{key:'onClickFBLogin',value:function onClickFBLogin(){var _this3=this;_reactNativeFbsdk.LoginManager.logInWithReadPermissions(['email','public_profile']).then(function(result){if(result.isCancelled){console.log('FB login cancelled');}else{_reactNativeFbsdk.AccessToken.getCurrentAccessToken().then(function(data){var loginToken=data.accessToken.toString();console.log('FB login success! '+loginToken+', email: '+data.email);var infoRequest=new _reactNativeFbsdk.GraphRequest('/me',{accessToken:data.accessToken,parameters:{fields:{string:'email,name,first_name,middle_name,last_name'}}},function(error,result){return _this3.onFBGraphRequestEnded(error,result,loginToken);});new _reactNativeFbsdk.GraphRequestManager().addRequest(infoRequest).start();});}},function(error){return alert('FB login error: '+error);});}},{key:'onClickCreateAccount',value:function onClickCreateAccount()


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
containerStyle:styles.signUpButtonContainer,
style:styles.signUpButtonText,
styleDisabled:{color:'red'},
onPress:this.onClickCreateAccount},'Create Account')));




}}]);return Login;}(_react.Component);Login.navigationOptions={title:'Welcome',header:null};Login.propTypes={mutate:_react.PropTypes.func.isRequired,data:_react.PropTypes.shape({loading:_react.PropTypes.bool,error:_react.PropTypes.object,allCustomers:_react.PropTypes.array})};


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



var componentWithMutation=(0,_reactApollo.graphql)(mutation)(Login);exports.default=
(0,_reactRedux.connect)(mapStateToProps,{updateLoginAction:_loginActions.updateLogin})(componentWithMutation);