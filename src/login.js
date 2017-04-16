import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import Button from 'react-native-button';

export default class Login extends Component {
  static navigationOptions = {
    title: 'Welcome',
    header: {
      visible: false,
    }
  };

  constructor(props) {
    super(props);
    this.onClickLogin = this.onClickLogin.bind(this);
  }

  onClickLogin() {
    // TODO: authentication

    // onsuccess of authentication, go to maps
    this.props.navigation.navigate('Map');
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../assets/images/logo-peerex.png')} style={styles.logoPeerex}/>
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
            secureTextEntry={true}
            placeholder="Password"
            onChangeText={(text) => this.setState({text})}
          />
        </View>
        <Button
          containerStyle={styles.loginButtonContainer}
          style={styles.loginButtonText}
          styleDisabled={{color: 'red'}}
          onPress={() => this.onClickLogin()}>
          Log In
        </Button>
        <Button style={styles.forgotPassword}>
          Oh, no! Forgot Password?
        </Button>
        <Text style={styles.noAccount}>
          Don't have a Peerex account?
        </Text>
        <Button
          containerStyle={styles.signUpButtonContainer}
          style={styles.signUpButtonText}
          styleDisabled={{color: 'red'}}
          onPress={() => this._handlePress()}>
          Sign Up
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