import {StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';

export const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: 'white',
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
