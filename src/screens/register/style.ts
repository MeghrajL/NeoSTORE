import {StyleSheet} from 'react-native';
import {StyleType} from './type';
import {colors} from '../../assets/colors';

export const styles = StyleSheet.create<StyleType>({
  buttonStyle: {
    backgroundColor: colors.VIVID_GAMBOGE,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    minHeight: 30,
    minWidth: 50,
    maxHeight: 60,
    maxWidth: 400,
    height: '32%',
    width: '90%',
  },
});
