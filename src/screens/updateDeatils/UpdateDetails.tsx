import {View, Text, SafeAreaView, Button} from 'react-native';
import React, {useState} from 'react';
import {UpdateDetailsScreenNavigationProp} from '../../navigation/type';
import {updateDetails} from '../../redux/slices/authSlice/authSlice';
import {useAppDispatch, useAppSelector} from '../../redux/store';

const UpdateDetails = ({navigation}: UpdateDetailsScreenNavigationProp) => {
  const [user, setUser] = useState({
    first_name: 'Meghraj',
    last_name: 'Lot',
    email: 'meghrajlot@gmail.com',
    dob: '30-01-2003',
    profile_pic: '',
    phone_no: '1234567890',
  });
  const access_token = useAppSelector(
    state => state.auth.user?.data?.access_token,
  );
  const userData = useAppSelector(
    state => state.auth.userAccountDetails?.data?.user_data,
  );
  console.log('updated', userData);
  const dispatch = useAppDispatch();

  async function press() {
    try {
      await dispatch(updateDetails({...user, access_token})).unwrap();
      console.log('success');

      // navigation.navigate('Home');
    } catch {
      console.log('some error');
    }
  }

  return (
    <SafeAreaView>
      <View>
        <Text>UpdateDetails</Text>
        <Button title="dispatch" onPress={press} />
      </View>
    </SafeAreaView>
  );
};

export default UpdateDetails;
