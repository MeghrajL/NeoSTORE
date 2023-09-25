import {
  View,
  Text,
  SafeAreaView,
  Button,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useState} from 'react';
import {UpdateDetailsScreenNavigationProp} from '../../navigation/type';
import {updateDetails} from '../../redux/slices/authSlice/authSlice';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import InputWithError from '../../components/generic/InputWithError/InputWithError';
import {
  validateName,
  validateEmail,
  validatePhone,
} from '../../helpers/validators';
import {styles} from './style';
import GenericText from '../../components/generic/GenericText/GenericText';

const UpdateDetails = ({navigation}: UpdateDetailsScreenNavigationProp) => {
  const [showErr, setShowErr] = useState(false);

  const userData = useAppSelector(
    state => state.auth.userAccountDetails?.data?.user_data,
  );
  const [user, setUser] = useState({
    first_name: userData?.first_name,
    last_name: userData?.last_name,
    email: userData?.email,
    dob: userData?.dob,
    profile_pic: userData?.profile_pic,
    phone_no: userData?.phone_no,
  });

  const access_token = useAppSelector(
    state => state.auth.user?.data?.access_token,
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

  function fnameHandler(first_name: string) {
    setUser({...user, first_name});
  }

  function lnameHandler(last_name: string) {
    setUser({...user, last_name});
  }

  function emailHandler(email: string) {
    setUser({...user, email: email.toLowerCase()});
  }
  function phoneNumberHandler(phone_no: string) {
    setUser({...user, phone_no});
  }

  const handleDateSelect = (date: any) => {
    console.log(date.dateString);
    setUser({...user, dob: date.dateString});
    setCalendarVisible(false);
  };
  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.formView}>
        <InputWithError
          placeholder={'First Name'}
          maxLength={20}
          inputMode={'text'}
          icon={'human-greeting-variant'}
          onChangeText={fnameHandler}
          value={user.first_name}
          validator={validateName}
          showErr={showErr}
          errorText={'Please do not use spaces'}
        />

        <InputWithError
          placeholder={'Last Name'}
          maxLength={20}
          inputMode={'text'}
          icon={'human-queue'}
          onChangeText={lnameHandler}
          value={user.last_name}
          validator={validateName}
          showErr={showErr}
          errorText={'Please do not use spaces'}
        />

        <InputWithError
          placeholder={'Email'}
          maxLength={30}
          inputMode={'email'}
          icon={'email'}
          onChangeText={emailHandler}
          value={user.email}
          validator={validateEmail}
          showErr={showErr}
          errorText={'Please enter correct email address'}
        />

        <InputWithError
          placeholder={'Phone Number'}
          maxLength={10}
          inputMode={'numeric'}
          icon={'phone-classic'}
          onChangeText={phoneNumberHandler}
          value={user.phone_no}
          validator={validatePhone}
          showErr={showErr}
          errorText={'Please enter 10 digit phone number'}
        />

        <GenericText>Date of Birth</GenericText>
        <Button
          title="Open calendar"
          onPress={() => setCalendarVisible(true)}
        />

        <Button title="dispatch" onPress={press} />
      </View>
    </KeyboardAvoidingView>
  );
};

export default UpdateDetails;
