import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {colors} from '../../../assets/colors';
import GenericText from '../GenericText/GenericText';
import {TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

/**
 * @author Meghraj Vilas Lot
 * @description displayed if any error occurs
 * @returns jsx for error component
 */

const ErrorScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageStyle}
        source={require('../../../assets/images/wrong.png')}
      />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <GenericText style={styles.textStyle}>Go Back</GenericText>
      </TouchableOpacity>
    </View>
  );
};

export default ErrorScreen;

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
