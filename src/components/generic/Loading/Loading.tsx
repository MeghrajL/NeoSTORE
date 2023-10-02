import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';

/**
 * @author Meghraj Vilas Lot
 * @returns loader gif for screens
 */

const Loading = () => {
  return (
    <View style={styles.container}>
      <LottieView
        style={styles.imageStyle}
        source={require('../../../assets/gif/hammer2.json')}
        autoPlay
        loop
      />
    </View>
  );
};

export default Loading;

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
  },
});
