import React, {PropTypes, Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Icon,
} from 'react-native';
import {colors} from '../../styles';
import FontAwesomeIcon from '../../../node_modules/react-native-vector-icons/FontAwesome';
import MERCHANTS from '../../data/merchants.json';

const BackNavigation = (props) =>
  <TouchableOpacity onPress={() => props.goBack()}>
    <FontAwesomeIcon style={{position: 'absolute', left: 13}} name="chevron-left" size={20} color="#FFFFFF"/>
  </TouchableOpacity>;

export default class MerchantDetails extends Component {
  static navigationOptions = ({ navigation }) => {
    const {state, setParams} = navigation;
    const isInfo = state.params.mode === 'info';
    const {user} = state.params;

    return {
      title: '',
      headerBackTitle: null,
      //header: {
      //  visible: true,
      //  //left: null,
      //  style: {
      //    backgroundColor: colors.primary,
      //  },
      //  titleStyle: {
      //    color: colors.white,
      //    fontSize: 16,
      //    fontWeight: '300',
      //  },
      //  tintColor: colors.white,
      //}
    }
  };

  render() {
    //TODO: params doesn't work!
    console.log(`navigation: ${JSON.stringify(this.props.navigation)}`);
    //const merchant = MERCHANTS[this.props.navigation.state.params.index];
    const merchant = MERCHANTS[0];

    return (
      <View style={styles.root}>
        <Text>{merchant.key}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: colors.primary,
    width: '100%',
  },
  fbLogo: {
    position: 'absolute',
    left: 20,
  },
});
