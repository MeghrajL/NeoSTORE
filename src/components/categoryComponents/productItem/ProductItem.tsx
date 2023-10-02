import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import GenericText from '../../generic/genericText/GenericText';
import {colors} from '../../../assets/colors';
import StarRating from '../starRating/StarRating';
import {IProduct} from '../../../redux/slices/productSlice/type';

interface IProductItem {
  item: IProduct;
  onPress: Function;
}

/**
 * @author Meghraj Vilas Lot
 * @param {IProductItem}
 * @description displayed on product detail screen for similar products
 * @returns jsx for product item component
 */

const ProductItem = ({item, onPress}: IProductItem) => {
  return (
    <TouchableOpacity onPress={() => onPress(item.id)} style={styles.container}>
      <View style={styles.innerContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.imageStyle}
            source={{
              uri: item.product_images,
            }}
          />
        </View>
        <View style={styles.textContainer}>
          <StarRating rating={item.rating} />
          <GenericText numberOfLines={1} style={styles.producerStyle}>
            {item.producer}
          </GenericText>
          <GenericText
            numberOfLines={1}
            style={styles.nameStyle}
            textType="medium">
            {item.name}
          </GenericText>

          <View style={styles.costView}>
            <GenericText textType="medium" style={styles.discountStyle}>
              ₹{item.cost}
            </GenericText>
            <GenericText style={styles.costStyle}>₹{item.cost}</GenericText>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    height: 260,
    width: '45%',
    margin: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    shadowColor: '#ccc',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {height: 5, width: 5},
    elevation: 10,
    borderWidth: 0.4,
    borderColor: '#ccc',
  },
  innerContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    paddingBottom: 5,
  },
  imageContainer: {
    height: '60%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageStyle: {height: '90%', width: '90%', resizeMode: 'stretch'},
  textContainer: {
    height: '40%',
    justifyContent: 'center',
    paddingHorizontal: 10,
    paddingBottom: 5,
    gap: 10,
  },
  nameStyle: {
    fontSize: 18,
    color: colors.RICH_BLACK,
  },
  producerStyle: {
    color: colors.RICH_BLACK,
  },
  costStyle: {
    fontSize: 14,
    color: colors.PLATINUM_GRAY,
    textDecorationLine: 'line-through',
  },
  discountStyle: {
    fontSize: 18,
    color: colors.RICH_BLACK,
  },
  costView: {
    flexDirection: 'row',
    gap: 5,
    alignItems: 'flex-end',
  },
  offStyle: {
    fontSize: 14,
    color: '#00de82',
  },
});
