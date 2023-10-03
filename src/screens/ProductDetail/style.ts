import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';

export const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: 'white'},
  content: {paddingBottom: 60},
  carouselContainer: {
    height: 350,
    width: '100%',
    marginTop: 20,
  },
  infoContainer: {
    height: '40%',
    width: '100%',
    gap: 30,
  },
  innerInfo: {
    gap: 10,
    backgroundColor: 'white',
    shadowColor: '#ccc',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {height: 5, width: 0},
    elevation: 15,
    paddingHorizontal: 20,
    borderEndStartRadius: 30,
    borderEndEndRadius: 30,
    borderBottomLeftRadius: Platform.OS === 'android' ? 30 : undefined,
    borderBottomRightRadius: Platform.OS === 'android' ? 30 : undefined,
    paddingTop: 30,
    paddingBottom: 15,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
  },
  visual: {flexDirection: 'row', justifyContent: 'space-between'},
  producer: {
    fontSize: 20,
    color: colors.PLATINUM_GRAY,
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
    color: colors.PLATINUM_GRAY,
  },
  buttonsContainer: {
    paddingHorizontal: 20,
    gap: 15,
  },
  wrapperStyle: {
    flex: 1,
    justifyContent: 'space-between',
  },
  seeMoreStyle: {color: colors.VIVID_GAMBOGE},
  seeLessStyle: {color: colors.MIDNIGHT},
  similar: {paddingHorizontal: 20, gap: 10},
  back: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
    height: 35,
    width: 35,
    borderRadius: 30,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',

    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    // resizeMode: 'center',
  },
  costStyle: {
    fontSize: 14,
    color: colors.PLATINUM_GRAY,
    textDecorationLine: 'line-through',
  },
  offStyle: {
    fontSize: 20,
    color: '#00de82',
  },
  costView: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'flex-end',
  },
});
