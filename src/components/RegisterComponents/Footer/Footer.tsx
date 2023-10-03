import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import GenericText from '../../Generic/GenericText/GenericText';
import {colors} from '../../../assets/colors';

interface IFooter {
  dialogueText: string;
  clickText: string;
  onClickPress: (event: GestureResponderEvent) => void;
}

/**
 * @author Meghraj Vilas Lot
 * @param {IFooter}
 * @returns jsx for footer which renders clickable text
 */

const Footer = ({dialogueText, clickText, onClickPress}: IFooter) => {
  return (
    <View style={styles.footerStyle}>
      <GenericText style={styles.textStyle} textType="regular">
        {dialogueText}
      </GenericText>
      <TouchableOpacity onPress={onClickPress}>
        <GenericText textType="regular" style={styles.signinTextStyle}>
          {clickText}
        </GenericText>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  signinTextStyle: {
    color: colors.VIVID_GAMBOGE,
  },
  footerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  textStyle: {
    color: colors.MIDNIGHT,
  },
});
