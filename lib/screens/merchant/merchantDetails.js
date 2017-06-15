Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');








var _reactNativeButton=require('react-native-button');var _reactNativeButton2=_interopRequireDefault(_reactNativeButton);
var _styles=require('../../styles');
var _FontAwesome=require('../../../node_modules/react-native-vector-icons/FontAwesome');var _FontAwesome2=_interopRequireDefault(_FontAwesome);
var _merchants=require('../../data/merchants.json');var _merchants2=_interopRequireDefault(_merchants);
var _reactRedux=require('react-redux');
var _constants=require('../../constants');



var _merchantDetailsActions=require('./merchantDetailsActions');
var _reactNativeAwesomeCardIo=require('react-native-awesome-card-io');
var _reactNativeCommunications=require('react-native-communications');var _reactNativeCommunications2=_interopRequireDefault(_reactNativeCommunications);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var mapStateToProps=function mapStateToProps(state){var
login=state.login,map=state.map,merchantDetails=state.merchantDetails;

return{
id:login.id,
email:login.email,
stripeCustomerId:login.stripeCustomerId,
sourceId:merchantDetails.sourceId,
brand:merchantDetails.brand,
last4:merchantDetails.last4,
withdrawAmount:map.withdrawAmount};

};var












MerchantDetails=function(_Component){_inherits(MerchantDetails,_Component);function MerchantDetails(){var _ref,_this2=this;var _temp,_this,_ret;_classCallCheck(this,MerchantDetails);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=MerchantDetails.__proto__||Object.getPrototypeOf(MerchantDetails)).call.apply(_ref,[this].concat(args))),_this),_this.













state={
isLoadingStripeSource:false},_this.






onPressBack=function(){
_this.props.navigation.goBack();
},_this.

addCard=function _callee(){var card,stripeSource;return regeneratorRuntime.async(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:_context.prev=0;_context.next=3;return regeneratorRuntime.awrap(

_reactNativeAwesomeCardIo.CardIOModule.scanCard({useCardIOLogo:true}));case 3:card=_context.sent;
console.log('card scanned: '+JSON.stringify(card));
_this.setState({isLoadingStripeSource:true});_context.next=8;return regeneratorRuntime.awrap(
_this.createStripeSource(card));case 8:stripeSource=_context.sent;
_this.props.updateMerchantDetailsAction(stripeSource);
_this.setState({isLoadingStripeSource:false});_context.next=16;break;case 13:_context.prev=13;_context.t0=_context['catch'](0);


console.log('error scanning card: '+JSON.stringify(_context.t0));case 16:case'end':return _context.stop();}}},null,_this2,[[0,13]]);},_this.



createStripeSource=function _callee2(_ref2){var cardNumber=_ref2.cardNumber,cvv=_ref2.cvv,expiryMonth=_ref2.expiryMonth,expiryYear=_ref2.expiryYear;var result,resultJson;return regeneratorRuntime.async(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:_context2.prev=0;


console.log('createStripeSource: email: '+_this.props.email+', stripeCustomerId: '+_this.props.stripeCustomerId+',\n      '+
cardNumber+' '+cvv+' '+expiryMonth+' '+expiryYear);_context2.next=4;return regeneratorRuntime.awrap(

fetch(_constants.LAMBDA_API+'/create-source',
{
method:'POST',
headers:{
'Accept':'application/json',
'Content-Type':'application/json'},

body:JSON.stringify({
cardNumber:cardNumber,
cvc:cvv,
expiryMonth:expiryMonth,
expiryYear:expiryYear,
email:_this.props.email,
stripeCustomerId:_this.props.stripeCustomerId})}));case 4:result=_context2.sent;_context2.next=7;return regeneratorRuntime.awrap(




result.json());case 7:resultJson=_context2.sent;
console.log('successfully created stripe source! '+JSON.stringify(resultJson));return _context2.abrupt('return',
resultJson);case 12:_context2.prev=12;_context2.t0=_context2['catch'](0);

console.log('failed to create stripe source: '+_context2.t0);case 15:case'end':return _context2.stop();}}},null,_this2,[[0,12]]);},_this.



getChargeToText=function(){
if(_this.state.isLoadingStripeSource){
return'loading...';
}

return _this.props.last4?'**** '+_this.props.last4:'add a card';
},_this.

onClickCallMerchant=function(phone){
_reactNativeCommunications2.default.phonecall(phone,true);
},_this.

onClickGetCashNow=function(){
alert('TODO: create new customer transaction request');
},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(MerchantDetails,[{key:'componentWillMount',value:function componentWillMount(){_reactNativeAwesomeCardIo.CardIOUtilities.preload();}},{key:'render',value:function render()

{var _this3=this;
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
_react2.default.createElement(_reactNative.Text,{style:styles.label},this.getChargeToText())))),



_react2.default.createElement(_reactNative.Text,{style:styles.footerText},'You will only be charged after you have picked up the cash from this merchant'),



_react2.default.createElement(_reactNative.View,{style:styles.footerButtonContainer},
_react2.default.createElement(_reactNativeButton2.default,{
containerStyle:[styles.button,{backgroundColor:_styles.colors.secondary}],
onPress:function onPress(){return _this3.onClickCallMerchant(merchant.phone);}},
_react2.default.createElement(_reactNative.Text,{style:styles.buttonText},'Call Merchant')),

_react2.default.createElement(_reactNativeButton2.default,{
containerStyle:[styles.button,{backgroundColor:_styles.colors.primary}],
onPress:this.onClickGetCashNow},
_react2.default.createElement(_reactNative.Text,{style:styles.buttonText},'Get Cash Now')))));




}}]);return MerchantDetails;}(_react.Component);MerchantDetails.navigationOptions=function(_ref3){var navigation=_ref3.navigation,screenProps=_ref3.screenProps;return{title:null,header:null};};MerchantDetails.propTypes={stripeCustomerId:_react.PropTypes.string.isRequired,id:_react.PropTypes.string.isRequired};


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
textAlign:'center'}});exports.default=




(0,_reactRedux.connect)(mapStateToProps,{updateMerchantDetailsAction:_merchantDetailsActions.updateMerchantDetails})(MerchantDetails);