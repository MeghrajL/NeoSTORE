import {View, Text, Button} from 'react-native';
import React from 'react';
import {AddressScreenNavigationProp} from '../../navigation/type';
import {useAppSelector} from '../../redux/store';

const Address = ({navigation}: AddressScreenNavigationProp) => {
  const addressList = useAppSelector(state => state.auth.addressData);
  console.log(addressList);
  return (
    <View>
      <Text>Address</Text>
      <Button
        title="add address"
        onPress={() => navigation.navigate('AddAddress')}
      />
    </View>
  );
};

export default Address;
