import {
  Button,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import debounce from 'lodash.debounce';
import Icon from 'react-native-vector-icons/Ionicons';
import {SwipeRow} from 'react-native-swipe-list-view';

import {useAppDispatch, useAppSelector} from '../../../redux/store';
import {ICartItem} from '../../../redux/slices/cartSlice/type';
import {
  editCart,
  getCartList,
  deleteCart,
} from '../../../redux/slices/cartSlice/actions';

import {colors} from '../../../assets/colors';
import GenericText from '../../generic/genericText/GenericText';
import IconButton from '../../generic/iconButton/IconButton';

interface ICartItemProps {
  item: ICartItem;
  onPress: Function;
}

/**
 * @author Meghraj Vilas Lot
 * @param {ICartItemProps}
 * @description swipeable cart list item with quantity control and hidden delete button
 * @returns jsx for empty address component
 */

const CartItem = ({item, onPress}: ICartItemProps) => {
  const [newQuantity, setNewQuantity] = useState(item.quantity);
  const dispatch = useAppDispatch();
  const access_token = useAppSelector(
    state => state.auth.user?.data?.access_token,
  );

  const debouncedEditCartItem = useCallback(
    debounce(async (access_token, product_id, quantity) => {
      try {
        await dispatch(editCart({access_token, product_id, quantity})).unwrap();
        dispatch(getCartList({access_token: access_token}));
      } catch (error) {
        console.log(error);
      }
    }, 500),
    [dispatch],
  );

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= 1 && newQuantity <= 8) {
      setNewQuantity(newQuantity);
      debouncedEditCartItem(access_token, item.product_id, newQuantity);
    }
  };

  const handleDeleteCartItem = async () => {
    try {
      await dispatch(
        deleteCart({
          access_token: access_token,
          product_id: item.product_id,
        }),
      ).unwrap();
      dispatch(getCartList({access_token: access_token}));
    } catch (error) {
      console.log('from detail', error);
    }
  };

  return (
    <SwipeRow
      preview={true}
      previewOpenValue={-40}
      previewOpenDelay={300}
      leftOpenValue={75}
      rightOpenValue={-75}
      disableLeftSwipe={false}
      disableRightSwipe={true}>
      <View style={styles.iconButtonContainer}>
        <IconButton
          color={colors.MIDNIGHT}
          onPressCustom={() => handleDeleteCartItem()}
          icon="trash-bin"
          size={25}
        />
      </View>

      <View style={styles.container}>
        <TouchableOpacity
          style={styles.touchStyle}
          onPress={() => onPress(item.product_id)}>
          <View style={styles.imageContainer}>
            <Image
              style={styles.imageStyle}
              source={{
                uri: item.product.product_images,
              }}
            />
          </View>

          <View style={styles.infoContainer}>
            <GenericText style={styles.nameStyle}>
              {item.product.name}
            </GenericText>
            <GenericText style={styles.costStyle}>
              ₹{item.product.cost}
            </GenericText>
          </View>
        </TouchableOpacity>

        <View style={styles.buttonsContainer}>
          <View style={styles.quantity}>
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
          </View>
          <Icon
            style={{paddingLeft: 2}}
            name="chevron-back"
            size={12}
            color={colors.MIDNIGHT}
          />
        </View>
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
  },
  nameStyle: {
    fontSize: 16,
    color: colors.RICH_BLACK,
  },
  costStyle: {
    fontSize: 16,
    color: colors.RICH_BLACK,
  },
  iconButtonContainer: {
    alignItems: 'flex-end',
    paddingRight: 30,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  touchStyle: {
    flexDirection: 'row',
    width: '67.5%',
    height: '100%',
    gap: 10,
  },
  imageContainer: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    width: '50%',
    height: '100%',
    justifyContent: 'center',
    gap: 10,
    paddingRight: 5,
  },
  buttonsContainer: {
    width: '30%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    width: '85%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
});
