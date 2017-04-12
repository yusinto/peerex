/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import Button from 'react-native-button';

export default class Peerex extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image source={require('./assets/images/logo-peerex.png')} style={styles.logoPeerex}/>
        <Text style={styles.welcome}>
          Welcome to Peerex
        </Text>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Email"
            onChangeText={(text) => this.setState({text})}
          />
        </View>
        <View style={styles.textInputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Password"
            onChangeText={(text) => this.setState({text})}
          />
        </View>
        <Button
          containerStyle={styles.buttonContainer}
          style={styles.buttonText}
          styleDisabled={{color: 'red'}}
          onPress={() => this._handlePress()}>
          Log In
        </Button>
      </View>
    );
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
    marginTop: 17,
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
  buttonContainer: {
    marginTop: 20,
    height: 40,
    width: '90%',
    backgroundColor: '#21BE82',
    borderRadius: 4,
    overflow: 'hidden',
  },
  buttonText: {
    fontSize: 14,
    color: '#FFFFFF',
    //fontFamily: Montserrat,
    marginTop: 11,
    textAlign: 'center'
  }
});

AppRegistry.registerComponent('peerex', () => Peerex);
