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
    // gap: 10,
    // backgroundColor: 'red',
    width: '100%',
    // maxWidth: '90%',
  },
  imageStyle: {
    height: '70%',
    width: '70%',
    resizeMode: 'cover',
    // backgroundColor: 'pink',
  },
  imageContainer: {
    // backgroundColor: 'red',
    height: 100,
    // width: 100,
    borderWidth: 0.5,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: '30%',
  },
  infoContainer: {
    gap: 10,
    width: '70%',
    paddingLeft: 20,
    // marginLeft: 10,
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
