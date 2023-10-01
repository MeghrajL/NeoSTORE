import {View, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {OrderDetailScreenNavigationProp} from '../../navigation/type';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {getOrderDetails} from '../../redux/slices/orderSlice/orderSlice';
import GenericText from '../../components/generic/GenericText/GenericText';
import CartSummaryItem from '../../components/generic/CartSummaryItem/CartSummaryItem';
import {styles} from './style';
import DeliveryDetails from '../../components/generic/DeliveryDetails/DeliveryDetails';
import OrderDetailCard from '../../components/OrderDetailComponents/OrderDetailCard/OrderDetailCard';
import RatingModal from '../../components/OrderDetailComponents/RatingModal/RatingModal';
import {setProductRating} from '../../redux/slices/productSlice/productSlice';

const OrderDetail = ({navigation, route}: OrderDetailScreenNavigationProp) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [ratingProdId, setRatingProdId] = useState(0);
  const [ratingSubmitted, setRatingSubmitted] = useState(false);
  const {order_id, created} = route.params;
  const dispatch = useAppDispatch();
  const access_token = useAppSelector(
    state => state.auth.user?.data?.access_token,
  );
  const userData = useAppSelector(state => state.auth.user?.data);
  const isSettingRating = useAppSelector(
    state => state.product.isSettingRating,
  );

  useEffect(() => {
    dispatch(getOrderDetails({access_token: access_token, order_id: order_id}))
      .then(() => {
        // setDataLoaded(true);
        console.log('success');
      })
      .catch(error => {
        console.error(error);
      });
  }, [dispatch, access_token]);

  const orderDetails = useAppSelector(state => state.order.orderDetails?.data);

  function navigateToProductDetail(product_id: number) {
    navigation.navigate('ProductDetail', {
      product_id: product_id,
      shouldLoadSimilarProducts: true,
    });
  }

  const openModal = (product_id: number) => {
    setModalVisible(true);
    setRatingProdId(product_id);
    console.log(product_id);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const onRatingSubmit = async (rating: number) => {
    console.log(ratingProdId, rating);
    try {
      await dispatch(
        setProductRating({
          product_id: ratingProdId,
          rating: rating,
        }),
      ).unwrap();
      setRatingSubmitted(true);
      console.log('adddessdsdsdsdsddsds');
      // dispatch(getCartList({access_token: access_token}));
      setTimeout(() => {
        setRatingSubmitted(false);
        setModalVisible(false);
      }, 1000);
      // Vibration.vibrate(1000);
    } catch (error) {
      // Toast.show('Something went wrong, Please try again.', Toast.SHORT);
      // setAddedToCart(false);
      // console.error('from detail', error);
    }
  };
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      <FlatList
        contentContainerStyle={styles.content}
        ListHeaderComponent={
          <>
            <OrderDetailCard
              order_id={order_id}
              created={created}
              cartTotal={orderDetails?.cost}
            />
            <DeliveryDetails
              userData={userData}
              address={orderDetails?.address}
            />

            <View style={styles.header}>
              <GenericText style={styles.titleText} textType="medium">
                Cart Summary
              </GenericText>
              <GenericText style={styles.quanText}>
                Total Items : {orderDetails?.order_details.length}
              </GenericText>
            </View>
          </>
        }
        data={orderDetails?.order_details}
        renderItem={({item}) => (
          <CartSummaryItem
            product_id={item.product_id}
            sub_total={item.total}
            quantity={item.quantity}
            name={item.prod_name}
            product_images={item.prod_image}
            rate={true}
            onPress={navigateToProductDetail}
            onRatePress={openModal}
          />
        )}
      />
      <RatingModal
        onClose={closeModal}
        isVisible={isModalVisible}
        onRatingSubmit={onRatingSubmit}
        isSettingRating={isSettingRating}
        ratingSubmitted={ratingSubmitted}
      />
    </View>
  );
};

export default OrderDetail;
