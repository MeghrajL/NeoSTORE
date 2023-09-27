import {StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';

export const styles = StyleSheet.create({
  contentContainer: {
    // flex: 1,
    backgroundColor: 'white',
    // paddingTop: 20,
    // gap: 20,
    // paddingBottom: 60,
  },
  title: {
    fontSize: 25,
    color: colors.RICH_BLACK,
  },
  instruction: {
    alignItems: 'center',
    color: colors.MIDNIGHT,
    gap: 5,
  },
  buttonStyle: {
    backgroundColor: colors.VIVID_GAMBOGE,
    margin: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    minHeight: 30,
    minWidth: 50,
    maxHeight: 60,
    maxWidth: 400,
    height: 50,
    width: '100%',
    fontFamily: 'Gilroy-Bold',
  },
  imageStyle: {
    height: 150,
    width: 150,
    resizeMode: 'cover',
    alignSelf: 'center',
  },
  innerContainer: {
    gap: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    width: '90%',
  },
  textStyle: {
    color: colors.MIDNIGHT,
  },
});
