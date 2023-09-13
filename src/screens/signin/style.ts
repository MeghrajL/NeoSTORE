import {StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';

export const styles = StyleSheet.create({
  safeAreaStyle: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  signInStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    color: colors.VIVID_GAMBOGE,
  },
  formView: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
    width: '100%',
    // backgroundColor: 'red',
  },
  elementView: {
    paddingHorizontal: 10,
  },
  buttonStyle: {
    backgroundColor: colors.VIVID_GAMBOGE,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    minHeight: 30,
    minWidth: 50,
    maxHeight: 60,
    maxWidth: 400,
    height: 60,
    width: '90%',
    fontFamily: 'Gilroy-Bold',
  },
});
