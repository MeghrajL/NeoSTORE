import {StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  contentContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '20%',
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
    height: 60,
    width: '90%',
    fontFamily: 'Gilroy-Bold',
  },
  imageStyle: {
    height: 200,
    width: 200,
    resizeMode: 'cover',
  },
});
