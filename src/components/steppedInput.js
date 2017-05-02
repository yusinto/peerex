import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import {DefaultWithdrawAmount, MinWithdrawAmount, MaxWithdrawAmount} from '../constants';
import {updateMap} from '../screens/map/mapActions';
import { connect } from 'react-redux';

const mapStateToProps = (state) => {
  return {
    withdrawAmount: state.map.withdrawAmount,
  };
};

class SteppedInput extends Component {
  constructor(props) {
    super(props);
    this._onPressDecrement = this._onPressDecrement.bind(this);
    this._onPressIncrement = this._onPressIncrement.bind(this);
  }

  _onPressDecrement() {
    if (this.props.withdrawAmount > MinWithdrawAmount) {
      const withdrawAmount = this.props.withdrawAmount - 10;
      this.props.updateMapAction({withdrawAmount});
    }
  }

  _onPressIncrement() {
    if(this.props.withdrawAmount < MaxWithdrawAmount) {
      const withdrawAmount = this.props.withdrawAmount + 10;
      this.props.updateMapAction({withdrawAmount});
    }
  }

  render() {
    return (
      <View style={styles.root}>
        <Text style={styles.currency}>SGD</Text>
        <Text style={styles.textInput}>{this.props.withdrawAmount.toString()}</Text>
        <View style={styles.plusMinusContainer}>
          <TouchableOpacity
            onPress={this._onPressDecrement}
            style={styles.plusMinus}>
            <FontAwesomeIcon style={{textAlign: 'right'}} name="minus" size={20} color="#D3BCC0"/>
          </TouchableOpacity>
          <Text style={styles.verticalBar}>|</Text>
          <TouchableOpacity
            onPress={this._onPressIncrement}
            style={styles.plusMinus}>
            <FontAwesomeIcon style={{textAlign: 'left'}} name="plus" size={20} color="#D3BCC0"/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    height: 34,
    width: '88%',
    borderRadius: 4,
    backgroundColor: '#fff',
  },
  currency: {
    flex: 2,
    color: '#21BE82',
    paddingLeft: 10,
    fontWeight: '300',
    fontSize: 14,
  },
  textInput: {
    flex: 5,
    color: '#383838',
    fontWeight: '500',
    fontSize: 20,
  },
  plusMinusContainer: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  plusMinus: {
    flex: 1,
  },
  verticalBar: {
    flex: 1,
    fontSize: 30,
    color: '#D3BCC0',
    textAlign: 'center',
  },
});

export default connect(mapStateToProps, {updateMapAction: updateMap})(SteppedInput);
