import {View, Text, Button, FlatList, TouchableOpacity} from 'react-native';
import React from 'react';
import {AddressScreenNavigationProp} from '../../navigation/type';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {
  deleteAddress,
  selectAddress,
} from '../../redux/slices/authSlice/authSlice';

const Address = ({navigation}: AddressScreenNavigationProp) => {
  const addressList = useAppSelector(state => state.auth.addressData);
  console.log(addressList);
  const dispatch = useAppDispatch();
  const onDeletePress = (id: string) => {
    dispatch(deleteAddress(id));
  };
  const onSelectPress = (id: string) => {
    dispatch(selectAddress(id));
  };
  return (
    <View>
      <Text>Address</Text>
      <Button
        title="add address"
        onPress={() => navigation.navigate('AddAddress', {id: ''})}
      />

      <FlatList
        data={addressList.addressList}
        renderItem={({item}) => (
          <>
            <TouchableOpacity onPress={() => onSelectPress(item.id)}>
              <Text
                style={{
                  backgroundColor:
                    addressList.lastSelectedAddressId === item.id
                      ? 'red'
                      : 'white',
                }}>
                {item.id}#{item.address.firstLine}
              </Text>
            </TouchableOpacity>
            <Button title="del" onPress={() => onDeletePress(item.id)} />
            <Button
              title="edit"
              onPress={() => navigation.navigate('AddAddress', {id: item.id})}
            />
          </>
        )}
      />
    </View>
  );
};

export default Address;
