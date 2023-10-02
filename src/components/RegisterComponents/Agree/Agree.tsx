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
import {colors} from '../../../assets/colors';

interface IAgree {
  checkBoxChecked: boolean;
  checkboxHandler: (event: GestureResponderEvent) => void;
  showErr: boolean;
}
const Agree = ({checkBoxChecked, checkboxHandler, showErr}: IAgree) => {
  return (
    <View style={styles.elementView}>
      <View style={styles.agreeView}>
        <TouchableOpacity onPress={checkboxHandler}>
          <Image
            style={styles.checkStyle}
            source={
              checkBoxChecked !== true
                ? require('../../../assets/images/unchecked.png')
                : require('../../../assets/images/checked.png')
            }
          />
        </TouchableOpacity>
        <GenericText textType="regular" style={styles.agreeText}>
          I agree the Terms & Conditions
        </GenericText>
      </View>

      {!checkBoxChecked && showErr && (
        <GenericText textType="medium" style={styles.errorStyle}>
          You must accept the terms and conditions to continue
        </GenericText>
      )}
    </View>
  );
};

export default Agree;

const styles = StyleSheet.create({
  agreeText: {
    color: colors.MIDNIGHT,

    fontSize: 15,
  },
  agreeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 5,
  },
  checkStyle: {
    height: 30,
    width: 30,
  },
  elementView: {
    paddingHorizontal: 10,
  },
  errorStyle: {
    color: 'red',
    paddingHorizontal: 5,
    // marginHorizontal: 10,
  },
});
