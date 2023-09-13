import {StyleSheet, Text, TextStyle, View} from 'react-native';
import React from 'react';
import GenericText from '../GenericText/GenericText';
import {colors} from '../../../assets/colors';

// type ITitle = {
//   //   fontSize: number;
//   fontSize?: TextStyle | undefined;
// };

const Title = () => {
  return (
    <View style={styles.titleStyle}>
      <GenericText textType="bold" style={styles.titleStyleFirstHalf}>
        Neo
      </GenericText>
      <GenericText textType="bold" style={styles.titleStyleSecondHalf}>
        STORE
      </GenericText>
    </View>
  );
};

export default Title;

const styles = StyleSheet.create({
  titleStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  titleStyleFirstHalf: {
    color: colors.MIDNIGHT,
    fontSize: 35,
  },
  titleStyleSecondHalf: {
    color: colors.VIVID_GAMBOGE,
    fontSize: 35,
  },
});
