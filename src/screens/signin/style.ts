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
  content: {
    backgroundColor: 'white',
    paddingTop: 15,
    paddingBottom: 10,
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
    gap: 30,
    width: '100%',
  },
  elementView: {
    paddingHorizontal: 10,
  },
  buttonContainer: {width: '90%', paddingTop: 10},
});
