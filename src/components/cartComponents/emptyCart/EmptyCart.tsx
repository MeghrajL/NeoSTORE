import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../../assets/colors';
import GenericText from '../../generic/genericText/GenericText';
const EmptyCart = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require('../../../assets/images/cart.jpg')}
      />
      <GenericText style={styles.textStyle}>Your Cart is Empty.</GenericText>
    </View>
  );
};

export default EmptyCart;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageStyle: {
    height: '70%',
    width: '70%',
    resizeMode: 'contain',
  },
  textStyle: {
    fontSize: 20,
    color: colors.MIDNIGHT,
  },
});
