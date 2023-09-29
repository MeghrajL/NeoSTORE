import {
  View,
  Text,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  TouchableOpacity,
  GestureResponderEvent,
  Alert,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import CountryPicker from 'react-native-country-picker-modal';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {RadioButton} from 'react-native-paper';

import InputWithError from '../../components/generic/InputWithError/InputWithError';
import GenericText from '../../components/generic/GenericText/GenericText';
import GenericButton from '../../components/generic/GenericButton/GenericButton';
import {
  validateAddressLine,
  validateAlpha,
  validateName,
  validatePincode,
} from '../../helpers/validators';
import {styles} from './style';
import {colors} from '../../assets/colors';
import {useAppDispatch} from '../../redux/store';
import {addAddress} from '../../redux/slices/authSlice/authSlice';

const AddAddress = () => {
  const [address, setAddress] = useState({
    firstLine: '',
    secondLine: '',
    city: '',
    state: '',
    pincode: '',
    country: 'India',
    type: 'Home',
  });

  const [code, setCode] = useState<any>('IN');
  const [showErr, setShowErr] = useState(false);
  const dispatch = useAppDispatch();
  const onSelect = (country: any) => {
    setAddress({...address, country: country.name});
    setCode(country.cca2);
    console.log(country);
  };

  const firstLineHandler = (firstLine: string) => {
    setAddress({...address, firstLine});
  };

  const secondLineHandler = (secondLine: string) => {
    setAddress({...address, secondLine});
  };

  const cityHandler = (city: string) => {
    setAddress({...address, city});
  };

  const stateHandler = (state: string) => {
    setAddress({...address, state});
  };

  const pincodeHandler = (pincode: string) => {
    setAddress({...address, pincode});
  };

  const onAddAddressPress = () => {
    setShowErr(true);
    if (
      !validateAddressLine(address.firstLine) ||
      !validateAddressLine(address.secondLine) ||
      !validateAlpha(address.city) ||
      !validateAlpha(address.state) ||
      !validatePincode(address.pincode) ||
      !address.firstLine.trim() ||
      !address.secondLine.trim()
    ) {
      Alert.alert('Please enter all details correctly');
    } else {
      //dipatch
      dispatch(addAddress(address));
      console.log(address);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingScrollView
        containerStyle={styles.container}
        contentContainerStyle={styles.contentContainer}>
        {/* <View style={styles.picContainer}>
          <View style={styles.imageContainer}>
            <Image source={imageSource} style={styles.imageStyle} />
          </View>
        </View> */}

        <View style={styles.formView}>
          <InputWithError
            placeholder={'House No. / Building Name'}
            maxLength={20}
            inputMode={'text'}
            icon={'home'}
            onChangeText={firstLineHandler}
            value={address.firstLine}
            validator={validateAddressLine}
            showErr={showErr}
            errorText={'Required'}
            spacesAllowed={true}
          />

          <InputWithError
            placeholder={'Street Address'}
            maxLength={20}
            inputMode={'text'}
            icon={'railroad-light'}
            onChangeText={secondLineHandler}
            value={address.secondLine}
            validator={validateAddressLine}
            showErr={showErr}
            errorText={'Required'}
          />

          <InputWithError
            placeholder={'City'}
            maxLength={20}
            inputMode={'text'}
            icon={'city'}
            onChangeText={cityHandler}
            value={address.city}
            validator={validateAlpha}
            showErr={showErr}
            errorText={'Required'}
          />

          <InputWithError
            placeholder={'State'}
            maxLength={20}
            inputMode={'text'}
            icon={'pine-tree'}
            onChangeText={stateHandler}
            value={address.state}
            validator={validateAlpha}
            showErr={showErr}
            errorText={'Required'}
          />

          <InputWithError
            placeholder={'Pincode'}
            maxLength={6}
            inputMode={'numeric'}
            icon={'pin'}
            onChangeText={pincodeHandler}
            value={address.pincode}
            validator={validatePincode}
            showErr={showErr}
            errorText={'Required'}
          />
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              paddingHorizontal: 15,
              justifyContent: 'center',
              alignItems: 'center',
              // backgroundColor: 'red',
              gap: 10,
              height: 60,
            }}>
            <GenericText style={styles.conFont}>Select Country : </GenericText>
            <View
              style={{
                // flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: 0.25,
                borderColor: colors.MIDNIGHT,
                borderRadius: 20,
                width: '40%',
                height: '60%',
                // backgroundColor: 'red',
              }}>
              <CountryPicker
                withFilter={true}
                withAlphaFilter={true}
                onSelect={onSelect}
                countryCode={code}
                withCountryNameButton={true}
              />
              {/* <Icon name="chevron-up" color={colors.MIDNIGHT} size={15} /> */}
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              // backgroundColor: 'red',
              width: '75%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={styles.radioStyle}>
              <View style={styles.circle}>
                <RadioButton
                  value="Home"
                  status={address.type === 'Home' ? 'checked' : 'unchecked'}
                  onPress={() => setAddress({...address, type: 'Home'})}
                />
              </View>
              <GenericText style={styles.conFont}>Home</GenericText>
            </View>
            <View style={styles.radioStyle}>
              <View style={styles.circle}>
                <RadioButton
                  uncheckedColor="black"
                  value="Office"
                  status={address.type === 'Office' ? 'checked' : 'unchecked'}
                  onPress={() => setAddress({...address, type: 'Office'})}
                />
              </View>
              <GenericText style={styles.conFont}>Office</GenericText>
            </View>
            <View style={styles.radioStyle}>
              <View style={styles.circle}>
                <RadioButton
                  value="Other"
                  status={address.type === 'Other' ? 'checked' : 'unchecked'}
                  onPress={() => setAddress({...address, type: 'Other'})}
                />
              </View>
              <GenericText style={styles.conFont}>Other</GenericText>
            </View>
          </View>
          <View style={styles.buttonContainer}>
            <GenericButton
              // disabled={cartLoading}
              onPress={onAddAddressPress}
              title="Submit"
              fontSize={26}
              fontFamily="Gilroy-Medium"
              style={styles.submitButtonStyle}
              color="white"
            />
          </View>
        </View>
      </KeyboardAvoidingScrollView>
    </TouchableWithoutFeedback>
  );
};

export default AddAddress;
