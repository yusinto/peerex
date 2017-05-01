Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');






var _FontAwesome=require('react-native-vector-icons/FontAwesome');var _FontAwesome2=_interopRequireDefault(_FontAwesome);
var _constants=require('../constants');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}var

SteppedInput=function(_Component){_inherits(SteppedInput,_Component);
function SteppedInput(props){_classCallCheck(this,SteppedInput);var _this=_possibleConstructorReturn(this,(SteppedInput.__proto__||Object.getPrototypeOf(SteppedInput)).call(this,
props));_this.




state={
amount:_constants.DefaultWithdrawAmount};_this._onPressDecrement=_this._onPressDecrement.bind(_this);_this._onPressIncrement=_this._onPressIncrement.bind(_this);return _this;}_createClass(SteppedInput,[{key:'_onPressDecrement',value:function _onPressDecrement()


{
if(this.state.amount>_constants.MinWithdrawAmount){
var amount=this.state.amount-10;
this.setState({amount:amount});
}
}},{key:'_onPressIncrement',value:function _onPressIncrement()

{
if(this.state.amount<_constants.MaxWithdrawAmount){
var amount=this.state.amount+10;
this.setState({amount:amount});
}
}},{key:'render',value:function render()

{
return(
_react2.default.createElement(_reactNative.View,{style:styles.root},
_react2.default.createElement(_reactNative.TextInput,{style:styles.currency,defaultValue:'SGD'}),
_react2.default.createElement(_reactNative.TextInput,{style:styles.textInput,value:this.state.amount.toString()}),
_react2.default.createElement(_reactNative.View,{style:styles.plusMinusContainer},
_react2.default.createElement(_reactNative.TouchableOpacity,{
onPress:this._onPressDecrement,
style:styles.plusMinus},
_react2.default.createElement(_FontAwesome2.default,{style:{textAlign:'right'},name:'minus',size:20,color:'#D3BCC0'})),

_react2.default.createElement(_reactNative.Text,{style:styles.verticalBar},'|'),
_react2.default.createElement(_reactNative.TouchableOpacity,{
onPress:this._onPressIncrement,
style:styles.plusMinus},
_react2.default.createElement(_FontAwesome2.default,{style:{textAlign:'left'},name:'plus',size:20,color:'#D3BCC0'})))));




}}]);return SteppedInput;}(_react.Component);exports.default=SteppedInput;


var styles=_reactNative.StyleSheet.create({
root:{
flexDirection:'row',
alignItems:'center',
justifyContent:'center',
height:34,
width:'88%',
borderRadius:4,
backgroundColor:'#fff'},

currency:{
flex:2,
color:'#21BE82',
paddingLeft:10,
fontWeight:'300',
fontSize:14},

textInput:{
flex:5,
color:'#383838',
fontWeight:'500',
fontSize:20},

plusMinusContainer:{
flex:2,
flexDirection:'row',
justifyContent:'center',
alignItems:'center'},

plusMinus:{
flex:1},

verticalBar:{
flex:1,
fontSize:30,
color:'#D3BCC0',
textAlign:'center'}});