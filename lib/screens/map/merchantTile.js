Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');






var _styles=require('../../styles');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

MerchantTile=function(_PureComponent){_inherits(MerchantTile,_PureComponent);function MerchantTile(){var _ref;var _temp,_this,_ret;_classCallCheck(this,MerchantTile);for(var _len=arguments.length,args=Array(_len),_key=0;_key<_len;_key++){args[_key]=arguments[_key];}return _ret=(_temp=(_this=_possibleConstructorReturn(this,(_ref=MerchantTile.__proto__||Object.getPrototypeOf(MerchantTile)).call.apply(_ref,[this].concat(args))),_this),_this.







onPress=function(){
_this.props.onPress(_this.props.merchantIndex);
},_temp),_possibleConstructorReturn(_this,_ret);}_createClass(MerchantTile,[{key:'render',value:function render()

{var
merchant=this.props.merchant;
var rootStyle=this.props.isSelected?[styles.root,styles.rootSelected]:styles.root;

return(
_react2.default.createElement(_reactNative.TouchableOpacity,{style:rootStyle,onPress:this.onPress},
_react2.default.createElement(_reactNative.Text,{style:styles.merchantTileTitle},merchant.title),
_react2.default.createElement(_reactNative.Image,{style:styles.merchantImage,
source:{uri:merchant.imageUrl}}),
_react2.default.createElement(_reactNative.Text,{style:styles.merchantTileFooter},'100m away')));


}}]);return MerchantTile;}(_react.PureComponent);MerchantTile.propTypes={merchant:_react.PropTypes.object.isRequired,merchantIndex:_react.PropTypes.number.isRequired,isSelected:_react.PropTypes.bool.isRequired,onPress:_react.PropTypes.func};exports.default=MerchantTile;


var styles=_reactNative.StyleSheet.create({
root:{
backgroundColor:_styles.colors.white,
height:'100%',
width:200,
borderRadius:2,
shadowColor:_styles.colors.black,
shadowOffset:{
width:1.2,
height:3},

shadowRadius:2,
shadowOpacity:0.7},

rootSelected:{
borderTopWidth:3,
borderTopColor:_styles.colors.primary},

merchantTileTitle:{
marginTop:10,
marginLeft:10,
fontSize:13,
color:_styles.colors.font,
fontWeight:'500'},

merchantImage:{
height:80,
width:180,
alignSelf:'center',
marginTop:10},

merchantTileFooter:{
marginTop:6,
marginLeft:10,
fontSize:11,
color:_styles.colors.font}});