import {StyleSheet, Text, View, Button, SafeAreaView} from 'react-native';
import React, {useEffect} from 'react';
import {ExploreScreenNavigationProp} from '../../navigation/type';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {getCartList} from '../../redux/slices/cartSlice';
import Loading from '../../components/generic/Loading/Loading';

const Cart = ({navigation}: ExploreScreenNavigationProp) => {
  const dispatch = useAppDispatch();
  const access_token = useAppSelector(
    state => state.auth.user?.data.access_token,
  );

  const isLoading = useAppSelector(state => state.cart.isLoading);

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
  const cart = useAppSelector(state => state.cart.cart);
  console.log('+++++++++++++', cart);
  return (
    <SafeAreaView>
      <View>
        {isLoading ? <Loading /> : <Text>Explore</Text>}

        <Button onPress={() => navigation.navigate('Register')} title="Nav" />
      </View>
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({});
