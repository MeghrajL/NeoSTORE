import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import GenericText from '../../generic/genericText/GenericText';

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
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <GenericText>Your Address List is Empty</GenericText>
      <GenericText>
        Please add a Address by clicking anywhere or + button.
      </GenericText>
      <Image
        source={require('../../../assets/images/address.jpg')}
        style={styles.imageStyle}
      />
    </TouchableOpacity>
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
