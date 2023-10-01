import {StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentStyle: {
    paddingBottom: 100,
    gap: 10,
    paddingVertical: 20,
    // marginHorizontal: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  wrapperStyle: {
    flex: 1,
    justifyContent: 'space-between',
  },
  footerStyle: {
    color: colors.MIDNIGHT,
    fontSize: 18,
    paddingTop: 6,
    width: '100%',
  },
  footerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
