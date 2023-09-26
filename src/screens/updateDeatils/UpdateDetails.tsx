import {
  View,
  ScrollView,
  KeyboardAvoidingView,
  TouchableOpacity,
  Image,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';

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
import GenericInput from '../../components/generic/GenericInput/GenericInput';
import {colors} from '../../assets/colors';
import GenericButton from '../../components/generic/GenericButton/GenericButton';
import Load from '../../components/generic/Load/Load';
import Tick from '../../components/generic/Tick/Tick';

const UpdateDetails = ({navigation}: UpdateDetailsScreenNavigationProp) => {
  const [showErr, setShowErr] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [profileUpdated, setUpdated] = useState(false);
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
  const isLoading = useAppSelector(state => state.auth.isLoading);

  // console.log('updated', userData);
  const dispatch = useAppDispatch();

  async function press() {
    if (
      !user.first_name?.trim() ||
      !user.last_name?.trim ||
      !user.email?.trim() ||
      !user.phone_no?.trim() ||
      !validateName(user.first_name) ||
      !validateName(user.last_name) ||
      !validateEmail(user.email) ||
      !validatePhone(user.phone_no)
    ) {
      setShowErr(true);

      Alert.alert('Please enter correct details');
    } else {
      try {
        await dispatch(updateDetails({...user, access_token})).unwrap();
        console.log('success');
        setUpdated(true);
        setTimeout(() => {
          setUpdated(false);
          navigation.navigate('Profile');
        }, 2000);
        // Vibration.vibrate(1000);
        // navigation.navigate('Home');
      } catch {
        console.log('some error');
      }
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

  function formatDate(inputDate: Date) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    const dob = `${day}-${month}-${year}`;

    setUser({...user, dob: dob});
    console.log(dob);
  }

  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingScrollView
        containerStyle={styles.container}
        contentContainerStyle={{paddingTop: 20, paddingBottom: 30}}>
        <View style={styles.picContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require('../../assets/images/man.png')}
              style={styles.imageStyle}
            />
          </View>
          <TouchableOpacity onPress={() => {}} style={styles.cameraIcon}>
            <Icon name="camera" size={25} color={colors.MIDNIGHT} />
          </TouchableOpacity>
        </View>

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
          <View
            style={{
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
              width: '93%',
              height: 60,
              gap: 10,
              borderBottomColor: '#aaaaaa',
              borderBottomWidth: 0.7,
            }}>
            <GenericText style={styles.titleFont}>Date of Birth</GenericText>
            <TouchableOpacity
              style={{paddingLeft: 10, width: '100%'}}
              onPress={() => setOpen(true)}>
              <View
                style={{
                  flexDirection: 'row',
                  paddingLeft: 2,
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  // paddingBottom: 10,s
                }}>
                <Icon
                  size={25}
                  name={'calendar-range'}
                  color={colors.MIDNIGHT}
                />

                <GenericText style={styles.dateFont}>
                  {user.dob === null ? `DD/MM/YYYY` : user.dob}
                </GenericText>
              </View>
            </TouchableOpacity>
            <DatePicker
              modal
              open={open}
              mode="date"
              date={date}
              onConfirm={date => {
                setOpen(false);
                console.log(date);
                setDate(date);
                formatDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <Load />
            ) : !profileUpdated ? (
              <GenericButton
                // disabled={cartLoading}
                onPress={press}
                title="Submit"
                fontSize={26}
                fontFamily="Gilroy-Medium"
                style={styles.submitButtonStyle}
                color="white"
              />
            ) : (
              <Tick />
            )}
          </View>
        </View>
      </KeyboardAvoidingScrollView>
    </TouchableWithoutFeedback>
  );
};

export default UpdateDetails;
