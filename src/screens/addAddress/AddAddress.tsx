import {
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  Alert,
  Platform,
} from 'react-native';
import React, {useMemo, useState} from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import CountryPicker from 'react-native-country-picker-modal';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
// import {RadioButton} from 'react-native-paper';
import RadioGroup, {RadioButtonProps} from 'react-native-radio-buttons-group';
import Toast from 'react-native-simple-toast';

import InputWithError from '../../components/generic/InputWithError/InputWithError';
import GenericText from '../../components/generic/GenericText/GenericText';
import GenericButton from '../../components/generic/GenericButton/GenericButton';
import {
  validateAddressLine,
  validateAlpha,
  validatePincode,
} from '../../helpers/validators';
import {styles} from './style';
import {colors} from '../../assets/colors';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {
  addAddress,
  updateAddress,
} from '../../redux/slices/authSlice/authSlice';
import {AddAddressScreenNavigationProp} from '../../navigation/type';

const AddAddress = ({navigation, route}: AddAddressScreenNavigationProp) => {
  const {id} = route.params;
  const currAddress = useAppSelector(state =>
    state.auth.addressData.addressList.find(
      (address: {id: string}) => address.id === id,
    ),
  );
  const [address, setAddress] = useState({
    firstLine: id === '' ? '' : currAddress?.address.firstLine,
    secondLine: id === '' ? '' : currAddress?.address.secondLine,
    city: id === '' ? '' : currAddress?.address.city,
    state: id === '' ? '' : currAddress?.address.state,
    pincode: id === '' ? '' : currAddress?.address.pincode,
    country: id === '' ? 'India' : currAddress?.address.country,
    countryCode: id === '' ? 'IN' : currAddress?.address.countryCode,
    type: id === '' ? 'Home' : currAddress?.address.type,
  });

  const [showErr, setShowErr] = useState(false);
  const dispatch = useAppDispatch();
  const onSelect = (country: any) => {
    setAddress({...address, country: country.name, countryCode: country.cca2});
    // setAddress({...address, countryCode: country.cca2});
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
      !validateAddressLine(address?.firstLine) ||
      !validateAddressLine(address?.secondLine) ||
      !validateAddressLine(address?.city) ||
      !validateAddressLine(address?.state) ||
      !validatePincode(address?.pincode) ||
      !address.firstLine?.trim() ||
      !address.city?.trim() ||
      !address.state?.trim() ||
      !address.secondLine?.trim()
    ) {
      Alert.alert('Please enter all details correctly');
    } else {
      //dipatch
      if (id === '') {
        dispatch(addAddress(address));
        console.log('>', address);
        Toast.show('Address added Successfully', Toast.SHORT);
        navigation.navigate('Address');
      } else {
        const id = currAddress?.id;
        dispatch(updateAddress({id, address}));
        console.log('>', address);
        Toast.show('Address edited Successfully', Toast.SHORT);
        navigation.navigate('Address');
      }
    }
  };
  const [selectedId, setSelectedId] = useState<string | undefined>();
  const radioButtons: RadioButtonProps[] = useMemo(
    () => [
      {
        borderColor: colors.MIDNIGHT,
        color: colors.VIVID_GAMBOGE,
        borderSize: 1.5,
        id: 'Home', // acts as primary key, should be unique and non-empty string
        label: 'Home',
        value: 'Home',
        labelStyle: styles.radioText,
      },
      {
        borderColor: colors.MIDNIGHT,
        color: colors.VIVID_GAMBOGE,
        borderSize: 1.5,
        id: 'Office',
        label: 'Office',
        value: 'Office',
        labelStyle: styles.radioText,
      },
      {
        borderColor: colors.MIDNIGHT,
        color: colors.VIVID_GAMBOGE,
        borderSize: 1.5,
        id: 'Other',
        label: 'Other',
        value: 'Other',
        labelStyle: styles.radioText,
      },
    ],
    [],
  );

  const onRadioPress = (id: string) => {
    setAddress({...address, type: id});
  };
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingScrollView
        containerStyle={styles.container}
        contentContainerStyle={styles.contentContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../../assets/images/Address2.png')}
            style={styles.imageStyle}
          />
        </View>

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
            spacesAllowed={true}
          />

          <InputWithError
            placeholder={'City'}
            maxLength={20}
            inputMode={'text'}
            icon={'city'}
            onChangeText={cityHandler}
            value={address.city}
            validator={validateAddressLine}
            showErr={showErr}
            errorText={'Required'}
            spacesAllowed={true}
          />

          <InputWithError
            placeholder={'State'}
            maxLength={20}
            inputMode={'text'}
            icon={'pine-tree'}
            onChangeText={stateHandler}
            value={address.state}
            validator={validateAddressLine}
            showErr={showErr}
            errorText={'Required'}
            spacesAllowed={true}
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
          <View style={styles.countryContainer}>
            <GenericText style={styles.conFont}>Select Country : </GenericText>

            <CountryPicker
              withFilter={true}
              withAlphaFilter={true}
              onSelect={onSelect}
              countryCode={address.countryCode}
              withCountryNameButton={true}
              withFlagButton={true}
              containerButtonStyle={styles.countryButton}
            />
          </View>

          <RadioGroup
            radioButtons={radioButtons}
            onPress={id => onRadioPress(id)}
            selectedId={address.type}
            layout="row"
          />
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
