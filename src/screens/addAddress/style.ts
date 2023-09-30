import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  formView: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 8,
  },
  contentContainer: {gap: 10, paddingTop: 20, paddingBottom: 60},

  conFont: {
    fontSize: 16,
    color: colors.RICH_BLACK,
  },
  countryContainer: {
    width: '100%',
    paddingHorizontal: 15,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
  },
  countryButton: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    width: '100%',
    borderWidth: 1,
    borderColor: colors.MIDNIGHT,
    borderRadius: 30,
    overflow: 'hidden',
    marginTop: 5,
    paddingHorizontal: 10,
  },
  radioText: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 16,
    color: colors.RICH_BLACK,
  },
  radioStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    gap: 5,
  },
  circle: {
    borderWidth: Platform.OS === 'ios' ? 0.25 : 0,
    borderColor: colors.MIDNIGHT,
    borderRadius: 30,
    height: 37,
    width: 37,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {},

  imageStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
  },

  imageContainer: {
    alignSelf: 'center',
    height: 100,
    width: '100%',
  },
  submitButtonStyle: {
    backgroundColor: colors.VIVID_GAMBOGE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    minHeight: 30,
    minWidth: 50,
    maxHeight: 60,
    maxWidth: 400,
    height: 50,
    width: '100%',
  },
  buttonContainer: {
    paddingTop: 10,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
