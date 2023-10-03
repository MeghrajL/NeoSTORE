import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Vibration} from 'react-native';

import {OrderDetailScreenNavigationProp} from '../../navigation/type';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {getOrderDetails} from '../../redux/slices/orderSlice/actions';
import {setProductRating} from '../../redux/slices/productSlice/actions';

import {styles} from './style';
import GenericText from '../../components/Generic/GenericText/GenericText';
import CartSummaryItem from '../../components/Generic/CartSummaryItem/CartSummaryItem';
import DeliveryDetails from '../../components/Generic/DeliveryDetails/DeliveryDetails';
import OrderDetailCard from '../../components/OrderDetailComponents/OrderDetailCard/OrderDetailCard';
import RatingModal from '../../components/OrderDetailComponents/RatingModal/RatingModal';
import Loading from '../../components/Generic/Loading/Loading';
import ErrorScreen from '../../components/Generic/ErrorScreen/ErrorScreen';

/**
 * @author Meghraj Vilas Lot
 * @param {OrderDetailScreenNavigationProp}
 * @description displays order details which include delivery details,order summary,
 * and list of item which can be rated
 * @returns jsx for order details screen
 */

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
      .catch((error: any) => {
        console.log(error);
      });
  }, [dispatch, access_token]);

  const orderDetails = useAppSelector(state => state.order.orderDetails?.data);
  const {isLoading, isError} = useAppSelector(state => state.order);

  const navigateToProductDetail = (product_id: number) => {
    navigation.navigate('ProductDetail', {
      product_id: product_id,
      shouldLoadSimilarProducts: true,
    });
  };

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
      setTimeout(() => {
        setRatingSubmitted(false);
        setModalVisible(false);
      }, 1000);
      Vibration.vibrate(200);
    } catch (error) {
      console.log(error);
    }
  };

  const Header = () => {
    return (
      <>
        <OrderDetailCard
          order_id={order_id}
          created={created}
          cartTotal={orderDetails?.cost}
        />
        <DeliveryDetails userData={userData} address={orderDetails?.address} />

        <View style={styles.header}>
          <GenericText style={styles.titleText} textType="medium">
            Cart Summary
          </GenericText>
          <GenericText style={styles.quanText}>
            Total Items : {orderDetails?.order_details.length}
          </GenericText>
        </View>
      </>
    );
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorScreen />
      ) : (
        <>
          <FlatList
            contentContainerStyle={styles.content}
            ListHeaderComponent={<Header />}
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
        </>
      )}
    </View>
  );
};

export default OrderDetail;
