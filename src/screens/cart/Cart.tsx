import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SwipeListView} from 'react-native-swipe-list-view';

import {CartScreenNavigationProp} from '../../navigation/type';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {getCartList} from '../../redux/slices/cartSlice/cartSlice';
import Loading from '../../components/generic/Loading/Loading';
import CartItem from '../../components/cartComponents/CartItem/CartItem';
import EmptyCart from '../../components/cartComponents/emptyCart/EmptyCart';

const Cart = ({navigation}: CartScreenNavigationProp) => {
  const dispatch = useAppDispatch();
  const access_token = useAppSelector(
    state => state.auth.user?.data?.access_token,
  );

  const [initialDataLoaded, setInitialDataLoaded] = useState(false);

  useEffect(() => {
    dispatch(getCartList({access_token: access_token}))
      .then(() => {
        // setDataLoaded(true);
        console.log('success');
      })
      .catch(error => {
        console.error(error);
      });
  }, [dispatch, access_token]);

  const {cart, isLoading} = useAppSelector(state => state.cart);

  useEffect(() => {
    if (cart?.length !== 0) setInitialDataLoaded(true);
  }, []);

  console.log('+++++++++++++', cart);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1}}>
        {isLoading && !initialDataLoaded ? (
          <Loading />
        ) : cart?.message === 'Cart Empty' ? (
          <EmptyCart />
        ) : (
          <>
            <SwipeListView
              data={cart?.data}
              renderItem={({item}) => <CartItem item={item} />}
              keyExtractor={item => item.id.toString()}
              renderHiddenItem={(data, rowMap) => (
                <View
                  style={{
                    alignItems: 'flex-end',
                    backgroundColor: 'white',
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                  }}>
                  <Text>Left</Text>
                  <Text>Right</Text>
                </View>
              )}
              leftOpenValue={75}
              rightOpenValue={-75}
              disableRightSwipe={true}
            />
          </>
        )}

        {/* <Button onPress={() => navigation.navigate('Register')} title="Nav" /> */}
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({});
