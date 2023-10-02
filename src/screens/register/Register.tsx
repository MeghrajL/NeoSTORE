import React, {useEffect, useState} from 'react';
import {
  View,
  SafeAreaView,
  Image,
  Switch,
  TouchableOpacity,
  Touchable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Pressable,
  Text,
  Alert,
  Keyboard,
  Vibration,
} from 'react-native';

import {RegisterScreenNavigationProp} from '../../navigation/type';
import {styles} from './style';
import Title from '../../components/generic/Title/Title';
import Gender from '../../components/registerComponents/Gender/Gender';
import Agree from '../../components/registerComponents/Agree/Agree';
import InputWithError from '../../components/generic/InputWithError/InputWithError';
import Footer from '../../components/registerComponents/Footer/Footer';
import GenericButton from '../../components/generic/GenericButton/GenericButton';
import {
  validateName,
  validateEmail,
  validatePassword,
  validatePhone,
} from '../../helpers/validators';
import {registerUser} from '../../redux/slices/authSlice/authSlice';

import {useAppDispatch, useAppSelector} from '../../redux/store';
import Load from '../../components/generic/Load/Load';
import Tick from '../../components/generic/Tick/Tick';

const Register = ({navigation}: RegisterScreenNavigationProp) => {
  const [isRegisterDone, setRegisterDone] = useState(false);

  const [checkBoxChecked, setCheckBoxChecked] = useState(false);
  const keyboardVerticalOffset = 10;
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

  // const status = useAppSelector(state => state.auth.user[0].status);
  const {isLoading} = useAppSelector(state => state.auth);

  function fnameHandler(first_name: string) {
    setUser({...user, first_name});
  }

  function lnameHandler(last_name: string) {
    setUser({...user, last_name});
  }

  function emailHandler(email: string) {
    setUser({...user, email: email.toLowerCase()});
  }

  function passwordHandler(password: string) {
    setUser({...user, password});
  }

  function confirmPasswordHandler(confirm_password: string) {
    setUser({...user, confirm_password});
    if (user.password === confirm_password) {
      setSamePass(true);
    } else {
      setSamePass(false);
    }
  }

  function phoneNumberHandler(phone_no: string) {
    setUser({...user, phone_no});
  }

  function onSignInPress() {
    navigation.navigate('SignIn');
  }
  function maleHandler() {
    setUser({...user, gender: 'M'});
  }

  function femaleHandler() {
    setUser({...user, gender: 'F'});
  }

  function checkboxHandler() {
    setCheckBoxChecked(!checkBoxChecked);
  }

  async function onRegisterPress() {
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
  }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.safeAreaStyle}>
        {/* <Pressable onPress={() => navigation.navigate('MainNav')}>
          <Text>nav</Text>
        </Pressable>
        */}
        {/* <Pressable onPress={() => navigation.navigate('Onboarding')}>
        <Text>ob</Text>
      </Pressable> */}

        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          // keyboardVerticalOffset={keyboardVerticalOffset}
          style={styles.containerStyle}>
          <ScrollView>
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
                errorText={'Required'}
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
                errorText={'Required'}
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
                {isLoading ? (
                  <Load />
                ) : !isRegisterDone ? (
                  <GenericButton
                    onPress={onRegisterPress}
                    title="Register"
                    fontSize={26}
                    fontFamily="Gilroy-Bold"
                    style={styles.buttonStyle}
                    color="white"
                  />
                ) : (
                  <Tick />
                )}
              </View>

              <Footer
                dialogueText="Already have an account?"
                clickText="Sign In"
                onClickPress={onSignInPress}
              />
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default Register;
