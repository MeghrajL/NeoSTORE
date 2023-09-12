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
    gap: 10,
  },
  genderElement: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    // borderWidth: 0.5,
    borderRadius: 50,
    padding: 10,
    height: 70,
    width: 70,
  },
  checkStyle: {
    height: 30,
    width: 30,
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
  agreeText: {
    fontSize: 15,
  },
  agreeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    marginTop: 5,
  },
  signinTextStyle: {
    color: colors.VIVID_GAMBOGE,
  },
  footerStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  formView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    // gap: 8,
    marginBottom: 50,
  },
  elementView: {
    paddingHorizontal: 10,
  },
  errorStyle: {
    color: 'red',
    paddingHorizontal: 5,
    // marginHorizontal: 10,
  },
  genderText: {
    fontSize: 18,
    color: colors.MIDNIGHT,
    marginTop: 5,
  },
});
