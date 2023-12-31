import React, {useEffect, useState} from 'react';
import {
  View,
  TouchableWithoutFeedback,
  Alert,
  Keyboard,
  Vibration,
} from 'react-native';

import {RegisterScreenNavigationProp} from '../../navigation/type';
import {styles} from './style';
import Title from '../../components/generic/title/Title';
import Gender from '../../components/registerComponents/gender/Gender';
import Agree from '../../components/registerComponents/agree/Agree';
import InputWithError from '../../components/generic/inputWithError/InputWithError';
import Footer from '../../components/registerComponents/footer/Footer';
import {
  validateName,
  validateEmail,
  validatePassword,
  validatePhone,
} from '../../helpers/validators';

import {useAppDispatch, useAppSelector} from '../../redux/store';
import ButtonAnimated from '../../components/generic/buttonAnimated/ButtonAnimated';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {registerUser} from '../../redux/slices/authSlice/actions';

/**
 * @author Meghraj Vilas Lot
 * @param {ProfileScreenNavigationProp}
 * @description allows user to register displays user registration form
 * @returns jsx for register screen
 */

const Register = ({navigation}: RegisterScreenNavigationProp) => {
  const [isRegisterDone, setRegisterDone] = useState(false);

  const [checkBoxChecked, setCheckBoxChecked] = useState(false);

  const [samePass, setSamePass] = useState(false);
  const [user, setUser] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
    gender: '',
    phone_no: '',
  });

  const [showErr, setShowErr] = useState(false);
  const dispatch = useAppDispatch();

  const {isLoading} = useAppSelector(state => state.auth);

  const fnameHandler = (first_name: string) => {
    setUser({...user, first_name});
  };

  const lnameHandler = (last_name: string) => {
    setUser({...user, last_name});
  };

  const emailHandler = (email: string) => {
    setUser({...user, email: email.toLowerCase()});
  };

  const passwordHandler = (password: string) => {
    setUser({...user, password});
  };

  const confirmPasswordHandler = (confirm_password: string) => {
    setUser({...user, confirm_password});
    if (user.password === confirm_password) {
      setSamePass(true);
    } else {
      setSamePass(false);
    }
  };

  const phoneNumberHandler = (phone_no: string) => {
    setUser({...user, phone_no});
  };

  const onSignInPress = () => {
    navigation.navigate('SignIn');
  };
  const maleHandler = () => {
    setUser({...user, gender: 'M'});
  };

  const femaleHandler = () => {
    setUser({...user, gender: 'F'});
  };

  const checkboxHandler = () => {
    setCheckBoxChecked(!checkBoxChecked);
  };

  const onRegisterPress = async () => {
    setShowErr(true);
    if (
      !samePass ||
      !user.first_name.trim() ||
      !user.last_name.trim ||
      !user.email.trim() ||
      !user.password.trim() ||
      !user.confirm_password.trim() ||
      !user.phone_no.trim() ||
      !validateName(user.first_name) ||
      !validateName(user.last_name) ||
      !validateEmail(user.email) ||
      !validatePassword(user.password) ||
      !validatePhone(user.phone_no) ||
      user.gender === '' ||
      !checkBoxChecked
    ) {
      Alert.alert('Please enter correct details');
    } else {
      try {
        await dispatch(registerUser(user)).unwrap();
        navigation.navigate('MainNav');
        setRegisterDone(true);
        setTimeout(() => {
          navigation.navigate('MainNav');
        }, 1200);
        Vibration.vibrate(200);
      } catch {
        console.log('some error');
      }
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingScrollView
        bounces={false}
        scrollEventThrottle={20}
        contentContainerStyle={styles.content}>
        <Title />
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
            errorText={'Please enter email address in correct format'}
          />

          <InputWithError
            placeholder={'Password'}
            maxLength={20}
            inputMode={'text'}
            icon={'account-lock-open'}
            onChangeText={passwordHandler}
            value={user.password}
            validator={validatePassword}
            showErr={showErr}
            errorText={
              'Your password must be have at least 8 characters long 1 uppercase & 1 lowercase character & 1 number'
            }
          />

          <InputWithError
            placeholder={'Confirm Password'}
            maxLength={20}
            inputMode={'text'}
            icon={'account-lock'}
            onChangeText={confirmPasswordHandler}
            value={user.confirm_password}
            validator={() => samePass}
            samePass={samePass}
            showErr={showErr}
            errorText={'Both passwords should match'}
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

          <Gender
            gender={user.gender}
            maleHandler={maleHandler}
            femaleHandler={femaleHandler}
            showErr={showErr}
          />

          <Agree
            checkBoxChecked={checkBoxChecked}
            checkboxHandler={checkboxHandler}
            showErr={showErr}
          />

          <View style={styles.buttonContainer}>
            <ButtonAnimated
              onPress={onRegisterPress}
              title="Register"
              fontSize={26}
              isDone={isRegisterDone}
              isLoading={isLoading}
            />
          </View>

          <Footer
            dialogueText="Already have an account?"
            clickText="Sign In"
            onClickPress={onSignInPress}
          />
        </View>
      </KeyboardAvoidingScrollView>
    </TouchableWithoutFeedback>
  );
};

export default Register;
