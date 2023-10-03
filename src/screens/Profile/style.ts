import {StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 30,
    paddingHorizontal: 20,
  },
  profileContainer: {
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
  imageContainer: {
    backgroundColor: 'white',
    height: 100,
    borderWidth: 0.5,
    borderRadius: 90,
    justifyContent: 'center',
    alignItems: 'center',
    width: 100,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  infoContainer: {
    gap: 10,
    flex: 1,
    // width: '70%',
    paddingLeft: 20,
  },
  nameFont: {
    fontSize: 20,
    color: colors.RICH_BLACK,
  },
  emailFont: {
    fontSize: 16,
    color: colors.RICH_BLACK,
  },
  itemContainer: {
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 0.5,
    borderRadius: 20,
    paddingBottom: 8,
    backgroundColor: 'white',
    shadowColor: '#ccc',
    shadowRadius: 5,
    shadowOpacity: 0.5,
    shadowOffset: {height: 5, width: 1},
    elevation: 10,
  },
});
