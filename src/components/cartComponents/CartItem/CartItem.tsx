import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import debounce from 'lodash.debounce';
import {
  deleteCart,
  editCart,
  getCartList,
} from '../../../redux/slices/cartSlice/cartSlice';

const CartItem = ({item}) => {
  //   const [quantity, setQuantity] = useState(item.quantity);
  const [newQuantity, setNewQuantity] = useState(item.quantity);
  const dispatch = useAppDispatch();
  const access_token = useAppSelector(
    state => state.auth.user?.data.access_token,
  );
  console.log(newQuantity);

  const debouncedEditCartItem = useCallback(
    debounce(async (access_token, product_id, quantity) => {
      // Dispatch the action to edit the cart item
      try {
        await dispatch(editCart({access_token, product_id, quantity})).unwrap();
        dispatch(getCartList({access_token: access_token}));
      } catch (error) {
        console.log(error);
      }
    }, 500), // Adjust the debounce delay as needed
    [dispatch],
  );

  const handleQuantityChange = newQuantity => {
    if (newQuantity >= 1 && newQuantity <= 8) {
      setNewQuantity(newQuantity);
      debouncedEditCartItem(access_token, item.product_id, newQuantity);
    }
  };

  async function handleDeleteCartItem() {
    try {
      await dispatch(
        deleteCart({
          access_token: access_token,
          product_id: item.product_id,
        }),
      ).unwrap();
      dispatch(getCartList({access_token: access_token}));
    } catch (error) {
      console.error('from detail', error);
    }
  }

  return (
    <View style={styles.container}>
      <Text>{item.product.name}</Text>

      <Text>{newQuantity}</Text>
      <Button title="+" onPress={() => handleQuantityChange(newQuantity + 1)} />
      <Button title="-" onPress={() => handleQuantityChange(newQuantity - 1)} />
      <Button title="del" onPress={() => handleDeleteCartItem()} />
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'red',
  },
});
