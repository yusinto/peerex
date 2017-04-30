Object.defineProperty(exports,"__esModule",{value:true});var _react=require('react');var _react2=_interopRequireDefault(_react);
var _reactNativeGooglePlacesAutocomplete=require('react-native-google-places-autocomplete');
var _constants=require('../../constants');
var _styles=require('../../styles');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}exports.default=

GooglePlaces=function GooglePlaces(){
return(
_react2.default.createElement(_reactNativeGooglePlacesAutocomplete.GooglePlacesAutocomplete,{
placeholder:'Nearby',
minLength:2,
autoFocus:false,
listViewDisplayed:'auto',
fetchDetails:true,
renderDescription:function renderDescription(row){return row.description;},
onPress:function onPress(data){var details=arguments.length>1&&arguments[1]!==undefined?arguments[1]:null;
console.log(data);
console.log(details);
},
getDefaultValue:function getDefaultValue(){
return'';
},
query:{

key:_constants.GooglePlacesKey,
language:'en'},

styles:styles,
currentLocation:true,
currentLocationLabel:'Current location',
nearbyPlacesAPI:'GooglePlacesSearch',









debounce:200}));


};


var styles={
container:{
width:'92.5%'},

textInputContainer:{
backgroundColor:'rgba(0,0,0,0)',
borderTopWidth:0,
borderBottomWidth:0},

textInput:{
height:34,
color:_styles.colors.white,
fontSize:16,
backgroundColor:_styles.colors.primaryDark},

predefinedPlacesDescription:{
color:'#1faadb'},

row:{},

description:{
color:_styles.colors.white},

separator:{
color:_styles.colors.white}};