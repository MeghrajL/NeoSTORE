import {
  View,
  Text,
  SafeAreaView,
  Button,
  ScrollView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';

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

const ProductDetail = ({navigation, route}) => {
  const {product_id} = route.params;
  const [prod_id, setProdId] = useState(product_id);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [quantity, setQuantity] = useState(1);

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
  const isLoading = useAppSelector(state => state.product.isLoading);

  const productData = useAppSelector(state => state.product.productData);
  const productItem = productData.data;

  const category = useAppSelector(state => state.product.category);
  const updatedCategory = category?.data?.filter(item => item.id !== prod_id);

  console.log('>>>>>>>>', updatedCategory);
  const cartStatus = useAppSelector(state => state.cart?.status);
  console.log('😀',cartStatus)
  function handleAddToCart() {
    dispatch(
      addToCart({
        access_token: '65028a8dbbe96',
        product_id: prod_id,
        quantity: quantity,
      }),
    )
      .then(() => {
        // setDataLoaded(true);
        console.log('adddessdsdsdsdsddsds');
      })
      .catch(error => {
        console.error(error);
      });
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
              <GenericButton
                onPress={handleAddToCart}
                title="Add to Cart"
                fontSize={26}
                fontFamily="Gilroy-Bold"
                style={styles.cartButtonStyle}
                color="white"
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
