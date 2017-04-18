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
import SteppedInput from './components/steppedInput';

export default class Map extends Component {
  //http://stackoverflow.com/questions/42261011/react-navigation-switching-background-colors-and-styling-stacknavigator
  static navigationOptions = {
    title: 'How much do you need?',
    header: {
      visible: true,
      //left: null,  // TODO: replace this with hamburger slider menu
      style: {
        backgroundColor: '#21BE82',
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
      <View style={styles.root}>
        <SteppedInput />
        <View style={styles.textInputContainer}>
          <TextInput style={styles.locationTextInput} placeholder="location"/>
        </View>
        <MapView
          style={styles.map}
          showsUserLocation={true}
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
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#21BE82',
    width: '100%',
  },
  textInputContainer: {
    width: '88%',
  },
  amountRequestedTextInput: {
    marginTop: 10,
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
  },
  locationTextInput: {
    marginTop: 10,
    height: 42,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#00A76D',
    borderRadius: 4,
  },
  map: {
    position: 'absolute',
    top: 115,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
