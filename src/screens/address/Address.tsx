import {
  View,
  Text,
  Button,
  FlatList,
  TouchableOpacity,
  Alert,
  SafeAreaView,
  Image,
} from 'react-native';
import React, {useMemo} from 'react';
import Toast from 'react-native-simple-toast';

import {AddressScreenNavigationProp} from '../../navigation/type';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {
  deleteAddress,
  selectAddress,
} from '../../redux/slices/authSlice/authSlice';
import GenericButton from '../../components/generic/GenericButton/GenericButton';
import {styles} from './style';
import SelectAddress from '../../components/addressComponents/selectAddress/SelectAddress';
import BottomCard from '../../components/generic/BottomCard/BottomCard';
import GenericText from '../../components/generic/GenericText/GenericText';
import CheckoutProgress from '../../components/generic/CheckoutProgress/CheckoutProgress';
import EmptyAddress from '../../components/addressComponents/emptyAddress/EmptyAddress';

const Address = ({navigation}: AddressScreenNavigationProp) => {
  const addressList = useAppSelector(state => state.auth.addressData);
  const total = useAppSelector(state => state.cart.cart?.total);
  console.log(addressList);
  const dispatch = useAppDispatch();

  const handleDelete = (id: string) => {
    dispatch(deleteAddress(id));
    Toast.show('Address Deleted Successfully', Toast.SHORT);
  };

  const onDeletePress = (id: string) => {
    Alert.alert('Do you want to delete this address?', '', [
      {text: 'Yes', onPress: () => handleDelete(id)},
      {text: 'No', onPress: () => console.log('No Pressed'), style: 'cancel'},
    ]);
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
                // disabled={cartLoading}
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

        {/* </View> */}
      </View>
    </SafeAreaView>
  );
};

export default Address;
