import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import an eye icon from a suitable icon library
import {colors} from '../../../assets/colors';
import GenericText from '../../generic/genericText/GenericText';

interface IViewCount {
  count?: number | undefined;
}

/**
 * @author Meghraj Vilas Lot
 * @param {IViewCount}
 * @returns jsx for view count with eye icon and rounded up view count
 */

const ViewCount = ({count = 0}: IViewCount) => {
  const formattedCount =
    count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString();

  return (
    <View style={styles.container}>
      <Icon name="eye" size={20} color={colors.PLATINUM_GRAY} />
      <GenericText style={styles.text}>{formattedCount}</GenericText>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 5,
    fontSize: 16,
    color: colors.MIDNIGHT,
  },
});

export default ViewCount;
