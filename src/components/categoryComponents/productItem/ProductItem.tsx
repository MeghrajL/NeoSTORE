import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import GenericText from '../../generic/GenericText/GenericText';
import {colors} from '../../../assets/colors';
import StarRating from '../starRating/StarRating';

const ProductItem = ({item}) => {
  //   console.log(item.product_images.toString());
  return (
    <View style={styles.container}>
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
          {/* <GenericText>{item.rating}</GenericText> */}
          <StarRating rating={item.rating} />
          <GenericText style={styles.nameStyle} textType="bold">
            {item.name}
          </GenericText>
          <GenericText style={styles.producerStyle}>
            {item.producer}
          </GenericText>
          <GenericText style={styles.costStyle}>₹{item.cost}</GenericText>
        </View>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    height: 260,
    width: '45%',
    marginHorizontal: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    // overflow: Platform === 'android' ? 'hidden' : 'visible',
    shadowColor: '#ccc',
    shadowOpacity: 0.5,
    shadowRadius: 2,
    shadowOffset: {height: 5, width: 5},
    elevation: 4,
  },
  innerContainer: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    height: '60%',
    width: '100%',
  },
  imageStyle: {height: '100%', width: '100%', resizeMode: 'stretch'},
  textContainer: {
    height: '40%',
    justifyContent: 'space-evenly',
    paddingLeft: 10,
  },
  nameStyle: {
    fontSize: 16,
    color: colors.RICH_BLACK,
  },
  producerStyle: {
    color: colors.RICH_BLACK,
  },
  costStyle: {
    fontSize: 18,
    color: colors.RICH_BLACK,
  },
});
