import React from 'react';
import {AppRegistry} from 'react-native';
import {StackNavigator} from 'react-navigation';
import createStore from './src/redux/store';
import {Provider} from 'react-redux';

import Login from './src/screens/login/login';
import Map from './src/screens/map/map';
import Merchant from './src/screens/merchant/merchantDetails';

const store = createStore();
const Navigator = StackNavigator(
  {
    Login: {screen: Login},
    Map: {screen: Map},
    Merchant: {screen: Merchant},
  },
  {
    headerMode: 'screen',
  }
);
const Peerex = () => <Provider store={store}><Navigator/></Provider>;
AppRegistry.registerComponent('peerex', () => Peerex);
