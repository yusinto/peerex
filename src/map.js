import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import Button from 'react-native-button';
import MapView from 'react-native-maps'; // GOTCHA: had to install babel-plugin-module-resolver to solve a bug! https://github.com/airbnb/react-native-maps/issues/795

export default class Map extends Component {
  //http://stackoverflow.com/questions/42261011/react-navigation-switching-background-colors-and-styling-stacknavigator
  static navigationOptions = {
    title: 'How much do you need?',
    header: {
      visible: true,
      //left: null,  // TODO: replace this with hamburger slider menu
      style: {
        backgroundColor: '#21BE82'
      },
      titleStyle: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '300',
      },
      tintColor: '#FFFFFF',
    }
  };

  // TODO: https://gist.github.com/heron2014/e60fa003e9b117ce80d56bb1d5bfe9e0
  render() {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  }
});