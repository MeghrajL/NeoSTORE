import {View, Text} from 'react-native';
import React from 'react';
import {PaymentScreenNavigationProp} from '../../navigation/type';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {placeOrder} from '../../redux/slices/orderSlice/orderSlice';
import {getCartList} from '../../redux/slices/cartSlice/cartSlice';
import GenericButton from '../../components/generic/GenericButton/GenericButton';
import {styles} from '../address/style';
import CheckoutProgress from '../../components/generic/CheckoutProgress/CheckoutProgress';

const Payment = ({navigation, route}: PaymentScreenNavigationProp) => {
  const {id} = route.params;
  const Address = useAppSelector(state =>
    state.auth.addressData.addressList.find(
      (address: {id: string}) => address.id === id,
    ),
  );
  const access_token = useAppSelector(
    state => state.auth.user?.data?.access_token,
  );
  const dispatch = useAppDispatch();
  const OnPlaceOrder = async () => {
    try {
      await dispatch(
        placeOrder({
          access_token: access_token,
          address: Address?.address,
        }),
      ).unwrap();
      dispatch(getCartList({access_token: access_token}));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View>
      <CheckoutProgress id={2} />
      <Text>{Address?.address.firstLine}</Text>
      <GenericButton
        // disabled={cartLoading}
        onPress={OnPlaceOrder}
        title="Proceed to Checkout"
        fontSize={22}
        fontFamily="Gilroy-Medium"
        style={styles.checkoutButtonStyle}
        color="white"
      />
    </View>
  );
};

export default Payment;
