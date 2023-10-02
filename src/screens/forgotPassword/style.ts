import {StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // paddingTop: '20%',
    gap: 30,
  },
  content: {
    backgroundColor: 'white',
    paddingBottom: 50,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
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
    height: 200,
    width: 200,
    resizeMode: 'cover',
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
