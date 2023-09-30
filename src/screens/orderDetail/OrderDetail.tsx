import {View, Text, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import {OrderDetailScreenNavigationProp} from '../../navigation/type';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {getOrderDetails} from '../../redux/slices/orderSlice/orderSlice';

const OrderDetail = ({navigation, route}: OrderDetailScreenNavigationProp) => {
  const {order_id} = route.params;
  const dispatch = useAppDispatch();
  const access_token = useAppSelector(
    state => state.auth.user?.data?.access_token,
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

  return (
    <View>
      <Text>{orderDetails?.id}</Text>
      <Text>{orderDetails?.cost}</Text>
      <Text>{orderDetails?.address}</Text>
      <FlatList
        data={orderDetails?.order_details}
        renderItem={({item}) => {
          return (
            <View>
              <Text>{item.prod_name}</Text>
            </View>
          );
        }}
      />
    </View>
  );
};

export default OrderDetail;
