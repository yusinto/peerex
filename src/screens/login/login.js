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
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {updateLogin} from './loginActions';
import { connect } from 'react-redux';

const mutation = gql`
  mutation UpdateCustomer($id: ID!, $email: String!, $loginToken: String!, $loginType: CUSTOMER_LOGIN_TYPE!) {
    updateCustomer(id: $id, email: $email, loginToken: $loginToken, loginType: $loginType) {
      id
      stripeCustomerId
      email
      loginToken
      loginType
    }
  }
`;

const mapStateToProps = (state) => {
  const {login} = state;
  return {
    email: login.email,
    loginType: login.loginType,
    loginToken: login.loginToken,
    stripeCustomerId: login.stripeCustomerId,
  };
};

class Login extends Component {
  static navigationOptions = {
    title: 'Welcome',
    header: null,
  };

  static propTypes = {
    mutate: PropTypes.func.isRequired,
    data: PropTypes.shape({
      loading: PropTypes.bool,
      error: PropTypes.object,
      allCustomers: PropTypes.array,
    }),
  };

  constructor(props) {
    super(props);
    this.onClickFBLogin = this.onClickFBLogin.bind(this);
    this.onClickCreateAccount = this.onClickCreateAccount.bind(this);
  }

  onClickFBLogin() {
    LoginManager.logInWithReadPermissions(['email', 'public_profile']).then(
      result => {
        if (result.isCancelled) {
          console.log('FB login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const loginToken = data.accessToken.toString();
            console.log(`FB login success! ${loginToken}, email: ${data.email}`);
            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: data.accessToken,
                parameters: {
                  fields: {
                    string: 'email,name,first_name,middle_name,last_name'
                  }
                }
              },
              (error, result) => this.onFBGraphRequestEnded(error, result, loginToken)
            );

            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      error => alert(`FB login error: ${error}`)
    );
  }

  onFBGraphRequestEnded = async (error, result, loginToken) => {
    if (error) {
      console.log(`onFBGraphRequestEnded Error fetching data: ${error.toString()}`);
    } else {
      console.log(`onFBGraphRequestEnded Success fetching data: ${JSON.stringify(result)}`);

      this.updateCustomer({
        email: result.email,
        loginType: 'Facebook',
        loginToken,
      });
    }
  };

  updateCustomer = async (updateObject) => {
    console.log(`updateCustomer mutation: ${JSON.stringify(updateObject)}`);

    const customer = await this.props.mutate({
      variables: {
        ...updateObject,
        id: 'dummyId',
      }
    });

    if (customer) {
      const {stripeCustomerId} = customer;
      console.log(`successfully created/updated customer! stripeId: ${stripeCustomerId}`);
      this.props.updateLoginAction(customer);
      this.props.navigation.navigate('Map');
    } else {
      console.log(`failed to create/update customer! customer: ${JSON.stringify(customer)}`);
    }
  };

  onClickCreateAccount() {
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

const componentWithMutation = graphql(mutation)(Login);
export default connect(mapStateToProps, {updateLoginAction: updateLogin})(componentWithMutation);
