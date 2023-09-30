import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import GenericText from '../GenericText/GenericText';
import {ICartItem} from '../../../redux/slices/cartSlice/type';
import {colors} from '../../../assets/colors';

interface ICartSummaryItem {
  item: ICartItem;
  rate: boolean;
  onPress: Function;
}

const CartSummaryItem = ({item, rate, onPress}: ICartSummaryItem) => {
  return (
    <TouchableOpacity
      onPress={() => onPress(item.product_id)}
      style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          style={styles.imageStyle}
          source={{
            uri: item.product.product_images,
          }}
        />
      </View>
      <View style={styles.infoView}>
        <GenericText textType="medium" style={styles.nameText}>
          {item.product.name}
        </GenericText>

        <GenericText style={styles.quantotal}>
          Quantity : {item.quantity}
        </GenericText>
        <GenericText style={styles.subtotal}>
          Subtotal : ₹
          {item.product.sub_total
            ? item.product.sub_total
            : item.product.cost * item.quantity}
        </GenericText>
      </View>
      {rate && (
        <View style={styles.rateView}>
          <Button title="rate" onPress={() => {}} />
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
    backgroundColor: 'blue',
    zIndex: 1,
  },
});
