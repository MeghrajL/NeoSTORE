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
  Dimensions,
  PermissionsAndroid,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import ImagePicker from 'react-native-image-crop-picker';
import RNFetchBlob from 'react-native-fetch-blob';
import isURL from 'is-url';
import {androidCameraPermission} from '../../helpers/permission';

import {UpdateDetailsScreenNavigationProp} from '../../navigation/type';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import InputWithError from '../../components/generic/inputWithError/InputWithError';
import {
  validateName,
  validateEmail,
  validatePhone,
} from '../../helpers/validators';
import {styles} from './style';
import GenericText from '../../components/generic/genericText/GenericText';
import GenericInput from '../../components/generic/GenericInput/GenericInput';
import {colors} from '../../assets/colors';
import GenericButton from '../../components/generic/genericButton/GenericButton';
import Load from '../../components/generic/load/Load';
import Tick from '../../components/generic/tick/Tick';
import ButtonAnimated from '../../components/generic/buttonAnimated/ButtonAnimated';
import {updateDetails} from '../../redux/slices/authSlice/actions';

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
  // useEffect(() => {
  //   console.log('🥳🥳🥳🥳🥳🥳🥳🥳🥳', user), [user];
  // });
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
        // console.log(user);
        await dispatch(updateDetails({...user, access_token})).unwrap();
        console.log('success');
        setUpdated(true);
        setTimeout(() => {
          setUpdated(false);
          navigation.navigate('Profile');
        }, 2000);
        // Vibration.vibrate(1000);
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

  async function imageUrlToBase64(imageUrl: any) {
    try {
      const response = await RNFetchBlob.config({
        fileCache: true,
      }).fetch('GET', imageUrl);

      // Get the base64 string from the response
      const base64String = await response.base64();

      return base64String;
    } catch (error) {
      console.error('Error converting image URL to base64:', error);
      return null;
    }
  }

  let imageSource;

  if (user.profile_pic === null || user.profile_pic === '') {
    if (userData?.gender === 'M') {
      imageSource = require('../../assets/images/man.png');
    } else if (userData?.gender === 'F') {
      imageSource = require('../../assets/images/woman.png');
    }
  } else {
    imageSource = {uri: user.profile_pic};

    if (isURL(user.profile_pic)) {
      //convert
      console.log('is url');
      imageUrlToBase64(user.profile_pic)
        .then(base64String => {
          // console.log(base64String);
          const f = 'data:image/jpg;base64,' + base64String;
          console.log('>>>>>', f);
          setUser({...user, profile_pic: f});
          // imageSource = {uri: f};
        })
        .catch(error => {
          console.error('Error:', error);
        });
    } else {
      console.log('is base');
    }
  }

  const onSelectImage = async () => {
    const permissionStatus = await androidCameraPermission();
    if (permissionStatus || Platform.OS == 'ios') {
      Alert.alert('Profile Picture', 'Choose an option', [
        {text: 'Camera', onPress: onCamera},
        {text: 'Gallery', onPress: onGallery},
        {text: 'Cancel', onPress: () => {}},
      ]);
    }
  };

  const onCamera = () => {
    ImagePicker.openCamera({
      includeBase64: true,
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.5,
    }).then(image => {
      // console.log(image);
      storeImage(image);
    });
  };

  const onGallery = () => {
    ImagePicker.openPicker({
      includeBase64: true,
      width: 300,
      height: 400,
      cropping: true,
      compressImageQuality: 0.5,
    }).then(image => {
      // console.log('selected Image', image);
      storeImage(image);
    });
  };

  function storeImage(imageData: any) {
    const profile_pic = 'data:image/jpg;base64,' + imageData.data;
    // console.log('🥳🥳🥳🥳🥳🥳🥳🥳🥳', profile_pic);
    setUser({...user, profile_pic});
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingScrollView
        containerStyle={styles.container}
        scrollEventThrottle={20}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.picContainer}>
          <View style={styles.imageContainer}>
            <Image source={imageSource} style={styles.imageStyle} />
          </View>
          <TouchableOpacity onPress={onSelectImage} style={styles.cameraIcon}>
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
            errorText={'Only use alphabets'}
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
            errorText={'Only use alphabets'}
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
              style={styles.dateView}
              onPress={() => setOpen(true)}>
              <View style={styles.dateInnerView}>
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
            {/* {isLoading ? (
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
            )} */}
            <ButtonAnimated
              onPress={press}
              title="Submit"
              fontSize={26}
              isDone={profileUpdated}
              isLoading={isLoading}
            />
          </View>
        </View>
      </KeyboardAvoidingScrollView>
    </TouchableWithoutFeedback>
  );
};

export default UpdateDetails;
