import {
  GestureResponderEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../assets/colors';
import GenericText from '../../generic/genericText/GenericText';

interface IMenuItem {
  icon: string;
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  isLast?: boolean;
}

const MenuItem = ({icon, title, onPress, isLast}: IMenuItem) => {
  return (
    <TouchableOpacity
      style={[styles.container, {borderBottomWidth: isLast ? 0 : 0.5}]}
      onPress={onPress}>
      <Icon name={icon} size={25} color={colors.MIDNIGHT} />
      <GenericText style={styles.textStyle}>{title}</GenericText>
      {!isLast && (
        <Icon name="chevron-forward" size={25} color={colors.MIDNIGHT} />
      )}
    </TouchableOpacity>
  );
};

export default MenuItem;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    flexDirection: 'row',
    width: '95%',
    height: 70,
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 20,
    borderBottomColor: '#ccc',
    // borderBottomWidth: 0.5,
    paddingHorizontal: 10,
    marginHorizontal: '2.5%',
  },
  textStyle: {
    fontSize: 18,
    width: '70%',
    color: colors.RICH_BLACK,
  },
});
