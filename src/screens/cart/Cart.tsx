import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  FlatList,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SwipeListView} from 'react-native-swipe-list-view';

import {styles} from './style';
import {CartScreenNavigationProp} from '../../navigation/type';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {getCartList} from '../../redux/slices/cartSlice/cartSlice';
import Loading from '../../components/generic/Loading/Loading';
import CartItem from '../../components/cartComponents/CartItem/CartItem';
import EmptyCart from '../../components/cartComponents/emptyCart/EmptyCart';
import GenericText from '../../components/generic/GenericText/GenericText';
import Load from '../../components/generic/Load/Load';
import GenericButton from '../../components/generic/GenericButton/GenericButton';
import Tick from '../../components/generic/Tick/Tick';

const Cart = ({navigation}: CartScreenNavigationProp) => {
  const dispatch = useAppDispatch();
  const access_token = useAppSelector(
    state => state.auth.user?.data?.access_token,
  );

  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const [checkedOut, setCheckedOut] = useState(false);

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
  console.log('+++++++++++++', cart);

  useEffect(() => {
    if (cart !== null) {
      setInitialDataLoaded(true);
    }
  }, [cart]);

  function navigateToProductDetail(product_id: number) {
    navigation.navigate('ProductDetail', {
      product_id: product_id,
      shouldLoadSimilarProducts: true,
    });
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {!initialDataLoaded ? (
          <Loading />
        ) : cart?.message === 'Cart Empty' ? (
          <EmptyCart />
        ) : (
          <>
            <SwipeListView
              data={cart?.data}
              contentContainerStyle={styles.swipeView}
              renderItem={({item}) => (
                <CartItem onPress={navigateToProductDetail} item={item} />
              )}
              keyExtractor={item => item.id.toString()}
            />

            <View style={styles.container}>
              <View style={styles.topRounded}>
                <View
                  style={{
                    gap: 10,
                  }}>
                  <View style={styles.textView}>
                    <GenericText style={styles.costText}>
                      Cart Total
                    </GenericText>
                    <GenericText style={styles.costText}>
                      ₹{cart?.total}
                    </GenericText>
                  </View>
                  <View style={styles.textView}>
                    <GenericText style={styles.deliveryText}>
                      Delivery
                    </GenericText>
                    <GenericText style={styles.freeText}>Free</GenericText>
                  </View>
                </View>
                {isLoading ? (
                  <Load />
                ) : !checkedOut ? (
                  <GenericButton
                    // disabled={cartLoading}
                    onPress={() => {}}
                    title="Proceed to Checkout"
                    fontSize={22}
                    fontFamily="Gilroy-Medium"
                    style={styles.checkoutButtonStyle}
                    color="white"
                  />
                ) : (
                  <Tick />
                )}
              </View>
            </View>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Cart;
