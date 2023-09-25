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
import {IProductCategory} from '../../../redux/slices/authSlice/type';

interface ICategoryTypes {
  product_categories: IProductCategory[];
}

const CategoryTypes = ({product_categories}: ICategoryTypes) => {
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

  const imageData = {
    Table: require('../../../assets/images/table.jpg'),
    Chairs: require('../../../assets/images/chair.jpg'),
    Sofa: require('../../../assets/images/sofa.jpeg'),
    Beds: require('../../../assets/images/bed.jpeg'),
  };

  return (
    <View style={styles.container}>
      <Text>Shop by Category</Text>

      {product_categories?.map(item => {
        return (
          <TouchableOpacity
            key={item.id}
            activeOpacity={0.9}
            style={styles.imageContainer}
            onPress={() => onPressHandler(item.id, item.name)}>
            <View
              style={{
                flex: 1,
                borderRadius: 30,
                overflow: 'hidden',
                height: '100%',
                width: '100%',
                // alignItems: 'flex-start',
              }}>
              {imageData[item.name] ? (
                <ImageBackground
                  imageStyle={styles.imageStyle}
                  source={imageData[item.name]}
                />
              ) : (
                <ImageBackground
                  imageStyle={styles.imageStyle}
                  source={{uri: item.icon_image}}
                />
              )}

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
    color: colors.MIDNIGHT,
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 20,
    paddingLeft: 20,
    shadowColor: 'white',
    shadowRadius: 3,
    shadowOpacity: 0.5,
    shadowOffset: {height: 1, width: 1},
    elevation: 4,
  },
});
