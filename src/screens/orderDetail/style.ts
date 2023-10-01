import {StyleSheet} from 'react-native';
import {colors} from '../../assets/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  titleText: {
    color: colors.RICH_BLACK,
    fontSize: 22,
  },
  quanText: {
    fontSize: 16,
    color: colors.RICH_BLACK,
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
  button: {
    height: 60,
    paddingVertical: 2,
  },
  content: {
    gap: 10,
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    paddingTop: 20,
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
  },
  slideCon: {
    backgroundColor: colors.VIVID_GAMBOGE,
    marginTop: 0,
  },
});
