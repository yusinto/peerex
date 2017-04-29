import React, {PropTypes, PureComponent} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';
import {colors} from '../../styles';

export default class MerchantTile extends PureComponent {
  static propTypes = {
    merchant: PropTypes.object.isRequired,
    merchantIndex: PropTypes.number.isRequired,
    isSelected: PropTypes.bool.isRequired,
    onPress: PropTypes.func,
  };

  onPress = () => {
    this.props.onPress(this.props.merchantIndex);
  };

  render() {
    const {merchant} = this.props;
    const rootStyle = this.props.isSelected ? [styles.root, styles.rootSelected] : styles.root;

    return (
      <TouchableOpacity style={rootStyle} onPress={this.onPress}>
        <Text style={styles.merchantTileTitle}>{merchant.title}</Text>
        <Image style={styles.merchantImage}
               source={{uri: merchant.imageUrl}}/>
        <Text style={styles.merchantTileFooter}>100m away</Text>
      </TouchableOpacity>
    );
  };
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.white,
    height: '100%',
    width: 200,
    borderRadius: 2,
    shadowColor: colors.black,
    shadowOffset: {
      width: 1.2,
      height: 3
    },
    shadowRadius: 2,
    shadowOpacity: 0.7
  },
  rootSelected: {
    borderTopWidth: 3,
    borderTopColor: colors.primary,
  },
  merchantTileTitle: {
    marginTop: 10,
    marginLeft: 10,
    fontSize: 13,
    color: colors.font,
    fontWeight: '500',
  },
  merchantImage: {
    height: 80,
    width: 180,
    alignSelf: 'center',
    marginTop: 10,
  },
  merchantTileFooter: {
    marginTop: 6,
    marginLeft: 10,
    fontSize: 11,
    color: colors.font,
  },
});
