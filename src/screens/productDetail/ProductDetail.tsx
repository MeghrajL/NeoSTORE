import {
  View,
  Text,
  SafeAreaView,
  Button,
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
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {
  getCategoryList,
  getProduct,
} from '../../redux/slices/productSlice/productSlice';
import {addToCart, getCartList} from '../../redux/slices/cartSlice/cartSlice';

import Loading from '../../components/generic/Loading/Loading';
import ImageCarousel from '../../components/productDetailComponents/ImageCarousel/ImageCarousel';
import {styles} from './style';
import StarRating from '../../components/categoryComponents/starRating/StarRating';
import GenericText from '../../components/generic/GenericText/GenericText';
import GenericButton from '../../components/generic/GenericButton/GenericButton';
import ViewCount from '../../components/productDetailComponents/ViewCount/ViewCount';
import QuantityControl from '../../components/productDetailComponents/QualityControl/QualityControl';
import ProductItem from '../../components/categoryComponents/productItem/ProductItem';
import ReadMore from '@fawazahmed/react-native-read-more';
import IconButton from '../../components/generic/IconButton/IconButton';
import {colors} from '../../assets/colors';
import LottieView from 'lottie-react-native';
import Tick from '../../components/generic/Tick/Tick';
import Load from '../../components/generic/Load/Load';
import ErrorScreen from '../../components/generic/ErrorScreen/ErrorScreen';
import ButtonAnimated from '../../components/generic/ButtonAnimated/ButtonAnimated';
import {set} from 'lodash';
import {useFocusEffect} from '@react-navigation/native';

const ProductDetail = ({
  navigation,
  route,
}: ProductDetailScreenNavigationProp) => {
  console.log(route.params);
  const {product_id, shouldLoadSimilarProducts} = route.params;
  // const [prod_id, setProdId] = useState(product_id);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [catDataLoaded, setCatDataLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProduct({product_id: product_id}))
      .then(() => {
        setDataLoaded(true);
      })
      .catch(error => {
        console.error(error);
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

  console.log('>>>>>>>>', access_token);
  const cartLoading = useAppSelector(state => state.cart?.isLoading);
  // console.log('😀', cartStatus);

  useEffect(() => {
    if (shouldLoadSimilarProducts === true) {
      dispatch(
        getCategoryList({
          product_category_id: productItem?.product_category_id,
        }),
      )
        .then(() => {
          setCatDataLoaded(true);
          // console.error('success');
        })
        .catch(error => {
          console.error(error);
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
      console.log('adddessdsdsdsdsddsds');
      dispatch(getCartList({access_token: access_token}));
      setTimeout(() => {
        setAddedToCart(false);
      }, 2000);
      Vibration.vibrate(200);
    } catch (error) {
      Toast.show('Something went wrong, Please try again.', Toast.SHORT);
      setAddedToCart(false);

      // console.error('from detail', error);
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
        {
          // prod_id !== productData?.data?.id ||
          isLoading || !dataLoaded || !catDataLoaded ? (
            <Loading />
          ) : isError ? (
            <ErrorScreen />
          ) : (
            <ScrollView
              contentContainerStyle={{paddingBottom: 60}}
              style={styles.container}>
              <TouchableOpacity
                onPress={navigatedToCategory}
                style={styles.back}>
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
                  {/* <GenericText style={styles.descriptionText}>
                Details : {productItem.description}
              </GenericText> */}
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
                  {/* {cartLoading ? (
                  <Load />
                ) : !addedToCart ? (
                  <GenericButton
                    // disabled={cartLoading}
                    onPress={handleAddToCart}
                    title="Add to Cart"
                    fontSize={26}
                    fontFamily="Gilroy-Medium"
                    style={styles.cartButtonStyle}
                    color="white"
                  />
                ) : (
                  <Tick />
                )} */}
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
                      contentContainerStyle={styles.contentStyle}
                      columnWrapperStyle={styles.wrapperStyle}
                    />
                  </View>
                </View>
              </View>
            </ScrollView>
          )
        }
      </SafeAreaView>
    </>
  );
};

export default ProductDetail;
