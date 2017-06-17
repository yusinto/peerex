import React, {PropTypes, Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Icon,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import Button from 'react-native-button';
import {colors} from '../../styles';
import FontAwesomeIcon from '../../../node_modules/react-native-vector-icons/FontAwesome';
import MERCHANTS from '../../data/merchants.json';
import {connect} from 'react-redux';
import {PeerexFeeInt} from '../../constants';
import {graphql} from 'react-apollo'
import gql from 'graphql-tag';
import {CardIOModule, CardIOUtilities} from 'react-native-awesome-card-io';
import Communications from 'react-native-communications';
import LoadingSpinnerOverlay from 'react-native-smart-loading-spinner-overlay';
import {createStripeSource} from '../../logic/stripeLogic';
import {SelectPayment} from 'react-native-checkout';

const mapStateToProps = (state) => {
  const {login, map} = state;

  return {
    id: login.id,
    email: login.email,
    stripeCustomerId: login.stripeCustomerId,
    sources: login.sources,
    withdrawAmount: map.withdrawAmount
  };
};

const mutation = gql`
    mutation CreateTransaction($stripeSourceId: String!, $amount: Float!, $brand: String!, $last4: String!, $customerId: ID!) {
        createTransaction(customerId: $customerId, stripeSourceId: $stripeSourceId, amount: $amount, brand: $brand, last4: $last4, pin: "xxx", status: Requested)
        {
            id
            amount
            customer {
                id
                email
            }
            pin
            last4
            brand
            stripeSourceId
            status
        }
    }
`;

class MerchantDetails extends Component {
  static navigationOptions = ({navigation, screenProps}) => {
    return {
      title: null,
      header: null,
    };
  };

  static propTypes = {
    mutate: PropTypes.func.isRequired,
    stripeCustomerId: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  };

  state = {
    selectCardModalVisible: false,
    isLoading: false,
    transactionId: '',
    pin: '',
    sourceId: '',
    brand: '',
    last4: '',
  };

  componentWillMount() {
    CardIOUtilities.preload();

    const existingTransaction = this.props.navigation.state.params.transaction;

    if (existingTransaction) {
      this.setState({...existingTransaction});
    } else { // fresh transaction
      if (this.props.sources.length > 0) { // set card to default card if there is one
        const defaultCard = this.props.sources[0];
        this.setState({...defaultCard});
      }
    }
  }

  onPressBack = () => {
    this.props.navigation.goBack();
  };

  onPressChargeTo = async () => {
    // if default card exists, show list of available cards
    if (this.state.sourceId) {
      this.setState({selectCardModalVisible: true});
    } else {
      await this.addCard();
    }
  };

  addCard = async () => {
    try {
      const card = await CardIOModule.scanCard({useCardIOLogo: true});
      console.log(`card scanned: ${JSON.stringify(card)}`);

      this._modalLoadingSpinnerOverLay.show();
      const stripeSource = await createStripeSource(card);

      // TODO: re-get stripe customer here so global sources get updated
      this.setState({...stripeSource});
    }
    catch (err) {
      console.log(`error scanning card: ${JSON.stringify(err)}`);
    }

    this._modalLoadingSpinnerOverLay.hide();
  };

  getChargeToText = () => {
    return this.state.last4 ? `**** ${this.state.last4}` : 'add a card';
  };

  onPressCallMerchant = phone => {
    Communications.phonecall(phone, true);
  };

  onPressGetCashNow = async () => {
    if (!this.state.sourceId) {
      Alert.alert('Select a card', 'You need to select a card first before you can request for cash');
      return;
    }

    try {
      this._modalLoadingSpinnerOverLay.show();
      const transaction = await this.props.mutate({
        variables: {
          customerId: this.props.id,
          stripeSourceId: this.state.sourceId,
          amount: this.props.withdrawAmount,
          brand: this.state.brand,
          last4: this.state.last4,
        }
      });
      console.log(`Successfully created transaction: ${JSON.stringify(transaction)}`);
      const {id: transactionId, pin} = transaction.data.createTransaction;
      this.setState({transactionId, pin});
    }
    catch (err) {
      console.log(`Error creating transaction: ${JSON.stringify(err)}`);
    }

    this._modalLoadingSpinnerOverLay.hide();
  };

  onPressCancelRequest = () => {
    alert('todo: cancel request');
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
        {
          this.state.transactionId ?
            <View style={styles.transactionIdPin}>
              <Text style={styles.referenceNumberLabel}>PIN</Text>
              <Text style={styles.referenceNumber}>{this.state.pin}</Text>
            </View> : null
        }
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
          <TouchableOpacity onPress={this.onPressChargeTo}>
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
            onPress={() => this.onPressCallMerchant(merchant.phone)}>
            <Text style={styles.buttonText}>Call Merchant</Text>
          </Button>
          { this.state.transactionId ?
            <Button
              containerStyle={[styles.button, {
                backgroundColor: colors.white,
              }]}
              onPress={this.onPressCancelRequest}>
              <Text style={[styles.buttonText, {color: colors.font}]}>Cancel Request</Text>
            </Button>
            :
            <Button
              containerStyle={[styles.button, {backgroundColor: colors.primary}]}
              onPress={this.onPressGetCashNow}>
              <Text style={styles.buttonText}>Get Cash Now</Text>
            </Button>
          }
        </View>
        <LoadingSpinnerOverlay
          ref={ component => this._modalLoadingSpinnerOverLay = component }/>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.selectCardModalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
          <SelectPayment
            paymentSources={this.props.sources}
            addCardHandler={() => console.log('Add Card Pressed!')}
            selectPaymentHandler={(paymentSource) => console.log(paymentSource)}
          />
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  referenceNumber: {
    marginTop: 5,
    marginLeft: 16,
    fontSize: 14,
    color: colors.white,
  },
  referenceNumberLabel: {
    fontSize: 11,
    marginTop: 13,
    marginLeft: 16,
    color: colors.white,
  },
  transactionIdPin: {
    marginTop: 8,
    height: 60,
    width: '100%',
    backgroundColor: colors.primary,
  },
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
    marginBottom: 8,
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

const componentWithMutation = graphql(mutation)(MerchantDetails);
export default connect(mapStateToProps)(componentWithMutation);
