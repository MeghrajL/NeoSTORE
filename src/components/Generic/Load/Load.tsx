import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import {colors} from '../../../assets/colors';

/**
 * @author Meghraj Vilas Lot
 * @returns load button gif
 */

const Load = () => {
  return (
    <View style={styles.ButtonStyle}>
      <LottieView
        style={styles.imageStyle}
        source={require('../../../assets/gif/load2.json')}
        autoPlay
        loop
      />
    </View>
  );
};

export default Load;

const styles = StyleSheet.create({
  imageStyle: {
    height: '100%',
    width: '100%',
  },
  ButtonStyle: {
    backgroundColor: colors.VIVID_GAMBOGE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    minHeight: 30,
    minWidth: 50,
    maxHeight: 60,
    maxWidth: 400,
    height: 50,
    width: '100%',
  },
});