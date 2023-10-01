import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GenericText from '../GenericText/GenericText';
import {colors} from '../../../assets/colors';
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
    height: '70%',
    width: '70%',
    resizeMode: 'center',
  },
  textStyle: {
    fontSize: 20,
    color: colors.MIDNIGHT,
  },
});
