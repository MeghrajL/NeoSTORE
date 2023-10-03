import {Platform, StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';

export const styles = StyleSheet.create({
  costText: {
    fontSize: 20,
    color: colors.RICH_BLACK,
  },
  deliveryText: {
    fontSize: 14,
    color: colors.RICH_BLACK,
  },
  freeText: {
    fontSize: 14,
    color: colors.PLATINUM_GRAY,
  },
  container: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  topRounded: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 60,
    gap: 10,
  },
  swipeView: {
    justifyContent: 'center',
    gap: 10,
    paddingTop: 10,
    paddingBottom: 60,
  },
  textView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
