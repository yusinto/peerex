Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _templateObject=_taggedTemplateLiteral(['\n  mutation UpdateCustomer($id: ID!, $email: String!, $loginType: CUSTOMER_LOGIN_TYPE!) {\n    updateCustomer(id: $id, email: $email, loginType: $loginType) {\n      id\n      stripeCustomerId\n      email\n      loginType\n    }\n  }\n'],['\n  mutation UpdateCustomer($id: ID!, $email: String!, $loginType: CUSTOMER_LOGIN_TYPE!) {\n    updateCustomer(id: $id, email: $email, loginType: $loginType) {\n      id\n      stripeCustomerId\n      email\n      loginType\n    }\n  }\n']);var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');








var _reactNativeButton=require('react-native-button');var _reactNativeButton2=_interopRequireDefault(_reactNativeButton);
var _styles=require('../../styles');
var _FontAwesome=require('../../../node_modules/react-native-vector-icons/FontAwesome');var _FontAwesome2=_interopRequireDefault(_FontAwesome);
var _merchants=require('../../data/merchants.json');var _merchants2=_interopRequireDefault(_merchants);
var _reactRedux=require('react-redux');
var _constants=require('../../constants');
var _reactNativeCheckout=require('react-native-checkout');
var _reactApollo=require('react-apollo');
var _graphqlTag=require('graphql-tag');var _graphqlTag2=_interopRequireDefault(_graphqlTag);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}function _taggedTemplateLiteral(strings,raw){return Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}));}

var mapStateToProps=function mapStateToProps(state){var
login=state.login;

return{
id:login.id,
stripeCustomerId:login.stripeCustomerId,
withdrawAmount:state.map.withdrawAmount};

};

var mutation=(0,_graphqlTag2.default)(_templateObject);var










MerchantDetails=function(_Component){_inherits(MerchantDetails,_Component);function MerchantDetails(){var _ref;var _temp,_this,_ret;_classCallCheck(this,MerchantDetails);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=MerchantDetails.__proto__||Object.getPrototypeOf(MerchantDetails)).call.apply(_ref,[this].concat(args))),_this),_this.







state={
modalVisible:false,
cardToken:null},_this.


onPressBack=function(){
_this.props.navigation.goBack();
},_this.

addCard=function(){
_this.setState({modalVisible:!_this.state.modalVisible});
},_this.

onAddCardSuccessful=function(token){
console.log('onAddCardSuccessful token: '+token);


_this.setState({
modalVisible:false,
cardToken:token});

},_this.

onClickGetCashNow=function(){
alert('todo');
},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(MerchantDetails,[{key:'render',value:function render()

{
var merchant=_merchants2.default[this.props.navigation.state.params.index];var

withdrawAmount=this.props.withdrawAmount;
var serviceFee=withdrawAmount*(_constants.PeerexFeeInt/100);
var total=serviceFee+withdrawAmount;

return(
_react2.default.createElement(_reactNative.View,{style:styles.root},
_react2.default.createElement(_reactNative.Image,{style:styles.merchantImage,source:{uri:merchant.imageUrl}}),
_react2.default.createElement(_reactNative.TouchableOpacity,{style:styles.backContainer,onPress:this.onPressBack},
_react2.default.createElement(_FontAwesome2.default,{name:'chevron-left',size:28,color:'#FFFFFF'})),

_react2.default.createElement(_reactNative.View,{style:styles.merchantDetailsContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.merchantTitle},merchant.title),
_react2.default.createElement(_reactNative.Text,{style:styles.merchantAddress},merchant.description)),

_react2.default.createElement(_reactNative.View,{style:styles.requestSummaryContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.summary},'Summary'),
_react2.default.createElement(_reactNative.View,{style:styles.summaryItemContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.requestedCash},'Requested Cash'),
_react2.default.createElement(_reactNative.Text,{style:styles.requestedAmount},'SGD ',this.props.withdrawAmount.toFixed(2))),

_react2.default.createElement(_reactNative.View,{style:styles.summaryItemContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.label},'Service Fee'),
_react2.default.createElement(_reactNative.Text,{style:styles.amount},'SGD ',serviceFee.toFixed(2))),

_react2.default.createElement(_reactNative.View,{style:styles.summaryItemContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.label},'Total Payment'),
_react2.default.createElement(_reactNative.Text,{style:styles.amount},'SGD ',total.toFixed(2))),

_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:this.addCard},
_react2.default.createElement(_reactNative.View,{style:styles.summaryItemContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.label},'Charge to'),

this.state.cardToken?
_react2.default.createElement(_reactNative.Text,{style:styles.label}):

_react2.default.createElement(_reactNative.Text,{style:styles.label},'add a card')))),




_react2.default.createElement(_reactNative.Text,{style:styles.footerText},'You will only be charged after you have picked up the cash from this merchant'),



_react2.default.createElement(_reactNative.View,{style:styles.footerButtonContainer},
_react2.default.createElement(_reactNativeButton2.default,{
containerStyle:[styles.button,{backgroundColor:_styles.colors.secondary}],
onPress:this.onClickCallMerchant},
_react2.default.createElement(_reactNative.Text,{style:styles.buttonText},'Call Merchant')),

_react2.default.createElement(_reactNativeButton2.default,{
containerStyle:[styles.button,{backgroundColor:_styles.colors.primary}],
onPress:this.onClickGetCashNow},
_react2.default.createElement(_reactNative.Text,{style:styles.buttonText},'Get Cash Now'))),


_react2.default.createElement(_reactNative.Modal,{
animationType:"slide",
transparent:false,
visible:this.state.modalVisible,
onRequestClose:function onRequestClose(){alert("Modal has been closed.");}},

_react2.default.createElement(_reactNativeCheckout.StripeAddCard,{
publicStripeKey:'pk_test_BxQnxB54Ie3wLNhJYHkbzt2J',
addCardTokenHandler:this.onAddCardSuccessful,
styles:{
addCardContainer:{
flex:1,
justifyContent:'center',
backgroundColor:'#F2F2F5'}},


activityIndicatorColor:'pink',
addCardButtonText:'Add Card',
scanCardButtonText:'Scan Card',
scanCardAfterScanButtonText:'Scan Card Again'}))));




}}]);return MerchantDetails;}(_react.Component);MerchantDetails.navigationOptions=function(_ref2){var navigation=_ref2.navigation,screenProps=_ref2.screenProps;return{title:null,header:null};};


var styles=_reactNative.StyleSheet.create({
addCardModal:{
top:50},

backContainer:{
position:'absolute',
top:30,
left:22,
backgroundColor:'transparent'},

root:{
flex:1,
justifyContent:'flex-start',
alignItems:'center',
backgroundColor:_styles.colors.background,
width:'100%'},

merchantImage:{
height:150,
width:'100%',
alignSelf:'center',
marginTop:0},

merchantDetailsContainer:{
height:100,
width:'100%',
backgroundColor:_styles.colors.white,
padding:25,
borderBottomWidth:1,
borderBottomColor:_styles.colors.border},

merchantTitle:{
fontSize:18,
color:_styles.colors.font},

merchantAddress:{
marginTop:10,
fontSize:12,
color:_styles.colors.secondaryFont},

requestSummaryContainer:{
marginTop:8,
height:210,
width:'100%',
backgroundColor:_styles.colors.white,
padding:25,
paddingTop:20,
borderTopWidth:1,
borderTopColor:_styles.colors.border,
borderBottomWidth:1,
borderBottomColor:_styles.colors.border},

summary:{
fontSize:10,
color:_styles.colors.font,
marginBottom:5},

summaryItemContainer:{
flexDirection:'row',
alignItems:'center',
justifyContent:'space-between',
height:36,
width:'100%',
borderBottomWidth:1,
borderBottomColor:_styles.colors.border},

requestedCash:{
fontSize:14,
color:_styles.colors.font},

requestedAmount:{
fontSize:18,
color:_styles.colors.primaryDark},

label:{
fontSize:12,
color:_styles.colors.tertiaryFont},

amount:{
fontSize:12,
color:_styles.colors.font},

footerText:{
marginTop:10,
fontSize:10,
color:_styles.colors.font,
textAlign:'center',
paddingLeft:10,
paddingRight:10},

footerButtonContainer:{
flex:1,
flexDirection:'row',
justifyContent:'center',
alignItems:'stretch',
position:'absolute',
bottom:0,
left:0,
right:0},

button:{
flex:1,
justifyContent:'center',
height:52,
width:'50%'},

buttonText:{
color:_styles.colors.white,
textAlign:'center'}});



var componentWithMutation=(0,_reactApollo.graphql)(mutation)(MerchantDetails);exports.default=
(0,_reactRedux.connect)(mapStateToProps)(componentWithMutation);