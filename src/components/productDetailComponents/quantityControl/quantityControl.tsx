import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  GestureResponderEvent,
} from 'react-native';
import IconButton from '../../generic/iconButton/IconButton';
import {colors} from '../../../assets/colors';
import GenericText from '../../generic/genericText/GenericText';

interface IQuantityControl {
  quantity: number;
  onIncrease: (event: GestureResponderEvent) => void;
  onDecrease: (event: GestureResponderEvent) => void;
}

/**
 * @author Meghraj Vilas Lot
 * @param {IQuantityControl}
 * @description buttons to control quantity number ranging from 1 to 8 and quantity text
 * @returns jsx for quantity control
 */

const QuantityControl = ({
  quantity,
  onIncrease,
  onDecrease,
}: IQuantityControl) => {
  return (
    <View style={styles.container}>
      <GenericText style={styles.textStyle}>Quantity</GenericText>
      <View style={styles.controlCon}>
        <View style={styles.iconContainer}>
          <IconButton
            color="white"
            onPressCustom={onDecrease}
            icon="remove-outline"
            size={20}
          />
        </View>

        <GenericText textType="medium" style={styles.quantityText}>
          {quantity}
        </GenericText>
        <View style={styles.iconContainer}>
          <IconButton
            color="white"
            onPressCustom={onIncrease}
            icon="add-outline"
            size={20}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 0.5,
    borderColor: colors.PLATINUM_GRAY,
    padding: 10,
    borderRadius: 30,
    width: '100%',
    height: 50,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: colors.RICH_BLACK,
  },
  controlCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    backgroundColor: colors.VIVID_GAMBOGE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    width: 30,
    height: 30,
  },
  textStyle: {
    paddingLeft: 5,
    fontSize: 20,
    color: colors.RICH_BLACK,
  },
});

export default QuantityControl;
