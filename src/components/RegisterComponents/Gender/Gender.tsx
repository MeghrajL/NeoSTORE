import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React from 'react';
import GenericText from '../../generic/genericText/GenericText';
import {colors} from '../../../assets/colors';

interface IGender {
  gender: string;
  maleHandler: (event: GestureResponderEvent) => void;
  femaleHandler: (event: GestureResponderEvent) => void;
  showErr: boolean;
}

/**
 * @author Meghraj Vilas Lot
 * @param {IGender}
 * @description male female images to select gender
 * @returns jsx for gender selector
 */

const Gender = ({gender, maleHandler, femaleHandler, showErr}: IGender) => {
  return (
    <View>
      <GenericText textType="regular" style={styles.genderText}>
        Select Your Gender
      </GenericText>
      <View style={styles.genderContainer}>
        <TouchableWithoutFeedback onPress={maleHandler}>
          <View
            style={[
              styles.genderElement,
              {borderWidth: gender === 'M' ? 1 : 0},
            ]}>
            <Image
              source={require('../../../assets/images/man.png')}
              style={styles.imageStyle}
            />
            <GenericText style={styles.textStyle} textType="regular">
              Male
            </GenericText>
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={femaleHandler}>
          <View
            style={[
              styles.genderElement,
              {borderWidth: gender === 'F' ? 1 : 0},
            ]}>
            <Image
              source={require('../../../assets/images/woman.png')}
              style={styles.imageStyle}
            />
            <GenericText style={styles.textStyle} textType="regular">
              Female
            </GenericText>
          </View>
        </TouchableWithoutFeedback>
      </View>
      {showErr && gender === '' && (
        <GenericText textType="medium" style={styles.errorStyle}>
          Please select your gender
        </GenericText>
      )}
    </View>
  );
};

export default Gender;

const styles = StyleSheet.create({
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    paddingTop: 10,
  },
  genderElement: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    borderRadius: 50,
    padding: 15,
    height: 80,
    width: 80,
  },
  genderText: {
    fontSize: 18,
    color: colors.MIDNIGHT,
    marginTop: 5,
  },
  imageStyle: {
    height: 40,
    width: 40,
  },
  errorStyle: {
    color: 'red',
    paddingHorizontal: 5,
  },
  textStyle: {
    color: colors.MIDNIGHT,
  },
});
