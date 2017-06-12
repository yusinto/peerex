import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
} from 'react-native';
import Button from 'react-native-button';
import {LoginButton, AccessToken, LoginManager, GraphRequest, GraphRequestManager} from 'react-native-fbsdk';
import FontAwesomeIcon from '../../../node_modules/react-native-vector-icons/FontAwesome';
import {colors} from './../../styles';
import {updateLogin} from './loginActions';
import { connect } from 'react-redux';
import {LAMBDA_API} from '../../constants';
import {getFacebookEmail} from '../../logic/facebookLogic';
import LoadingSpinnerOverlay from 'react-native-smart-loading-spinner-overlay';

const mapStateToProps = (state) => {
  const {login} = state;
  return {
    email: login.email,
    loginType: login.loginType,
    stripeCustomerId: login.stripeCustomerId,
  };
};

class Login extends Component {
  static navigationOptions = {
    title: 'Welcome',
    header: null,
  };

  componentDidMount() {
    this.getFacebookEmailWithLoader();
  }

  getFacebookEmailWithLoader = async () => {
    this._modalLoadingSpinnerOverLay.show();

    // GOTCHA: Graph request is fucked. We have to use a callback to get the graph response
    // which means the actual email is not returned from this async method but
    // is returned to the callback passed. getFacebookEmail returns the facebook login token
    // if there's one. Otherwise it will be null which means the user has to sign in.
    const token = await getFacebookEmail((err, result) => {
      if (err) {
        console.log(`Error fetching facebook user data: ${JSON.stringify(err)}`);
      } else {
        console.log(`Success fetching facebook user data: ${JSON.stringify(result)}`);
        this.getCustomer({
          email: result.email,
          loginType: 'Facebook',
        });
      }
    });

    if (!token) {
      this._modalLoadingSpinnerOverLay.hide();
    }
  };

  onClickFBLogin = async () => {
    let loginResult;
    try {
      loginResult = await LoginManager.logInWithReadPermissions(['email', 'public_profile']);
    }
    catch (err) {
      console.log(`FB login error: ${JSON.stringify(err)}`);
      return;
    }

    if (loginResult.isCancelled) {
      console.log('FB login cancelled');
    } else {
      this.getFacebookEmailWithLoader();
    }
  };

  getCustomer = async ({email, loginType}) => {
    try {
      const result = await fetch(`${LAMBDA_API}/create-or-update-customer`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({email, loginType}),
        }
      );
      let resultJson = await result.json();

      console.log(`successfully created/updated customer! ${JSON.stringify(resultJson)}`);
      this.props.updateLoginAction(resultJson);
      this._modalLoadingSpinnerOverLay.hide();
      this.props.navigation.navigate('Map');
    } catch (e) {
      console.log(`failed to create/update customer! customer: ${email}, ${loginType}`);
    }
  };

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
        <LoadingSpinnerOverlay
          ref={ component => this._modalLoadingSpinnerOverLay = component }/>
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

export default connect(mapStateToProps, {updateLoginAction: updateLogin})(Login);
