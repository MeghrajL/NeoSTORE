import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GenericText from '../genericText/GenericText';
import {colors} from '../../../assets/colors';

/**
 * @author Meghraj Vilas Lot
 * @returns nothing img component
 */

const Nothing = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require('../../../assets/images/nothing.png')}
      />
      <GenericText style={styles.textStyle}>Nothing to see here.</GenericText>
    </View>
  );
};

export default Nothing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageStyle: {
    height: '60%',
    width: '70%',
    resizeMode: 'contain',
  },
  textStyle: {
    fontSize: 20,
    color: colors.MIDNIGHT,
  },
});
