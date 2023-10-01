import {View, Text, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {OrderDetailScreenNavigationProp} from '../../navigation/type';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {getOrderDetails} from '../../redux/slices/orderSlice/orderSlice';
import GenericText from '../../components/generic/GenericText/GenericText';
import CartSummaryItem from '../../components/generic/CartSummaryItem/CartSummaryItem';
import {styles} from './style';
import DeliveryDetails from '../../components/generic/DeliveryDetails/DeliveryDetails';
import OrderDetailCard from '../../components/OrderDetailComponents/OrderDetailCard/OrderDetailCard';

const OrderDetail = ({navigation, route}: OrderDetailScreenNavigationProp) => {
  const {order_id, created} = route.params;
  const dispatch = useAppDispatch();
  const access_token = useAppSelector(
    state => state.auth.user?.data?.access_token,
  );
  const userData = useAppSelector(state => state.auth.user?.data);

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
  return (
    <View style={{backgroundColor: 'white', flex: 1}}>
      {/* <Text>{orderDetails?.id}</Text>
      <Text>{orderDetails?.cost}</Text>
      <Text>{orderDetails?.address}</Text> */}

      {/* <FlatList
        data={orderDetails?.order_details}
        renderItem={({item}) => {
          return (
            <View>
              <Text>{item.prod_name}</Text>
            </View>
          );
        }}
      /> */}
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
          />
        )}
      />
    </View>
  );
};

export default OrderDetail;
