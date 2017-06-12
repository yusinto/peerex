import React from 'react';
import {AppRegistry} from 'react-native';
import {StackNavigator} from 'react-navigation';
import createStore from './src/redux/store';
import {Provider} from 'react-redux';

import Login from './src/screens/login/login';
import Map from './src/screens/map/map';
import Merchant from './src/screens/merchant/merchantDetails';
import ApolloClient, {createNetworkInterface} from 'apollo-client';
import {ApolloProvider} from 'react-apollo';
import {GRAPH_COOL} from './src/constants';

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

const client = new ApolloClient({
  networkInterface: createNetworkInterface({
    uri: GRAPH_COOL,
  }),
});

const Peerex = () =>
  <ApolloProvider client={client}>
    <Provider store={store}>
      <Navigator/>
    </Provider>
  </ApolloProvider>;

AppRegistry.registerComponent('peerex', () => Peerex);
