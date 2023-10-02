import {GestureResponderEvent, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Load from '../load/Load';
import GenericButton from '../genericButton/GenericButton';
import Tick from '../tick/Tick';
import {colors} from '../../../assets/colors';

interface IButtonAnimated {
  isLoading: boolean;
  isDone: boolean;
  onPress: (event: GestureResponderEvent) => void;
  title: string;
  fontSize: number;
}

/**
 * @author Meghraj Vilas Lot
 * @param {IButtonAnimated}
 * @description load gif if displayed if isLoading is true, button is displayed if isDone is false and on success tick gif is displayed
 * @returns jsx for button animated
 */

const ButtonAnimated = ({
  isLoading,
  isDone,
  onPress,
  title,
  fontSize,
}: IButtonAnimated) => {
  return (
    <>
      {isLoading ? (
        <Load />
      ) : !isDone ? (
        <GenericButton
          onPress={onPress}
          title={title}
          fontSize={fontSize}
          fontFamily="Gilroy-Medium"
          style={styles.buttonStyle}
          color="white"
        />
      ) : (
        <Tick />
      )}
    </>
  );
};

export default ButtonAnimated;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: colors.VIVID_GAMBOGE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    height: 50,
    width: '100%',
    fontFamily: 'Gilroy-Bold',
  },
});
