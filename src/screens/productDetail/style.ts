import {StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  carouselContainer: {height: 380, width: '100%'},
  infoContainer: {
    height: '40%',
    width: '100%',
    paddingTop: 15,
    // paddingHorizontal: 15,
    gap: 30,
  },
  innerInfo: {
    gap: 10,
    backgroundColor: 'white',
    shadowColor: '#ccc',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {height: 10, width: 0},
    elevation: 4,
    paddingHorizontal: 15,
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    paddingBottom: 15,
  },
  visual: {flexDirection: 'row', justifyContent: 'space-between'},
  producer: {
    fontSize: 20,
    color: '#797979',
  },
  nameText: {
    fontSize: 24,
    color: colors.RICH_BLACK,
  },
  costText: {
    fontSize: 20,
    color: colors.RICH_BLACK,
  },
  descriptionText: {
    fontSize: 16,
    color: '#797979',
  },
  cartButtonStyle: {
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
  buttonsContainer: {
    // paddingTop: 30,
    paddingHorizontal: 15,
    gap: 15,
  },
  contentStyle: {
    // gap: 20,
    // paddingVertical: 10,
    // marginHorizontal: 20,
  },
  wrapperStyle: {
    flex: 1,
    justifyContent: 'space-between',
  },
});
