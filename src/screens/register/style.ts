import {StyleSheet} from 'react-native';
import {StyleType} from './type';
import {colors} from '../../assets/colors';

export const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
  },
  containerStyle: {
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'start',
    gap: 10,

    // backgroundColor: colors.VIVID_GAMBOGE,
  },
  buttonStyle: {
    backgroundColor: colors.VIVID_GAMBOGE,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    minHeight: 30,
    minWidth: 50,
    maxHeight: 60,
    maxWidth: 400,
    height: '32%',
    width: '90%',
  },
  gradient: {
    flex: 1,
  },
  imageStyle: {
    height: 40,
    width: 40,
  },
  genderContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkStyle: {
    height: 40,
    width: 40,
  },
});
