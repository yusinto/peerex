import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import Button from 'react-native-button';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'; // GOTCHA: had to install babel-plugin-module-resolver to solve a bug! https://github.com/airbnb/react-native-maps/issues/795

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
    //return (
    //  <MapView
    //    provider={PROVIDER_GOOGLE}
    //    initialRegion={{
    //      latitude: 37.78825,
    //      longitude: -122.4324,
    //      latitudeDelta: 0.0922,
    //      longitudeDelta: 0.0421,
    //    }}
    //  />
    //);
    return null;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',

  },
  logoPeerex: {
    marginTop: 68,
  },
  welcome: {
    marginTop: 87,
    marginBottom: 9,
    color: '#00A66C',
    //fontFamily: 'Montserrat', // TODO: fix fonts
    fontSize: 18,
  },
  textInputContainer: {
    marginTop: 20,
    height: 42,
    width: '90%',
    borderBottomColor: '#21BE82',
    borderBottomWidth: 1,
  },
  textInput: {
    height: 42,
    paddingLeft: 10,
    paddingRight: 10,
  },
  loginButtonContainer: {
    marginTop: 20,
    height: 40,
    width: '90%',
    backgroundColor: '#21BE82',
    borderRadius: 4,
    overflow: 'hidden',
  },
  loginButtonText: {
    fontSize: 14,
    color: '#FFFFFF',
    //fontFamily: Montserrat,
    marginTop: 11,
    textAlign: 'center'
  },
  forgotPassword: {
    marginTop: 27,
    fontSize: 12,
    fontWeight: '500',
    color: '#383838',
  },
  noAccount: {
    marginTop: 61,
    fontSize: 12,
    fontWeight: '300',
    color: '#383838',
  },
  signUpButtonContainer: {
    marginTop: 15,
    height: 40,
    width: '90%',
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#383838',
  },
  signUpButtonText: {
    fontSize: 14,
    color: '#383838',
    //fontFamily: Montserrat,
    marginTop: 11,
    textAlign: 'center'
  },
});