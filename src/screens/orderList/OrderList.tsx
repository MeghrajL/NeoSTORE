import {View, Text, FlatList, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {getOrderList} from '../../redux/slices/orderSlice/orderSlice';
import {OrderListScreenNavigationProp} from '../../navigation/type';
import OrderListItem from '../../components/orderListComponents/OrderListItem/OrderListItem';
import {styles} from './style';
import GenericText from '../../components/generic/GenericText/GenericText';
import Nothing from '../../components/generic/nothing/Nothing';
import Loading from '../../components/generic/Loading/Loading';

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
  console.log(orderList);
  const navigateToOrderDetail = (order_id: number, created: string) => {
    navigation.navigate('OrderDetail', {order_id: order_id, created: created});
  };

  return (
    <View style={styles.container}>
      {orderList?.length === 0 ? (
        <Nothing />
      ) : (
        <FlatList
          contentContainerStyle={styles.content}
          data={orderList}
          renderItem={({item}) => (
            <OrderListItem
              item={item}
              navigateToOrderDetail={navigateToOrderDetail}
            />
          )}
        />
      )}
    </View>
  );
};

export default OrderList;
