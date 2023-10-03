import {
  View,
  SafeAreaView,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Vibration,
  StatusBar,
  BackHandler,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';

import {ProductDetailScreenNavigationProp} from '../../navigation/type';
import {useFocusEffect} from '@react-navigation/native';
import {
  getCategoryList,
  getProduct,
} from '../../redux/slices/productSlice/actions';
import {addToCart, getCartList} from '../../redux/slices/cartSlice/actions';
import {useAppDispatch, useAppSelector} from '../../redux/store';

import Loading from '../../components/Generic/Loading/Loading';
import ImageCarousel from '../../components/ProductDetailComponents/ImageCarousel/ImageCarousel';
import {styles} from './style';
import StarRating from '../../components/CategoryComponents/StarRating/StarRating';
import GenericText from '../../components/Generic/GenericText/GenericText';
import ViewCount from '../../components/ProductDetailComponents/ViewCount/viewCount';
import QuantityControl from '../../components/ProductDetailComponents/QuantityControl/quantityControl';
import ProductItem from '../../components/CategoryComponents/ProductItem/ProductItem';
import ReadMore from '@fawazahmed/react-native-read-more';
import {colors} from '../../assets/colors';
import ErrorScreen from '../../components/Generic/ErrorScreen/ErrorScreen';
import ButtonAnimated from '../../components/Generic/ButtonAnimated/ButtonAnimated';

/**
 * @author Meghraj Vilas Lot
 * @param {ProductDetailScreenNavigationProp}
 * @description displays product details with image carousel and similar products list
 * @returns jsx for product detail screen
 */

const ProductDetail = ({
  navigation,
  route,
}: ProductDetailScreenNavigationProp) => {
  const {product_id, shouldLoadSimilarProducts} = route.params;
  const [dataLoaded, setDataLoaded] = useState(false);
  const [catDataLoaded, setCatDataLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const dispatch = useAppDispatch();
  let r = 0;
  useEffect(() => {
    console.log('r', ++r);
    dispatch(getProduct({product_id: product_id}))
      .then(() => {
        // setDataLoaded(true);
      })
      .catch(error => {
        console.log(error);
      });
  }, [dispatch, dataLoaded, setDataLoaded, product_id]);

  const access_token = useAppSelector(
    state => state.auth.user?.data?.access_token,
  );

  const {isLoading, isError, productData, category} = useAppSelector(
    state => state.product,
  );

  const productItem = productData?.data;
  const updatedCategory = category?.data?.filter(
    item => item.id !== product_id,
  );

  const cartLoading = useAppSelector(state => state.cart?.isLoading);

  useEffect(() => {
    if (shouldLoadSimilarProducts === true) {
      dispatch(
        getCategoryList({
          product_category_id: productItem?.product_category_id,
        }),
      )
        .then(() => {
          setCatDataLoaded(true);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setCatDataLoaded(true);
    }
  }, [shouldLoadSimilarProducts, dispatch, productItem?.product_category_id]);

  async function handleAddToCart() {
    try {
      await dispatch(
        addToCart({
          access_token: access_token,
          product_id: product_id,
          quantity: quantity,
        }),
      ).unwrap();
      setAddedToCart(true);
      dispatch(getCartList({access_token: access_token}));
      setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
      Vibration.vibrate(200);
    } catch (error) {
      Toast.show('Something went wrong, Please try again.', Toast.SHORT);
      setAddedToCart(false);

      console.log(error);
    }
  }

  const increaseQuantity = () => {
    if (quantity < 8) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const navigatedToCategory = () => {
    let categoryName;
    const product_category_id = category?.data[0].product_category_id;
    switch (product_category_id) {
      case 1:
        categoryName = 'Table';
        break;
      case 2:
        categoryName = 'Chairs';
        break;
      case 3:
        categoryName = 'Sofa';
        break;
      case 4:
        categoryName = 'Beds';
        break;
      default:
        break;
    }
    navigation.navigate('Category', {
      product_category_id: product_category_id,
      categoryName: categoryName,
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        navigatedToCategory();
        return true;
      };

      BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => {
        BackHandler.removeEventListener('hardwareBackPress', onBackPress);
      };
    }, [navigatedToCategory]),
  );

  return (
    <>
      <StatusBar barStyle="default" />
      <SafeAreaView style={{flex: 1}}>
        {isLoading || !catDataLoaded ? (
          <Loading />
        ) : isError ? (
          <ErrorScreen />
        ) : (
          <ScrollView
            contentContainerStyle={styles.content}
            style={styles.container}>
            <TouchableOpacity onPress={navigatedToCategory} style={styles.back}>
              <Icon
                name="arrow-back-outline"
                color={colors.MIDNIGHT}
                size={25}
              />
            </TouchableOpacity>

            <View style={styles.carouselContainer}>
              <ImageCarousel
                product_images={productItem?.product_images}
                resizeMode="contain"
                loop={false}
                autoplay={false}
              />
            </View>
            <View style={styles.infoContainer}>
              <View style={styles.innerInfo}>
                <View style={styles.visual}>
                  <StarRating rating={productItem?.rating} />
                  <ViewCount count={productItem?.view_count} />
                </View>

                <View>
                  <GenericText style={styles.producer}>
                    {productItem?.producer}
                  </GenericText>
                </View>
                <GenericText textType="medium" style={styles.nameText}>
                  {productItem?.name}
                </GenericText>
                <View style={styles.costView}>
                  <GenericText style={styles.costText}>
                    ₹{productItem?.cost}
                  </GenericText>
                  <GenericText textType="medium" style={styles.offStyle}>
                    0% off
                  </GenericText>
                  <GenericText style={styles.costStyle}>
                    ₹{productItem?.cost}
                  </GenericText>
                </View>

                <ReadMore
                  seeMoreStyle={styles.seeMoreStyle}
                  seeLessStyle={styles.seeLessStyle}
                  style={styles.descriptionText}>
                  {productItem?.description}
                </ReadMore>
              </View>
              <View style={styles.buttonsContainer}>
                <QuantityControl
                  quantity={quantity}
                  onIncrease={increaseQuantity}
                  onDecrease={decreaseQuantity}
                />

                <ButtonAnimated
                  onPress={handleAddToCart}
                  title="Add to Cart"
                  fontSize={26}
                  isDone={addedToCart}
                  isLoading={cartLoading}
                />
              </View>
              <View style={styles.similar}>
                <GenericText textType="medium" style={styles.costText}>
                  Similar Products
                </GenericText>

                <View style={{flex: 1}}>
                  <FlatList
                    scrollEnabled={false}
                    data={updatedCategory}
                    renderItem={({item}) => (
                      <ProductItem
                        item={item}
                        onPress={() => {
                          navigation.replace('ProductDetail', {
                            product_id: item.id,
                            shouldLoadSimilarProducts: false,
                          });
                        }}
                      />
                    )}
                    keyExtractor={item => item.id.toString()}
                    numColumns={2}
                    columnWrapperStyle={styles.wrapperStyle}
                  />
                </View>
              </View>
            </View>
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
};

export default ProductDetail;
