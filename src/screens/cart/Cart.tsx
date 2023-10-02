import {View, SafeAreaView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SwipeListView} from 'react-native-swipe-list-view';

import {useAppDispatch, useAppSelector} from '../../redux/store';
import {getCartList} from '../../redux/slices/cartSlice/actions';
import {CartScreenNavigationProp} from '../../navigation/type';

import {styles} from './style';
import Loading from '../../components/generic/loading/Loading';
import CartItem from '../../components/cartComponents/cartItem/CartItem';
import EmptyCart from '../../components/cartComponents/emptyCart/EmptyCart';
import GenericText from '../../components/generic/genericText/GenericText';
import Load from '../../components/generic/load/Load';
import GenericButton from '../../components/generic/genericButton/GenericButton';
import Tick from '../../components/generic/tick/Tick';
import BottomCard from '../../components/generic/bottomCard/BottomCard';
import ErrorScreen from '../../components/generic/errorScreen/ErrorScreen';

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

  const {cart, isLoading, isError} = useAppSelector(state => state.cart);

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

  async function handleCheckOut() {
    navigation.navigate('Address');
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        {!initialDataLoaded ? (
          <Loading />
        ) : cart?.message === 'Cart Empty' ? (
          <EmptyCart />
        ) : isError ? (
          <ErrorScreen />
        ) : (
          <>
            <SwipeListView
              data={cart?.data}
              contentContainerStyle={styles.swipeView}
              renderItem={({item}) => (
                <View>
                  <CartItem onPress={navigateToProductDetail} item={item} />
                </View>
              )}
              keyExtractor={item => item.id.toString()}
            />

            <BottomCard>
              <View
                style={{
                  gap: 10,
                }}>
                <View style={styles.textView}>
                  <GenericText style={styles.costText}>Cart Total</GenericText>
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
                  onPress={handleCheckOut}
                  title="Proceed to Checkout"
                  fontSize={22}
                  fontFamily="Gilroy-Medium"
                  style={styles.checkoutButtonStyle}
                  color="white"
                />
              ) : (
                <Tick />
              )}
            </BottomCard>
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default Cart;
