import React, {PropTypes, Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Icon,
  Modal,
} from 'react-native';
import Button from 'react-native-button';
import {colors} from '../../styles';
import FontAwesomeIcon from '../../../node_modules/react-native-vector-icons/FontAwesome';
import MERCHANTS from '../../data/merchants.json';
import { connect } from 'react-redux';
import {PeerexFeeInt} from '../../constants';
//import { graphql } from 'react-apollo'
import gql from 'graphql-tag'
import {LAMBDA_API} from '../../constants';
import {updateMerchantDetails} from './merchantDetailsActions';
import { CardIOModule, CardIOUtilities } from 'react-native-awesome-card-io';
import Communications from 'react-native-communications';

const mapStateToProps = (state) => {
  const {login, map, merchantDetails} = state;

  return {
    id: login.id,
    email: login.email,
    stripeCustomerId: login.stripeCustomerId,
    sourceId: merchantDetails.sourceId,
    brand: merchantDetails.brand,
    last4: merchantDetails.last4,
    withdrawAmount: map.withdrawAmount,
  };
};

//const mutation = gql`
//    mutation UpdateCustomer($id: ID!, $email: String!, $loginType: CUSTOMER_LOGIN_TYPE!) {
//        updateCustomer(id: $id, email: $email, loginType: $loginType) {
//            id
//            stripeCustomerId
//            email
//            loginType
//        }
//    }
//`;

class MerchantDetails extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: null,
      header: null,
    };
  };

  static propTypes = {
    //mutate: PropTypes.func.isRequired,
    stripeCustomerId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  };

  state = {
    isLoadingStripeSource: false,
  };

  componentWillMount() {
    CardIOUtilities.preload();
  }

  onPressBack = () => {
    this.props.navigation.goBack();
  };

  addCard = async () => {
    try {
      const card = await CardIOModule.scanCard({useCardIOLogo: true});
      console.log(`card scanned: ${JSON.stringify(card)}`);
      this.setState({isLoadingStripeSource: true});
      const stripeSource = await this.createStripeSource(card);
      this.props.updateMerchantDetailsAction(stripeSource);
      this.setState({isLoadingStripeSource: false});
    }
    catch (err) {
      console.log(`error scanning card: ${JSON.stringify(err)}`);
    }
  };

  createStripeSource = async ({cardNumber, cvv, expiryMonth, expiryYear}) => {
    try {
      //const {stripeCustomerId, email, cardNumber, cvc, expiryMonth, expiryYear} = event;
      console.log(`createStripeSource: email: ${this.props.email}, stripeCustomerId: ${this.props.stripeCustomerId},
      ${cardNumber} ${cvv} ${expiryMonth} ${expiryYear}`);

      const result = await fetch(`${LAMBDA_API}/create-source`,
        {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            cardNumber,
            cvc: cvv,
            expiryMonth,
            expiryYear,
            email: this.props.email,
            stripeCustomerId: this.props.stripeCustomerId,
          }),
        }
      );

      let resultJson = await result.json();
      console.log(`successfully created stripe source! ${JSON.stringify(resultJson)}`);
      return resultJson;
    } catch (err) {
      console.log(`failed to create stripe source: ${err}`);
    }
  };

  getChargeToText = () => {
    if (this.state.isLoadingStripeSource) {
      return 'loading...';
    }

    return this.props.last4 ? `**** ${this.props.last4}` : 'add a card';
  };

  onClickCallMerchant = phone => {
    Communications.phonecall(phone, true);
  };

  onClickGetCashNow = () => {
    alert('TODO: create new customer transaction request');
  };

  render() {
    const merchant = MERCHANTS[this.props.navigation.state.params.index];
    const {withdrawAmount} = this.props;
    const serviceFee = withdrawAmount * (PeerexFeeInt / 100);
    const total = serviceFee + withdrawAmount;

    return (
      <View style={styles.root}>
        <Image style={styles.merchantImage} source={{uri: merchant.imageUrl}}/>
        <TouchableOpacity style={styles.backContainer} onPress={this.onPressBack}>
          <FontAwesomeIcon name="chevron-left" size={28} color="#FFFFFF"/>
        </TouchableOpacity>
        <View style={styles.merchantDetailsContainer}>
          <Text style={styles.merchantTitle}>{merchant.title}</Text>
          <Text style={styles.merchantAddress}>{merchant.description}</Text>
        </View>
        <View style={styles.requestSummaryContainer}>
          <Text style={styles.summary}>Summary</Text>
          <View style={styles.summaryItemContainer}>
            <Text style={styles.requestedCash}>Requested Cash</Text>
            <Text style={styles.requestedAmount}>SGD {this.props.withdrawAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryItemContainer}>
            <Text style={styles.label}>Service Fee</Text>
            <Text style={styles.amount}>SGD {serviceFee.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryItemContainer}>
            <Text style={styles.label}>Total Payment</Text>
            <Text style={styles.amount}>SGD {total.toFixed(2)}</Text>
          </View>
          <TouchableOpacity onPress={this.addCard}>
            <View style={styles.summaryItemContainer}>
              <Text style={styles.label}>Charge to</Text>
              <Text style={styles.label}>{this.getChargeToText()}</Text>
            </View>
          </TouchableOpacity>
        </View>
        <Text style={styles.footerText}>
          You will only be charged after you have picked up
          the cash from this merchant
        </Text>
        <View style={styles.footerButtonContainer}>
          <Button
            containerStyle={[styles.button, {backgroundColor: colors.secondary}]}
            onPress={() => this.onClickCallMerchant(merchant.phone)}>
            <Text style={styles.buttonText}>Call Merchant</Text>
          </Button>
          <Button
            containerStyle={[styles.button, {backgroundColor: colors.primary}]}
            onPress={this.onClickGetCashNow}>
            <Text style={styles.buttonText}>Get Cash Now</Text>
          </Button>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addCardModal: {
    top: 50,
  },
  backContainer: {
    position: 'absolute',
    top: 30,
    left: 22,
    backgroundColor: 'transparent',
  },
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.background,
    width: '100%',
  },
  merchantImage: {
    height: 150,
    width: '100%',
    alignSelf: 'center',
    marginTop: 0,
  },
  merchantDetailsContainer: {
    height: 100,
    width: '100%',
    backgroundColor: colors.white,
    padding: 25,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  merchantTitle: {
    fontSize: 18,
    color: colors.font,
  },
  merchantAddress: {
    marginTop: 10,
    fontSize: 12,
    color: colors.secondaryFont,
  },
  requestSummaryContainer: {
    marginTop: 8,
    height: 210,
    width: '100%',
    backgroundColor: colors.white,
    padding: 25,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  summary: {
    fontSize: 10,
    color: colors.font,
    marginBottom: 5,
  },
  summaryItemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 36,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  requestedCash: {
    fontSize: 14,
    color: colors.font,
  },
  requestedAmount: {
    fontSize: 18,
    color: colors.primaryDark,
  },
  label: {
    fontSize: 12,
    color: colors.tertiaryFont,
  },
  amount: {
    fontSize: 12,
    color: colors.font,
  },
  footerText: {
    marginTop: 10,
    fontSize: 10,
    color: colors.font,
    textAlign: 'center',
    paddingLeft: 10,
    paddingRight: 10,
  },
  footerButtonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'stretch',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    height: 52,
    width: '50%',
  },
  buttonText: {
    color: colors.white,
    textAlign: 'center',
  },
});

//const componentWithMutation = graphql(mutation)(MerchantDetails);
export default connect(mapStateToProps, {updateMerchantDetailsAction: updateMerchantDetails})(MerchantDetails);
