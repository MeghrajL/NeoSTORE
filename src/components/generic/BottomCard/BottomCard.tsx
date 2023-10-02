import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

interface IBottomCard {
  children: React.ReactNode;
}

/**
 * @author Meghraj Vilas Lot
 * @param {IBottomCard}
 * @description used to show  card on bottom of the screen with its tops rounded
 * @returns jsx for bottom card
 */

const BottomCard = ({children}: IBottomCard) => {
  return (
    <View style={styles.container}>
      <View style={styles.topRounded}>{children}</View>
    </View>
  );
};

export default BottomCard;

const styles = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: '#ccc',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingBottom: 40,
  },
  topRounded: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: 'white',
    shadowColor: '#ccc',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    paddingTop: 15,
    paddingHorizontal: 20,
    paddingBottom: 20,
    gap: 10,
  },
});
