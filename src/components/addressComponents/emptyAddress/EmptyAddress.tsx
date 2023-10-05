import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import GenericText from '../../Generic/GenericText/GenericText';

interface IEmptyAddress {
  onPress: (event: GestureResponderEvent) => void;
}

/**
 * @author Meghraj Vilas Lot
 * @param {IEmptyAddress}
 * @description displayed if address is empty
 * @returns jsx for empty address component
 */
const EmptyAddress = ({onPress}: IEmptyAddress) => {
  return (
    <View style={styles.container}>
      <GenericText>Your Address List is Empty</GenericText>
      <GenericText>Please add a Address by clicking the + button.</GenericText>
      <Image
        source={require('../../../assets/images/address.jpg')}
        style={styles.imageStyle}
      />
    </View>
  );
};

export default EmptyAddress;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  imageStyle: {
    height: '70%',
    width: '70%',
    resizeMode: 'contain',
  },
});
