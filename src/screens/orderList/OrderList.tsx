import React, {useEffect} from 'react';
import {View, FlatList} from 'react-native';

import {useAppDispatch, useAppSelector} from '../../redux/store';
import {OrderListScreenNavigationProp} from '../../navigation/type';
import {getOrderList} from '../../redux/slices/orderSlice/actions';

import {styles} from './style';
import OrderListItem from '../../components/orderListComponents/orderListItem/OrderListItem';
import Nothing from '../../components/generic/nothing/Nothing';
import Loading from '../../components/generic/loading/Loading';
import ErrorScreen from '../../components/generic/errorScreen/ErrorScreen';

/**
 * @author Meghraj Vilas Lot
 * @param {OrderListScreenNavigationProp}
 * @description displays list of all previous order of the user
 * @returns jsx for order list screen
 */

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
        console.log(error);
      });
  }, [dispatch, access_token]);

  const {isError, isLoading} = useAppSelector(state => state.order);
  const orderList = useAppSelector(state => state.order.orderList?.data);

  console.log(orderList);
  const navigateToOrderDetail = (order_id: number, created: string) => {
    navigation.navigate('OrderDetail', {order_id: order_id, created: created});
  };

  return (
    <View style={styles.container}>
      {isLoading ? (
        <Loading />
      ) : orderList?.length === 0 ? (
        <Nothing />
      ) : isError ? (
        <ErrorScreen />
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
