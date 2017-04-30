import React, {PropTypes, Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Icon,
} from 'react-native';
import Button from 'react-native-button';
import {colors} from '../../styles';
import FontAwesomeIcon from '../../../node_modules/react-native-vector-icons/FontAwesome';
import MERCHANTS from '../../data/merchants.json';

//const BackNavigation = (props) =>
//  <TouchableOpacity onPress={() => props.goBack()}>
//    <FontAwesomeIcon style={{position: 'absolute', left: 13}} name="chevron-left" size={20} color="#FFFFFF"/>
//  </TouchableOpacity>;

export default class MerchantDetails extends Component {
  static navigationOptions = {
    title: '',
    header: {
      visible: false,
    },
  };

  render() {
    //TODO: params doesn't work!
    console.log(`navigation: ${JSON.stringify(this.props.navigation)}`);
    //const merchant = MERCHANTS[this.props.navigation.state.params.index];
    const merchant = MERCHANTS[0];

    return (
      <View style={styles.root}>
        <Image style={styles.merchantImage} source={{uri: merchant.imageUrl}}/>
        <View style={styles.merchantDetailsContainer}>
          <Text style={styles.merchantTitle}>{merchant.title}</Text>
          <Text style={styles.merchantAddress}>{merchant.description}</Text>
        </View>
        <View style={styles.requestSummaryContainer}>
          <Text style={styles.summary}>Summary</Text>
          <View style={styles.summaryItemContainer}>
            <Text style={styles.requestedCash}>Requested Cash</Text>
            <Text style={styles.requestedAmount}>SGD 30.00</Text>
          </View>
          <View style={styles.summaryItemContainer}>
            <Text style={styles.label}>Service Fee</Text>
            <Text style={styles.amount}>SGD 2.10</Text>
          </View>
          <View style={styles.summaryItemContainer}>
            <Text style={styles.label}>Total Payment</Text>
            <Text style={styles.amount}>SGD 32.10</Text>
          </View>
          <View style={styles.summaryItemContainer}>
            <Text style={styles.label}>Charged to</Text>
            <Text style={styles.amount}>****8884</Text>
          </View>
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
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
