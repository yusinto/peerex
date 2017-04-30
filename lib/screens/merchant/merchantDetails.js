Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');







var _reactNativeButton=require('react-native-button');var _reactNativeButton2=_interopRequireDefault(_reactNativeButton);
var _styles=require('../../styles');
var _FontAwesome=require('../../../node_modules/react-native-vector-icons/FontAwesome');var _FontAwesome2=_interopRequireDefault(_FontAwesome);
var _merchants=require('../../data/merchants.json');var _merchants2=_interopRequireDefault(_merchants);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var






MerchantDetails=function(_Component){_inherits(MerchantDetails,_Component);function MerchantDetails(){_classCallCheck(this,MerchantDetails);return _possibleConstructorReturn(this,(MerchantDetails.__proto__||Object.getPrototypeOf(MerchantDetails)).apply(this,arguments));}_createClass(MerchantDetails,[{key:'render',value:function render()


























{

console.log('navigation: '+JSON.stringify(this.props.navigation));

var merchant=_merchants2.default[0];

return(
_react2.default.createElement(_reactNative.View,{style:styles.root},
_react2.default.createElement(_reactNative.Image,{style:styles.merchantImage,source:{uri:merchant.imageUrl}}),
_react2.default.createElement(_reactNative.View,{style:styles.merchantDetailsContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.merchantTitle},merchant.title),
_react2.default.createElement(_reactNative.Text,{style:styles.merchantAddress},merchant.description)),

_react2.default.createElement(_reactNative.View,{style:styles.requestSummaryContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.summary},'Summary'),
_react2.default.createElement(_reactNative.View,{style:styles.summaryItemContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.requestedCash},'Requested Cash'),
_react2.default.createElement(_reactNative.Text,{style:styles.requestedAmount},'SGD 30.00')),

_react2.default.createElement(_reactNative.View,{style:styles.summaryItemContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.label},'Service Fee'),
_react2.default.createElement(_reactNative.Text,{style:styles.amount},'SGD 2.10')),

_react2.default.createElement(_reactNative.View,{style:styles.summaryItemContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.label},'Total Payment'),
_react2.default.createElement(_reactNative.Text,{style:styles.amount},'SGD 32.10')),

_react2.default.createElement(_reactNative.View,{style:styles.summaryItemContainer},
_react2.default.createElement(_reactNative.Text,{style:styles.label},'Charged to'),
_react2.default.createElement(_reactNative.Text,{style:styles.amount},'****8884'))),


_react2.default.createElement(_reactNative.Text,{style:styles.footerText},'You will only be charged after you have picked up the cash from this merchant'),



_react2.default.createElement(_reactNative.View,{style:styles.footerButtonContainer},
_react2.default.createElement(_reactNativeButton2.default,{
containerStyle:[styles.button,{backgroundColor:_styles.colors.secondary}],
onPress:this.onClickCallMerchant},
_react2.default.createElement(_reactNative.Text,{style:styles.buttonText},'Call Merchant')),

_react2.default.createElement(_reactNativeButton2.default,{
containerStyle:[styles.button,{backgroundColor:_styles.colors.primary}],
onPress:this.onClickGetCashNow},
_react2.default.createElement(_reactNative.Text,{style:styles.buttonText},'Get Cash Now')))));




}}]);return MerchantDetails;}(_react.Component);MerchantDetails.navigationOptions=function(_ref){var navigation=_ref.navigation,screenProps=_ref.screenProps;return{title:'How much do you need?',header:{visible:true,style:{backgroundColor:_styles.colors.primary},titleStyle:{color:_styles.colors.white,fontSize:16,fontWeight:'300'},tintColor:_styles.colors.white}};};exports.default=MerchantDetails;


var styles=_reactNative.StyleSheet.create({
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