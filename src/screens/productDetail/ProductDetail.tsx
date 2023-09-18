import {
  View,
  Text,
  SafeAreaView,
  Button,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Vibration,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Toast from 'react-native-simple-toast';

import {useAppDispatch, useAppSelector} from '../../redux/store';
import {getProduct} from '../../redux/slices/productSlice';
import {addToCart} from '../../redux/slices/cartSlice';

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

const ProductDetail = ({navigation, route}) => {
  const {product_id} = route.params;
  const [prod_id, setProdId] = useState(product_id);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getProduct({product_id: prod_id}))
      .then(() => {
        setDataLoaded(true);
      })
      .catch(error => {
        console.error(error);
      });
  }, [dispatch, prod_id, setDataLoaded]);
  const access_token = useAppSelector(
    state => state.auth.user?.data.access_token,
  );

  const isLoading = useAppSelector(state => state.product.isLoading);

  const productData = useAppSelector(state => state.product.productData);
  const productItem = productData.data;

  const category = useAppSelector(state => state.product.category);
  const updatedCategory = category?.data?.filter(item => item.id !== prod_id);

  console.log('>>>>>>>>', access_token);
  const cartLoading = useAppSelector(state => state.cart?.isLoading);
  // console.log('😀', cartStatus);
  async function handleAddToCart() {
    try {
      await dispatch(
        addToCart({
          access_token: access_token,
          product_id: prod_id,
          quantity: quantity,
        }),
      ).unwrap();
      setAddedToCart(true);
      console.log('adddessdsdsdsdsddsds');
      setTimeout(() => {
        setAddedToCart(false);
      }, 1300);
      Vibration.vibrate(1000);
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

  return (
    <SafeAreaView style={{flex: 1}}>
      {isLoading || !dataLoaded ? (
        <Loading />
      ) : (
        <ScrollView style={styles.container}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.back}>
            <Icon name="arrow-back-outline" color={colors.MIDNIGHT} size={25} />
          </TouchableOpacity>

          <View style={styles.carouselContainer}>
            <ImageCarousel product_images={productItem.product_images} />
          </View>
          <View style={styles.infoContainer}>
            <View style={styles.innerInfo}>
              <View style={styles.visual}>
                <StarRating rating={productItem.rating} />
                <ViewCount count={productItem.view_count} />
              </View>

              <View>
                <GenericText style={styles.producer}>
                  {productItem.producer}
                </GenericText>
              </View>
              <GenericText textType="medium" style={styles.nameText}>
                {productItem.name}
              </GenericText>
              <GenericText style={styles.costText}>
                ₹{productItem.cost}
              </GenericText>
              {/* <GenericText style={styles.descriptionText}>
                Details : {productItem.description}
              </GenericText> */}
              <ReadMore
                seeMoreStyle={styles.seeMoreStyle}
                style={styles.descriptionText}>
                {productItem.description}
              </ReadMore>
            </View>
            <View style={styles.buttonsContainer}>
              <QuantityControl
                quantity={quantity}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
              />
              {!addedToCart ? (
                <GenericButton
                  disabled={cartLoading}
                  onPress={handleAddToCart}
                  title="Add to Cart"
                  fontSize={26}
                  fontFamily="Gilroy-Medium"
                  style={styles.cartButtonStyle}
                  color="white"
                />
              ) : (
                <View style={styles.cartButtonStyle}>
                  <LottieView
                    style={styles.imageStyle}
                    source={require('../../assets/gif/tick.json')}
                    autoPlay
                    loop
                  />
                </View>
              )}
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
                        setProdId(item.id);
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
      )}
    </SafeAreaView>
  );
};

export default ProductDetail;
