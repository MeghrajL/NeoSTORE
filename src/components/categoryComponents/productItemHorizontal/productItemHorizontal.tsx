import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import GenericText from '../../generic/GenericText/GenericText';
import {colors} from '../../../assets/colors';
import StarRating from '../starRating/StarRating';
import ViewCount from '../../productDetailComponents/ViewCount/ViewCount';
import {IProduct} from '../../../redux/slices/productSlice/type';

interface IProductItemHorizontal {
  item: IProduct;
  onPress: Function;
}

const ProductItemHorizontal = ({item, onPress}: IProductItemHorizontal) => {
  //   console.log(item.product_images.toString());
  return (
    <TouchableOpacity onPress={() => onPress(item.id)} style={styles.container}>
      <View style={styles.innerContainer}>
        {/* <View style={styles.imageContainer}> */}
        <Image
          style={styles.imageStyle}
          source={{
            uri: item.product_images,
          }}
        />
        {/* </View> */}
        <View style={styles.textContainer}>
          {/* <GenericText>{item.rating}</GenericText> */}
          <GenericText style={styles.producerStyle}>
            {item.producer}
          </GenericText>
          <GenericText
            numberOfLines={1}
            style={styles.nameStyle}
            textType="medium">
            {item.name}
          </GenericText>

          <StarRating rating={item.rating} />
          <ViewCount count={item.view_count} />
          <View style={styles.costView}>
            <GenericText textType="medium" style={styles.discountStyle}>
              ₹{item.cost}
            </GenericText>
            <GenericText style={styles.costStyle}>₹{item.cost}</GenericText>
            <GenericText textType="medium" style={styles.offStyle}>
              0% off
            </GenericText>
          </View>
          <Text
            numberOfLines={1}
            ellipsizeMode="tail"
            style={styles.descriptionText}>
            {item.description}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductItemHorizontal;

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '95%',
    backgroundColor: 'white',
    // borderRadius: 10,
    // overflow: Platform === 'android' ? 'hidden' : 'visible',

    flexDirection: 'row',
    shadowColor: '#ccc',
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: {height: 10, width: 0},
    elevation: 10,
    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  innerContainer: {
    overflow: 'hidden',
    flexDirection: 'row',
  },

  imageStyle: {
    height: '100%',
    width: '40%',
    resizeMode: 'contain',
    marginHorizontal: 10,
  },
  textContainer: {
    width: '55%',
    height: '100%',
    justifyContent: 'center',
    paddingRight: 8,
    // marginVertical: 5,
    gap: 10,
  },
  nameStyle: {
    fontSize: 20,

    color: colors.RICH_BLACK,
  },
  producerStyle: {
    fontSize: 16,

    color: colors.RICH_BLACK,
  },
  costStyle: {
    fontSize: 14,
    color: colors.PLATINUM_GRAY,
    textDecorationLine: 'line-through',
  },
  discountStyle: {
    fontSize: 22,
    color: colors.RICH_BLACK,
  },
  costView: {
    flexDirection: 'row',
    gap: 6,
    // justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  offStyle: {
    fontSize: 14,
    color: '#00de82',
  },
  descriptionText: {
    fontFamily: 'Gilroy-Regular',
    fontSize: 16,
    color: colors.PLATINUM_GRAY,
  },
});
