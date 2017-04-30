Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');







var _styles=require('../../styles');
var _FontAwesome=require('../../../node_modules/react-native-vector-icons/FontAwesome');var _FontAwesome2=_interopRequireDefault(_FontAwesome);
var _merchants=require('../../data/merchants.json');var _merchants2=_interopRequireDefault(_merchants);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var






MerchantDetails=function(_Component){_inherits(MerchantDetails,_Component);function MerchantDetails(){_classCallCheck(this,MerchantDetails);return _possibleConstructorReturn(this,(MerchantDetails.__proto__||Object.getPrototypeOf(MerchantDetails)).apply(this,arguments));}_createClass(MerchantDetails,[{key:'render',value:function render()























{

console.log('navigation: '+JSON.stringify(this.props.navigation));

var merchant=_merchants2.default[0];

return(
_react2.default.createElement(_reactNative.View,{style:styles.root},
_react2.default.createElement(_reactNative.Text,null,'what? ',merchant.key)));


}}]);return MerchantDetails;}(_react.Component);MerchantDetails.navigationOptions=function(_ref){var navigation=_ref.navigation,screenProps=_ref.screenProps;var state=navigation.state,setParams=navigation.setParams;return{title:'',header:{visible:false,left:null,style:{backgroundColor:_styles.colors.primary},titleStyle:{color:_styles.colors.white,fontSize:16,fontWeight:'300'},tintColor:_styles.colors.white}};};exports.default=MerchantDetails;


var styles=_reactNative.StyleSheet.create({
root:{
flex:1,
justifyContent:'flex-start',
alignItems:'center',
backgroundColor:_styles.colors.primary,
width:'100%'},

fbLogo:{
position:'absolute',
left:20}});