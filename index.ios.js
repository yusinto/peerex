/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import {AppRegistry} from 'react-native';
import {StackNavigator} from 'react-navigation'; // GOTCHA: v1.0.0beta is broken, so we have to use a custom commit for now https://github.com/react-community/react-navigation/issues/923
import Login from './src/screens/login/login';
import Map from './src/screens/map/map';
import Merchant from './src/screens/merchant/merchantDetails';

const Peerex = StackNavigator(
  {
    Login: {screen: Login},
    Map: {screen: Map},
    Merchant: {screen: Merchant},
  },
  {
    headerMode: 'screen', // This is IMPORTANT to turn header on and off per screen!!!!
  });

AppRegistry.registerComponent('peerex', () => Peerex);
