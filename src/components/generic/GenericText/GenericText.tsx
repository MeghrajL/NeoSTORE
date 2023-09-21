import {StyleSheet, Text, TextStyle, View} from 'react-native';
import React from 'react';

interface IGenericText {
  children: string | number | undefined;
  textType?: 'regular' | 'bold' | 'light' | 'medium' | 'heavy';
  style?: TextStyle | TextStyle[];
  props?: TextStyle | TextStyle[];
  numberOfLines?: number;
}

const GenericText = ({
  children,
  textType,
  style,
  props,
  numberOfLines,
}: IGenericText) => {
  let textStyle: {};
  switch (textType) {
    case 'regular':
      textStyle = styles.regular;
      break;
    case 'bold':
      textStyle = styles.bold;
      break;
    case 'light':
      textStyle = styles.light;
      break;
    case 'heavy':
      textStyle = styles.heavy;
      break;
    case 'medium':
      textStyle = styles.medium;
      break;
    default:
      textStyle = styles.regular;
      break;
  }
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[textStyle, {...style}, {...props}]}>
      {children}
    </Text>
  );
};

export default GenericText;

const styles = StyleSheet.create({
  regular: {
    fontFamily: 'Gilroy-Regular',
  },
  bold: {
    fontFamily: 'Gilroy-Bold',
  },
  light: {
    fontFamily: 'Gilroy-Light',
  },
  medium: {
    fontFamily: 'Gilroy-Medium',
  },
  heavy: {
    fontFamily: 'Gilroy-Heavy',
  },
});
