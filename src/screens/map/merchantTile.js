import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
} from 'react-native';
import {colors} from '../../styles';

export default MerchantTile = ({merchant, isSelected}) => {
  return (
    <View style={isSelected ? styles.rootSelected : styles.root}>
      <Text style={styles.merchantTileTitle}>{merchant.title}</Text>
      <Image style={styles.merchantImage}
             source={{uri: merchant.imageUrl}}/>
      <Text style={styles.merchantTileFooter}>100m away</Text>
    </View>
  );
};

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
    backgroundColor: colors.white,
    height: '100%',
    width: 200,
    borderRadius: 2,
    borderTopWidth: 3,
    borderTopColor: colors.primary,
    shadowColor: colors.black,
    shadowOffset: {
      width: 1.2,
      height: 3
    },
    shadowRadius: 2,
    shadowOpacity: 0.4
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
