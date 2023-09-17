import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Import an eye icon from a suitable icon library
import {colors} from '../../../assets/colors';
import GenericText from '../../generic/GenericText/GenericText';

const ViewCount = ({count}) => {
  const formattedCount =
    count >= 1000 ? `${(count / 1000).toFixed(1)}k` : count.toString();

  return (
    <View style={styles.container}>
      <Icon name="eye" size={20} color={colors.MIDNIGHT} />
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
    color: colors.RICH_BLACK,
  },
});

export default ViewCount;
