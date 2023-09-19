import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GenericText from '../../generic/GenericText/GenericText';
const EmptyCart = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require('../../../assets/images/cart.jpg')}
      />
      <GenericText>Your Cart is Empty</GenericText>
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
    resizeMode: 'center',
  },
});
