Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNative=require('react-native');







var _reactNativeButton=require('react-native-button');var _reactNativeButton2=_interopRequireDefault(_reactNativeButton);
var _reactNativeMaps=require('react-native-maps');var _reactNativeMaps2=_interopRequireDefault(_reactNativeMaps);
var _steppedInput=require('./../../components/steppedInput');var _steppedInput2=_interopRequireDefault(_steppedInput);
var _googlePlaces=require('./googlePlaces');var _googlePlaces2=_interopRequireDefault(_googlePlaces);
var _styles=require('./../../styles');
var _merchantTile=require('./merchantTile');var _merchantTile2=_interopRequireDefault(_merchantTile);
var _merchants=require('../../data/merchants.json');var _merchants2=_interopRequireDefault(_merchants);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}

var marker=require('../../../assets/images/map-marker.png');
var selectedMarker=require('../../../assets/images/map-marker-selected.png');var

Map=function(_Component){_inherits(Map,_Component);














function Map(props){_classCallCheck(this,Map);var _this=_possibleConstructorReturn(this,(Map.__proto__||Object.getPrototypeOf(Map)).call(this,
props));_this.







state={
initialPosition:{
latitude:1.286288,
longitude:103.850218,
accuracy:32},

lastPosition:{
latitude:0,
longitude:0,
accuracy:0},

selectedMerchantIndex:0};_this.























































renderSeparator=function(){
return _react2.default.createElement(_reactNative.View,{style:styles.merchantTileSeparator});
};_this.























onPressFlatListItem=function(index){

_this.props.navigation.navigate('Merchant',{index:index});



};_this.regionFrom=_this.regionFrom.bind(_this);_this.onPressMarker=_this.onPressMarker.bind(_this);_this.renderMerchantTile=_this.renderMerchantTile.bind(_this);_this.markers=[];return _this;}_createClass(Map,[{key:'componentDidMount',value:function componentDidMount(){var _this2=this;navigator.geolocation.getCurrentPosition(function(position){var coords=position.coords;_this2.setState({initialPosition:{latitude:coords.latitude,longitude:coords.longitude,accuracy:coords.accuracy}});},function(error){return alert(JSON.stringify(error));},{enableHighAccuracy:true,timeout:20000,maximumAge:1000});this.watchID=navigator.geolocation.watchPosition(function(position){var coords=position.coords;_this2.setState({lastPosition:{latitude:coords.latitude,longitude:coords.longitude,accuracy:coords.accuracy}});});}},{key:'componentWillUnmount',value:function componentWillUnmount(){navigator.geolocation.clearWatch(this.watchID);}},{key:'regionFrom',value:function regionFrom(lat,lon,accuracy){var oneDegreeOfLongitudeInMeters=111.32*1000;var circumference=40075/360*1000;var accuracyZoomedOut=accuracy*40;var latDelta=accuracyZoomedOut*(1/(Math.cos(lat)*circumference));var lonDelta=accuracyZoomedOut/oneDegreeOfLongitudeInMeters;return{latitude:lat,longitude:lon,latitudeDelta:Math.max(0,latDelta),longitudeDelta:Math.max(0,lonDelta)};}},{key:'renderMerchantTile',value:function renderMerchantTile(merchant,index){var selectedMerchant=_merchants2.default[this.state.selectedMerchantIndex];return _react2.default.createElement(_merchantTile2.default,{onPress:this.onPressFlatListItem,merchant:merchant,merchantIndex:index,isSelected:selectedMerchant.key===merchant.key});}},{key:'onPressMarker',value:function onPressMarker(e,index){this.setState({selectedMerchantIndex:index});this.flatList.scrollToIndex({viewPosition:0.5,index:index});}},{key:'render',value:function render()

{var _this3=this;var _state$initialPositio=
this.state.initialPosition,longitude=_state$initialPositio.longitude,latitude=_state$initialPositio.latitude,accuracy=_state$initialPositio.accuracy;
var initialRegion=this.regionFrom(latitude,longitude,accuracy);

return(
_react2.default.createElement(_reactNative.View,{style:styles.root},
_react2.default.createElement(_steppedInput2.default,null),
_react2.default.createElement(_googlePlaces2.default,null),

longitude!==0&&latitude!==0&&
_react2.default.createElement(_reactNativeMaps2.default,{
ref:function ref(_ref4){return _this3.map=_ref4;},
style:styles.map,
showsUserLocation:true,
initialRegion:initialRegion},

_merchants2.default.map(function(m,i){return(
_react2.default.createElement(_reactNativeMaps2.default.Marker,{
coordinate:m.latLong,
title:m.title,
description:m.description,
key:'marker-'+i,
ref:function ref(_ref){return _this3.markers[i]=_ref;},
onPress:function onPress(e){return _this3.onPressMarker(e,i);},
image:_this3.state.selectedMerchantIndex===i?selectedMarker:marker}));}),



_react2.default.createElement(_reactNative.FlatList,{
horizontal:true,
style:styles.merchantTilesContainer,
data:_merchants2.default,
ItemSeparatorComponent:this.renderSeparator,
extraData:this.state,
ref:function ref(_ref3){return _this3.flatList=_ref3;},
renderItem:function renderItem(_ref2){var item=_ref2.item,index=_ref2.index;return _this3.renderMerchantTile(item,index);}}))));





}}]);return Map;}(_react.Component);Map.navigationOptions={title:'How much do you need?',headerStyle:{backgroundColor:_styles.colors.primary},headerTitleStyle:{color:_styles.colors.white,fontSize:16,fontWeight:'300'}};exports.default=Map;


var styles=_reactNative.StyleSheet.create({
root:{
flex:1,
justifyContent:'flex-start',
alignItems:'center',
backgroundColor:_styles.colors.primary,
width:'100%'},

merchantTileSeparator:{
width:15},

merchantTilesContainer:{
position:'absolute',
bottom:10,
left:15,
height:160,
width:'100%',
paddingBottom:10},

map:{
position:'absolute',
top:90,
left:0,
right:0,
bottom:0},

marker:{
height:14,
width:9.5}});