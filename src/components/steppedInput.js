import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';

export default class SteppedInput extends Component {
  constructor(props) {
    super(props);
    this._onPressDecrement = this._onPressDecrement.bind(this);
    this._onPressIncrement = this._onPressIncrement.bind(this);
  }

  state = {
    amount: 30,
  };

  _onPressDecrement() {
    const amount = this.state.amount - 10;
    this.setState({amount});

  }

  _onPressIncrement() {
    const amount = this.state.amount + 10;
    this.setState({amount});
  }

  render() {
    return (
      <View style={styles.root}>
        <TextInput style={styles.currency} defaultValue="SGD"/>
        <TextInput style={styles.textInput} value={this.state.amount.toString()}/>
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
