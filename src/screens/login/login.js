import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import Button from 'react-native-button';
import {LoginButton, AccessToken, LoginManager} from 'react-native-fbsdk';
import FontAwesomeIcon from '../../../node_modules/react-native-vector-icons/FontAwesome';
import {colors} from './../../styles';

// GoogleSignin
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

export default class Login extends Component {
  static navigationOptions = {
    title: 'Welcome',
    header: null,
  };

  constructor(props) {
    super(props);
    this.onClickFBLogin = this.onClickFBLogin.bind(this);
    this.onClickCreateAccount = this.onClickCreateAccount.bind(this);
    //GoogleSignin
    this.onClickGoogleLogin = this.onClickGoogleLogin.bind(this);

  }

  //for GoogleSignin
  componentDidMount() {
    this._setupGoogleSignin();
  }

  onClickFBLogin() {
    LoginManager.logInWithReadPermissions(['email', 'public_profile']).then(
      result => {
        if (result.isCancelled) {
          alert('FB login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            //alert(`FB login success! ${data.accessToken.toString()}`);
            this.props.navigation.navigate('Map');
          });
        }
      },
      error => alert(`FB login error: ${error}`)
    );
  }

  // for setting up of GoogleSignin
  async _setupGoogleSignin() {
    try {
      await GoogleSignin.hasPlayServices({ autoResolve: true }); // for android, always true for iOS
      await GoogleSignin.configure({
        iosClientId: '887069304838-jd9tbd6rlrrgk03tkjvemmffdjifsodh.apps.googleusercontent.com',
        //webClientId: '887069304838-tcgm31avgod3pgigi9qrfjnaugssj2bq.apps.googleusercontent.com',
        // offlineAccess: false
      });

      //to get user if already logged in, null if not signed in
      const user = await GoogleSignin.currentUserAsync();
      console.log(user);
      this.setState({user});
    }
    catch(err) {
      console.log("Google signin error", err.code, err.message);
    }
  }

    onClickGoogleLogin() {

      //if there's no user logged in, Prompt the browser to direct to Google Signin screen
      if (!this.state.user) {

        GoogleSignin.signIn()
        //if googlesignin is succcessful then do this
        .then((user) => {
          console.log(user);
          this.setState({user: user});
          this.props.navigation.navigate('Map');
        })
        .catch((err) => {
          console.log('WRONG SIGNIN', err);
        })
        //when done button is clicked in googlesignin browser, do this
        .done();
      }
     // if user is logged in already, show this
     if (this.state.user) {
            this.props.navigation.navigate('Map');
      }
    }
  // end of GoogleSignin


  onClickCreateAccount() {
    // TODO: create account
    alert('TODO: create account');
  }

  render() {
    return (
      <View style={styles.container}>
        <Image source={require('../../../assets/images/logo-peerex.png')} style={styles.logoPeerex}/>
        <Text style={styles.welcome}>
          Welcome to Peerex
        </Text>
        <Button
          containerStyle={styles.loginButton}
          styleDisabled={{color: 'red'}}
          onPress={this.onClickFBLogin}>
          <View style={styles.fbLogoContainer}>
            <FontAwesomeIcon style={styles.fbLogo} name="facebook" size={20} color="#FFFFFF"/>
            <Text style={styles.continueWithFbText}>Continue with Facebook</Text>
          </View>
        </Button>
        <Button
          containerStyle={styles.loginButton}
          styleDisabled={{color: 'red'}}
          onPress={this.onClickGoogleLogin}>
          <View style={styles.fbLogoContainer}>
            <FontAwesomeIcon style={styles.fbLogo} name="google" size={20} color="#FFFFFF"/>
            <Text style={styles.continueWithFbText}>Continue with Google</Text>
          </View>
        </Button>
        <Button
          containerStyle={styles.signUpButtonContainer}
          style={styles.signUpButtonText}
          styleDisabled={{color: 'red'}}
          onPress={this.onClickCreateAccount}>
          Create Account
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
  fbLogoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fbLogo: {
    position: 'absolute',
    left: 20,
  },
  continueWithFbText: {
    fontSize: 14,
    color: colors.white,
    //fontFamily: Montserrat,
  },
  welcome: {
    marginTop: 17,
    marginBottom: 49,
    color: colors.primaryLight,
    //fontFamily: 'Montserrat', // TODO: fix fonts
    fontSize: 18,
  },
  textInputContainer: {
    marginTop: 20,
    height: 42,
    width: '90%',
    borderBottomColor: colors.primary,
    borderBottomWidth: 1,
  },
  textInput: {
    height: 42,
    paddingLeft: 10,
    paddingRight: 10,
  },
  loginButton: {
    marginTop: 20,
    height: 40,
    width: '90%',
    backgroundColor: colors.primary,
    borderRadius: 4,
    overflow: 'hidden',
  },
  forgotPassword: {
    marginTop: 27,
    fontSize: 12,
    fontWeight: '500',
    color: colors.font,
  },
  noAccount: {
    marginTop: 61,
    fontSize: 12,
    fontWeight: '300',
    color: colors.font,
  },
  signUpButtonContainer: {
    marginTop: 15,
    height: 40,
    width: '90%',
    borderRadius: 4,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.font,
  },
  signUpButtonText: {
    fontSize: 14,
    color: colors.font,
    //fontFamily: Montserrat,
    marginTop: 11,
    textAlign: 'center'
  },
});
