import React, {useState} from 'react';
import {View, FlatList, SafeAreaView} from 'react-native';
import Toast from 'react-native-simple-toast';

import {AddressScreenNavigationProp} from '../../navigation/type';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {
  deleteAddress,
  selectAddress,
} from '../../redux/slices/authSlice/authSlice';

import GenericButton from '../../components/Generic/GenericButton/GenericButton';
import {styles} from './style';
import SelectAddress from '../../components/AddressComponents/SelectAddress/SelectAddress';
import BottomCard from '../../components/Generic/BottomCard/BottomCard';
import GenericText from '../../components/Generic/GenericText/GenericText';
import CheckoutProgress from '../../components/Generic/CheckoutProgress/CheckoutProgress';
import EmptyAddress from '../../components/AddressComponents/EmptyAddress/EmptyAddress';
import OptionModal from '../../components/Generic/OptionModal/OptionModal';

/**
 * @author Meghraj Vilas Lot
 * @param {AddressScreenNavigationProp}
 * @description allows user to see saved address list
 * @returns jsx for address list screen
 */

const Address = ({navigation}: AddressScreenNavigationProp) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const addressList = useAppSelector(state => state.auth.addressData);
  const total = useAppSelector(state => state.cart.cart?.total);
  const dispatch = useAppDispatch();
  const [addressId, setAddressId] = useState('');

  const handleDelete = () => {
    dispatch(deleteAddress(addressId));
    setModalVisible(false);
    Toast.show('Address Deleted Successfully', Toast.SHORT);
  };

  const onDeletePress = (id: string) => {
    setModalVisible(true);
    setAddressId(id);
  };

  const onSelectPress = (id: string) => {
    dispatch(selectAddress(id));
  };
  const onEditPress = (id: string) => {
    navigation.navigate('AddAddress', {id});
  };
  const onProceedPress = () => {
    navigation.navigate('Payment', {id: addressList.lastSelectedAddressId});
  };
  const onAddPress = () => {
    navigation.navigate('AddAddress', {id: ''});
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={{backgroundColor: 'white', flex: 1}}>
        {addressList.addressList.length === 0 ? (
          <EmptyAddress onPress={onAddPress} />
        ) : (
          <>
            <CheckoutProgress id={1} />

            <FlatList
              data={addressList.addressList}
              contentContainerStyle={styles.listView}
              renderItem={({item}) => (
                <SelectAddress
                  item={item}
                  lastSelectedAddressId={addressList.lastSelectedAddressId}
                  onDeletePress={onDeletePress}
                  onEditPress={onEditPress}
                  onSelectPress={onSelectPress}
                />
              )}
            />

            <BottomCard>
              <View
                style={{
                  gap: 10,
                }}>
                <View style={styles.textView}>
                  <GenericText style={styles.costText}>Cart Total</GenericText>
                  <GenericText style={styles.costText}>₹{total}</GenericText>
                </View>
                <View style={styles.textView}>
                  <GenericText style={styles.deliveryText}>
                    Delivery
                  </GenericText>
                  <GenericText style={styles.freeText}>Free</GenericText>
                </View>
              </View>
              <GenericButton
                onPress={onProceedPress}
                title="Proceed"
                fontSize={22}
                fontFamily="Gilroy-Medium"
                style={styles.checkoutButtonStyle}
                color="white"
              />
            </BottomCard>
          </>
        )}
        <OptionModal
          isVisible={isModalVisible}
          onConfirm={handleDelete}
          onClose={closeModal}
        />
      </View>
    </SafeAreaView>
  );
};

export default Address;
