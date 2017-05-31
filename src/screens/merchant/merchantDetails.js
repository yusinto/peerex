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
import { StripeAddCard } from 'react-native-checkout'

const mapStateToProps = (state) => {
  return {
    withdrawAmount: state.map.withdrawAmount,
  };
};

class MerchantDetails extends Component {
  static navigationOptions = ({ navigation, screenProps }) => {
    return {
      title: null,
      header: null,
    };
  };

  state = {
    modalVisible: false,
    cardToken: null,
  };

  onPressBack = () => {
    this.props.navigation.goBack();
  };

  addCard = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };

  onAddCardSuccessful = (token) => {
    console.log(`onAddCardSuccessful token: ${token}`);
    //TODO: save credit card token to graphcool against customer's login
    this.setState({
      modalVisible: false,
      cardToken: token,
    });
  };

  onClickGetCashNow = () => {
    alert('todo');
  };

  render() {
    const merchant = MERCHANTS[this.props.navigation.state.params.index];
    //const merchant = MERCHANTS[0];
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
              {
                this.state.cardToken ?
                  <Text style={styles.label}></Text>
                  :
                  <Text style={styles.label}>add a card</Text>
              }
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
            onPress={this.onClickCallMerchant}>
            <Text style={styles.buttonText}>Call Merchant</Text>
          </Button>
          <Button
            containerStyle={[styles.button, {backgroundColor: colors.primary}]}
            onPress={this.onClickGetCashNow}>
            <Text style={styles.buttonText}>Get Cash Now</Text>
          </Button>
        </View>
        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
          <StripeAddCard
            publicStripeKey="pk_test_BxQnxB54Ie3wLNhJYHkbzt2J"
            addCardTokenHandler={this.onAddCardSuccessful}
            styles={{
               addCardContainer: {
                flex: 1,
                justifyContent: 'center',
                backgroundColor: '#F2F2F5',
              },
            }}
            activityIndicatorColor="pink"
            addCardButtonText="Add Card"
            scanCardButtonText="Scan Card"
            scanCardAfterScanButtonText="Scan Card Again"
          />
        </Modal>
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

export default connect(mapStateToProps)(MerchantDetails);
