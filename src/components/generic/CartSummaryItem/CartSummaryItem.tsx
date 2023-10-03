import {
  Button,
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import GenericText from '../GenericText/GenericText';
import {colors} from '../../../assets/colors';
import GenericButton from '../GenericButton/GenericButton';

interface ICartSummaryItem {
  product_id: number;
  quantity: number;
  sub_total: number;
  product_images: string;
  name: string;
  rate: boolean;
  onPress: Function;
  onRatePress?: Function;
}

/**
 * @author Meghraj Vilas Lot
 * @param {ICartSummaryItem}
 * @description renders product order summary details and optionally rate button
 * @returns jsx for cart summary item
 */

const CartSummaryItem = ({
  product_id,
  product_images,
  name,
  rate,
  quantity,
  sub_total,
  onPress,
  onRatePress,
}: ICartSummaryItem) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(product_id)}
      style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageStyle}
          source={{
            uri: product_images,
          }}
        />
      </View>
      <View style={styles.infoView}>
        <GenericText textType="medium" style={styles.nameText}>
          {name}
        </GenericText>

        <GenericText style={styles.quantotal}>
          Quantity : {quantity}
        </GenericText>
        <GenericText style={styles.subtotal}>
          Subtotal : ₹{sub_total}
        </GenericText>
      </View>
      {rate && (
        <View style={styles.rateView}>
          <TouchableOpacity
            onPress={() => onRatePress(product_id)}
            style={styles.rateButtonStyle}>
            <GenericText textType="medium" style={styles.rateText}>
              Rate
            </GenericText>
          </TouchableOpacity>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default CartSummaryItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 110,
    width: '95%',
    backgroundColor: 'white',
    flexDirection: 'row',
    // justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: '2.5%',
    // gap: 8,
    padding: 12,

    shadowColor: '#ccc',
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: {height: 10, width: 0},
    elevation: 10,

    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  //   touchView:{
  //     flexDirection: 'row',

  //   },
  imageContainer: {
    width: '30%',
    height: '100%',
    // backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    height: '100%',
    width: '100%',
    resizeMode: 'contain',
    // paddingRight: 15,
    // backgroundColor: 'red',
  },
  infoView: {
    paddingLeft: 10,
    height: '100%',
    width: '50%',
    justifyContent: 'space-between',
    // gap: 10,
    // backgroundColor: 'red',
  },
  nameText: {
    fontSize: 17,
    color: colors.RICH_BLACK,
  },
  subtotal: {
    fontSize: 17,
    color: colors.RICH_BLACK,
  },
  quantotal: {
    fontSize: 15,
    color: colors.RICH_BLACK,
  },
  rateView: {
    width: '20%',
    height: '100%',
    // zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rateButtonStyle: {
    backgroundColor: colors.VIVID_GAMBOGE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    height: 30,
    width: '100%',
  },
  rateText: {
    color: 'white',
    fontSize: 20,
  },
});
