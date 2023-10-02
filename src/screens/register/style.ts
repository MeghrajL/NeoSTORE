import {StyleSheet} from 'react-native';
import {StyleType} from './type';
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
  },
  buttonStyle: {
    backgroundColor: colors.VIVID_GAMBOGE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    height: 50,
    width: '100%',
    fontFamily: 'Gilroy-Bold',
  },
  buttonContainer: {width: '90%', paddingTop: 10, marginBottom: 15},
  gradient: {
    flex: 1,
  },
  titleStyleFirstHalf: {
    color: colors.MIDNIGHT,
    fontSize: 35,
  },
  titleStyleSecondHalf: {
    color: colors.VIVID_GAMBOGE,
    fontSize: 35,
  },
  titleStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    // backgroundColor: 'white',
  },

  formView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 3,
    marginBottom: 50,
  },
  // elementView: {
  //   paddingHorizontal: 10,
  // },
  // errorStyle: {
  //   color: 'red',
  //   paddingHorizontal: 5,
  //   // marginHorizontal: 10,
  // },
});
