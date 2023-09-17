import {StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentStyle: {
    gap: 20,
    paddingVertical: 10,
    // marginHorizontal: 20,
  },
  wrapperStyle: {
    flex: 1,
    justifyContent: 'space-between',
  },
  footerStyle: {
    color: colors.VIVID_GAMBOGE,
    fontSize: 16,
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
