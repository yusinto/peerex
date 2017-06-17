Object.defineProperty(exports,"__esModule",{value:true});var _extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source){if(Object.prototype.hasOwnProperty.call(source,key)){target[key]=source[key];}}}return target;};var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _templateObject=_taggedTemplateLiteral(['\n    mutation CreateTransaction($stripeSourceId: String!, $amount: Float!, $brand: String!, $last4: String!, $customerId: ID!) {\n        createTransaction(customerId: $customerId, stripeSourceId: $stripeSourceId, amount: $amount, brand: $brand, last4: $last4, pin: "xxx", status: Requested)\n        {\n            id\n            amount\n            customer {\n                id\n                email\n            }\n            pin\n            last4\n            brand\n            stripeSourceId\n            status\n        }\n    }\n'],['\n    mutation CreateTransaction($stripeSourceId: String!, $amount: Float!, $brand: String!, $last4: String!, $customerId: ID!) {\n        createTransaction(customerId: $customerId, stripeSourceId: $stripeSourceId, amount: $amount, brand: $brand, last4: $last4, pin: "xxx", status: Requested)\n        {\n            id\n            amount\n            customer {\n                id\n                email\n            }\n            pin\n            last4\n            brand\n            stripeSourceId\n            status\n        }\n    }\n']);var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');










var _reactNativeButton=require('react-native-button');var _reactNativeButton2=_interopRequireDefault(_reactNativeButton);
var _styles=require('../../styles');
var _FontAwesome=require('../../../node_modules/react-native-vector-icons/FontAwesome');var _FontAwesome2=_interopRequireDefault(_FontAwesome);
var _merchants=require('../../data/merchants.json');var _merchants2=_interopRequireDefault(_merchants);
var _reactRedux=require('react-redux');
var _constants=require('../../constants');
var _reactApollo=require('react-apollo');
var _graphqlTag=require('graphql-tag');var _graphqlTag2=_interopRequireDefault(_graphqlTag);
var _reactNativeAwesomeCardIo=require('react-native-awesome-card-io');
var _reactNativeCommunications=require('react-native-communications');var _reactNativeCommunications2=_interopRequireDefault(_reactNativeCommunications);
var _reactNativeSmartLoadingSpinnerOverlay=require('react-native-smart-loading-spinner-overlay');var _reactNativeSmartLoadingSpinnerOverlay2=_interopRequireDefault(_reactNativeSmartLoadingSpinnerOverlay);
var _stripeLogic=require('../../logic/stripeLogic');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}function _taggedTemplateLiteral(strings,raw){return Object.freeze(Object.defineProperties(strings,{raw:{value:Object.freeze(raw)}}));}

var mapStateToProps=function mapStateToProps(state){var
login=state.login,map=state.map;

return{
id:login.id,
email:login.email,
stripeCustomerId:login.stripeCustomerId,
sources:login.sources,
withdrawAmount:map.withdrawAmount};

};

var mutation=(0,_graphqlTag2.default)(_templateObject);var


















MerchantDetails=function(_Component){_inherits(MerchantDetails,_Component);function MerchantDetails(){var _ref,_this2=this;var _temp,_this,_ret;_classCallCheck(this,MerchantDetails);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=MerchantDetails.__proto__||Object.getPrototypeOf(MerchantDetails)).call.apply(_ref,[this].concat(args))),_this),_this.













state={
selectCardModalVisible:false,
isLoading:false,
transactionId:'',
pin:'',
sourceId:'',
brand:'',
last4:''},_this.

















onPressBack=function(){
_this.props.navigation.goBack();
},_this.

onPressChargeTo=function _callee(){return regeneratorRuntime.async(function _callee$(_context){while(1){switch(_context.prev=_context.next){case 0:if(!

_this.state.sourceId){_context.next=4;break;}
_this.setState({selectCardModalVisible:true});_context.next=6;break;case 4:_context.next=6;return regeneratorRuntime.awrap(

_this.addCard());case 6:case'end':return _context.stop();}}},null,_this2);},_this.



addCard=function _callee2(){var card,stripeSource;return regeneratorRuntime.async(function _callee2$(_context2){while(1){switch(_context2.prev=_context2.next){case 0:_context2.prev=0;_context2.next=3;return regeneratorRuntime.awrap(

_reactNativeAwesomeCardIo.CardIOModule.scanCard({useCardIOLogo:true}));case 3:card=_context2.sent;
console.log('card scanned: '+JSON.stringify(card));

_this._modalLoadingSpinnerOverLay.show();_context2.next=8;return regeneratorRuntime.awrap(
(0,_stripeLogic.createStripeSource)(card));case 8:stripeSource=_context2.sent;


_this.setState(_extends({},stripeSource));_context2.next=15;break;case 12:_context2.prev=12;_context2.t0=_context2['catch'](0);


console.log('error scanning card: '+JSON.stringify(_context2.t0));case 15:


_this._modalLoadingSpinnerOverLay.hide();case 16:case'end':return _context2.stop();}}},null,_this2,[[0,12]]);},_this.


getChargeToText=function(){
return _this.state.last4?'**** '+_this.state.last4:'add a card';
},_this.

onPressCallMerchant=function(phone){
_reactNativeCommunications2.default.phonecall(phone,true);
},_this.

onPressGetCashNow=function _callee3(){var transaction,_transaction$data$cre,transactionId,pin;return regeneratorRuntime.async(function _callee3$(_context3){while(1){switch(_context3.prev=_context3.next){case 0:if(
_this.state.sourceId){_context3.next=3;break;}
_reactNative.Alert.alert('Select a card','You need to select a card first before you can request for cash');return _context3.abrupt('return');case 3:_context3.prev=3;




_this._modalLoadingSpinnerOverLay.show();_context3.next=7;return regeneratorRuntime.awrap(
_this.props.mutate({
variables:{
customerId:_this.props.id,
stripeSourceId:_this.state.sourceId,
amount:_this.props.withdrawAmount,
brand:_this.state.brand,
last4:_this.state.last4}}));case 7:transaction=_context3.sent;


console.log('Successfully created transaction: '+JSON.stringify(transaction));_transaction$data$cre=
transaction.data.createTransaction,transactionId=_transaction$data$cre.id,pin=_transaction$data$cre.pin;
_this.setState({transactionId:transactionId,pin:pin});_context3.next=16;break;case 13:_context3.prev=13;_context3.t0=_context3['catch'](3);


console.log('Error creating transaction: '+JSON.stringify(_context3.t0));case 16:


_this._modalLoadingSpinnerOverLay.hide();case 17:case'end':return _context3.stop();}}},null,_this2,[[3,13]]);},_this.


onPressCancelRequest=function(){
alert('todo: cancel request');
},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(MerchantDetails,[{key:'componentWillMount',value:function componentWillMount(){_reactNativeAwesomeCardIo.CardIOUtilities.preload();var existingTransaction=this.props.navigation.state.params.transaction;if(existingTransaction){this.setState(_extends({},existingTransaction));}else{if(this.props.sources.length>0){var defaultCard=this.props.sources[0];this.setState(_extends({},defaultCard));}}}},{key:'render',value:function render()

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


this.state.transactionId?
_react2.default.createElement(_reactNative.View,{style:styles.transactionIdPin},
_react2.default.createElement(_reactNative.Text,{style:styles.referenceNumberLabel},'PIN'),
_react2.default.createElement(_reactNative.Text,{style:styles.referenceNumber},this.state.pin)):
null,

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

_react2.default.createElement(_reactNative.TouchableOpacity,{onPress:this.onPressChargeTo},
_react2.default.createElement(_reactNative.View,{style:styles.summaryItemContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.label},'Charge to'),
_react2.default.createElement(_reactNative.Text,{style:styles.label},this.getChargeToText())))),



_react2.default.createElement(_reactNative.Text,{style:styles.footerText},'You will only be charged after you have picked up the cash from this merchant'),



_react2.default.createElement(_reactNative.View,{style:styles.footerButtonContainer},
_react2.default.createElement(_reactNativeButton2.default,{
containerStyle:[styles.button,{backgroundColor:_styles.colors.secondary}],
onPress:function onPress(){return _this3.onPressCallMerchant(merchant.phone);}},
_react2.default.createElement(_reactNative.Text,{style:styles.buttonText},'Call Merchant')),

this.state.transactionId?
_react2.default.createElement(_reactNativeButton2.default,{
containerStyle:[styles.button,{
backgroundColor:_styles.colors.white}],

onPress:this.onPressCancelRequest},
_react2.default.createElement(_reactNative.Text,{style:[styles.buttonText,{color:_styles.colors.font}]},'Cancel Request')):


_react2.default.createElement(_reactNativeButton2.default,{
containerStyle:[styles.button,{backgroundColor:_styles.colors.primary}],
onPress:this.onPressGetCashNow},
_react2.default.createElement(_reactNative.Text,{style:styles.buttonText},'Get Cash Now'))),



_react2.default.createElement(_reactNativeSmartLoadingSpinnerOverlay2.default,{
ref:function ref(component){return _this3._modalLoadingSpinnerOverLay=component;}}),
_react2.default.createElement(_reactNative.Modal,{
animationType:"slide",
transparent:false,
visible:this.state.selectCardModalVisible,
onRequestClose:function onRequestClose(){alert("Modal has been closed.");}},

_react2.default.createElement(_reactNative.FlatList,{
style:styles.merchantTilesContainer,
data:this.props.sources,
ref:function ref(_ref3){return _this3.flatList=_ref3;},
renderItem:function renderItem(_ref2){var item=_ref2.item,index=_ref2.index;return _react2.default.createElement(_reactNative.Text,null,item.last4);}}))));




}}]);return MerchantDetails;}(_react.Component);MerchantDetails.navigationOptions=function(_ref4){var navigation=_ref4.navigation,screenProps=_ref4.screenProps;return{title:null,header:null};};MerchantDetails.propTypes={mutate:_react.PropTypes.func.isRequired,stripeCustomerId:_react.PropTypes.string.isRequired,id:_react.PropTypes.string.isRequired};


var styles=_reactNative.StyleSheet.create({
referenceNumber:{
marginTop:5,
marginLeft:16,
fontSize:14,
color:_styles.colors.white},

referenceNumberLabel:{
fontSize:11,
marginTop:13,
marginLeft:16,
color:_styles.colors.white},

transactionIdPin:{
marginTop:8,
height:60,
width:'100%',
backgroundColor:_styles.colors.primary},

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
marginBottom:8,
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