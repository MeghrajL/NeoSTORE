import {StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';

export const styles = StyleSheet.create({
  checkoutButtonStyle: {
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
  listView: {
    justifyContent: 'center',
    gap: 10,
    paddingTop: 10,
    paddingBottom: 60,
  },
  costText: {
    fontSize: 20,
    color: colors.RICH_BLACK,
  },
  headerText: {
    fontSize: 20,
    color: colors.RICH_BLACK,
    paddingLeft: 10,
  },
  deliveryText: {
    fontSize: 14,
    color: colors.RICH_BLACK,
  },
  freeText: {
    fontSize: 14,
    color: colors.PLATINUM_GRAY,
  },
  textView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
