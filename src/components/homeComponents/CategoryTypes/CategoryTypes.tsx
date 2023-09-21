import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import GenericText from '../../generic/GenericText/GenericText';
import {colors} from '../../../assets/colors';
import {RootStackParamList} from '../../../navigation/type';

const CategoryTypes = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onPressHandler = (
    product_category_id: number,
    categoryName: string,
  ) => {
    navigation.navigate('Category', {
      product_category_id: product_category_id,
      categoryName: categoryName,
    });
  };

  const Data = [
    {
      product_category_id: 1,
      image: require('../../../assets/images/table.jpg'),
      name: 'Tables',
    },
    {
      product_category_id: 2,
      image: require('../../../assets/images/chair.jpg'),
      name: 'Chairs',
    },
    {
      product_category_id: 3,
      image: require('../../../assets/images/sofa.jpeg'),
      name: 'Sofas',
    },
    {
      product_category_id: 4,
      image: require('../../../assets/images/bed.jpeg'),
      name: 'Beds',
    },
  ];

  return (
    <View style={styles.container}>
      <Text>Shop by Category</Text>

      {Data?.map(item => {
        return (
          <TouchableOpacity
            key={item.product_category_id}
            activeOpacity={0.9}
            style={styles.imageContainer}
            onPress={() => onPressHandler(item.product_category_id, item.name)}>
            <View
              style={{
                flex: 1,
                borderRadius: 30, // Adjust the border radius as needed
                overflow: 'hidden',
                height: '100%',
                width: '100%',
              }}>
              <ImageBackground
                imageStyle={styles.imageStyle}
                source={item?.image}
              />
              <GenericText textType="medium" style={styles.text}>
                {item.name}
              </GenericText>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default CategoryTypes;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  imageContainer: {
    // borderRadius: 30,
    height: 150,
    width: '95%',
  },
  imageStyle: {
    height: 150,
    width: '100%',
    resizeMode: 'cover',
  },
  text: {
    height: 150,
    width: '100%',
    color: colors.MIDNIGHT,
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 10,
  },
});
