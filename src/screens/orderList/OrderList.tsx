import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {getOrderList} from '../../redux/slices/orderSlice/orderSlice';
import {OrderListScreenNavigationProp} from '../../navigation/type';

const OrderList = ({navigation}: OrderListScreenNavigationProp) => {
  const dispatch = useAppDispatch();
  const access_token = useAppSelector(
    state => state.auth.user?.data?.access_token,
  );

  useEffect(() => {
    dispatch(getOrderList({access_token: access_token}))
      .then(() => {
        // setDataLoaded(true);
        console.log('success');
      })
      .catch(error => {
        console.error(error);
      });
  }, [dispatch, access_token]);

  const orderList = useAppSelector(state => state.order.orderList?.data);

  const navigateToOrderDetail = (order_id: number) => {
    navigation.navigate('OrderDetail', {order_id: order_id});
  };

  return (
    <View>
      <Text>OrderList</Text>
      <FlatList
        data={orderList}
        renderItem={({item}) => {
          return (
            <TouchableOpacity onPress={() => navigateToOrderDetail(item.id)}>
              <Text>{item.id}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

export default OrderList;
