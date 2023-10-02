import {
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import GenericText from '../../generic/genericText/GenericText';
import {colors} from '../../../assets/colors';
import {RootStackParamList} from '../../../navigation/type';
import {IProductCategory} from '../../../redux/slices/authSlice/type';

interface ICategoryTypes {
  product_categories: IProductCategory[] | undefined;
}

interface IImageData {
  [key: string]: number;
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

  const imageData: IImageData = {
    Table: require('../../../assets/images/table.jpg'),
    Chairs: require('../../../assets/images/chair.jpg'),
    Sofa: require('../../../assets/images/sofa.jpeg'),
    Beds: require('../../../assets/images/bed.jpeg'),
  };

  return (
    <View style={styles.container}>
      <GenericText textType="medium" style={styles.titleStyle}>
        Shop by Category
      </GenericText>

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
    paddingTop: 20,
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
    backgroundColor: 'transparent',
    color: colors.MIDNIGHT,
    fontSize: 35,
    fontWeight: 'bold',
    textAlign: 'center',
    paddingTop: 15,
    // shadowOpacity: 0.5,
    textShadowColor: 'white', // Text shadow color
    textShadowOffset: {
      width: 1,
      height: 1,
    },
    textShadowRadius: 5, // Text shadow radius
  },
  titleStyle: {
    color: colors.MIDNIGHT,
    fontSize: 22,
    alignSelf: 'flex-start',
    paddingLeft: 20,
  },
});
