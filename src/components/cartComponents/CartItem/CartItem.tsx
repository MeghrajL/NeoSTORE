import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import {useAppDispatch, useAppSelector} from '../../../redux/store';
import debounce from 'lodash.debounce';
import {
  deleteCart,
  editCart,
  getCartList,
} from '../../../redux/slices/cartSlice/cartSlice';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../../../assets/colors';
import {SwipeRow} from 'react-native-swipe-list-view';
import GenericText from '../../generic/GenericText/GenericText';
import IconButton from '../../generic/IconButton/IconButton';
const CartItem = ({item, onPress}) => {
  //   const [quantity, setQuantity] = useState(item.quantity);
  const [newQuantity, setNewQuantity] = useState(item.quantity);
  const dispatch = useAppDispatch();
  const access_token = useAppSelector(
    state => state.auth.user?.data.access_token,
  );
  console.log(newQuantity);
  console.log(item);

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
    <SwipeRow
      leftOpenValue={75}
      rightOpenValue={-75}
      disableLeftSwipe={false}
      disableRightSwipe={true}>
      <View
        style={{
          alignItems: 'flex-end',
          // backgroundColor: 'white',
          paddingRight: 30,
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
        {/* <Button title="del" onPress={() => handleDeleteCartItem()} /> */}
        <IconButton
          color="red"
          onPressCustom={() => handleDeleteCartItem()}
          icon="trash-bin"
          size={25}
        />
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            width: '70%',
            // backgroundColor: 'red',
            gap: 10,
          }}
          onPress={() => onPress(item.product_id)}>
          <View
            style={{
              width: '50%',
              height: '100%',
              // backgroundColor: 'blue',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={styles.imageStyle}
              source={{
                uri: item.product.product_images,
              }}
            />
          </View>

          <View
            style={{
              width: '50%',
              height: '100%',
              justifyContent: 'center',
              gap: 10,
            }}>
            <GenericText style={styles.nameStyle}>
              {item.product.name}
            </GenericText>
            <GenericText style={styles.costStyle}>
              ₹{item.product.cost}
            </GenericText>
          </View>
        </TouchableOpacity>

        <View
          style={{
            width: '30%',
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={styles.iconContainer}>
            <IconButton
              color="white"
              onPressCustom={() => handleQuantityChange(newQuantity - 1)}
              icon="remove-outline"
              size={20}
            />
          </View>

          <GenericText textType="medium" style={styles.quantityText}>
            {newQuantity}
          </GenericText>
          <View style={styles.iconContainer}>
            <IconButton
              color="white"
              onPressCustom={() => handleQuantityChange(newQuantity + 1)}
              icon="add-outline"
              size={20}
            />
          </View>
          <Icon name="chevron-back" size={12} color={colors.MIDNIGHT} />
        </View>
        {/* <View>
        </View> */}
      </View>
    </SwipeRow>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  quantityText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
    color: colors.RICH_BLACK,
  },
  controlCon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    backgroundColor: colors.VIVID_GAMBOGE,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    width: 30,
    height: 30,
  },
  container: {
    flex: 1,
    height: 130,
    width: '95%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginHorizontal: '2.5%',
    gap: 8,

    shadowColor: '#ccc',
    shadowOpacity: 0.5,
    shadowRadius: 4,
    shadowOffset: {height: 10, width: 0},
    elevation: 10,

    borderRadius: 30,
    borderWidth: 0.5,
    borderColor: '#ccc',
  },
  imageStyle: {
    height: '100%',
    width: '90%',
    resizeMode: 'contain',
    paddingRight: 15,
    // backgroundColor: 'red',
  },
  nameStyle: {
    fontSize: 16,
    color: colors.RICH_BLACK,
  },
  costStyle: {
    fontSize: 16,
    color: colors.RICH_BLACK,
  },
});
