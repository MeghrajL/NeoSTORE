import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Modal,
  Keyboard,
  Vibration,
} from 'react-native';
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
// import BottomSheet from '@gorhom/bottom-sheet';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {SignInScreenNavigationProp} from '../../navigation/type';
import {styles} from './style';
import GenericText from '../../components/generic/GenericText/GenericText';
import GenericButton from '../../components/generic/GenericButton/GenericButton';
import Title from '../../components/generic/Title/Title';
import InputWithError from '../../components/generic/InputWithError/InputWithError';
import Footer from '../../components/registerComponents/Footer/Footer';
import {validateEmail, validatePassword} from '../../helpers/validators';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {signInUser} from '../../redux/slices/authSlice/authSlice';
import {Button} from 'react-native';
import BottomNavigationBar from 'react-native-paper/lib/typescript/components/BottomNavigation/BottomNavigationBar';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import Load from '../../components/generic/Load/Load';
import Tick from '../../components/generic/Tick/Tick';
import ButtonAnimated from '../../components/generic/ButtonAnimated/ButtonAnimated';

const SignIn = ({navigation}: SignInScreenNavigationProp) => {
  const [showErr, setShowErr] = useState(false);
  // const [isErr, setIsErr] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [isSignInDone, setSignInDone] = useState(false);

  const dispatch = useAppDispatch();
  const {isLoading} = useAppSelector(state => state.auth);

  function emailHandler(email: string) {
    setUser({...user, email: email.toLowerCase()});
  }

  function passwordHandler(password: string) {
    setUser({...user, password});
  }

  function onRegisterPress() {
    navigation.navigate('Register');
  }

  function onForgotPress() {
    navigation.navigate('ForgotPassword');
  }

  async function onSignInPress() {
    console.log(user);
    setShowErr(true);
    if (
      !user.email.trim() ||
      !user.password.trim() ||
      !validateEmail(user.email) ||
      !validatePassword(user.password)
    ) {
      Alert.alert('Please enter correct details');
    } else {
      try {
        await dispatch(signInUser(user)).unwrap();
        setSignInDone(true);
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
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.containerStyle}>
          <View style={styles.formView}>
            <Title />

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
              placeholder={'Password'}
              maxLength={20}
              inputMode={'text'}
              icon={'account-lock-open'}
              onChangeText={passwordHandler}
              value={user.password}
              validator={validatePassword}
              showErr={showErr}
              errorText={'Please enter correct password'}
            />
            <View style={styles.buttonContainer}>
              {/* {isLoading ? (
                <Load />
              ) : !isSignInDone ? (
                <GenericButton
                  onPress={onSignInPress}
                  title="Sign In"
                  fontSize={26}
                  fontFamily="Gilroy-Bold"
                  style={styles.buttonStyle}
                  color="white"
                />
              ) : (
                <Tick />
              )} */}
              <ButtonAnimated
                onPress={onSignInPress}
                title="Sign In"
                fontSize={26}
                isDone={isSignInDone}
                isLoading={isLoading}
              />
            </View>
            <View style={styles.signInStyle}>
              <TouchableOpacity onPress={onForgotPress}>
                <GenericText textType="regular" style={styles.signInStyle}>
                  Forgot Password?
                </GenericText>
              </TouchableOpacity>
            </View>

            <Footer
              dialogueText="Don't have an account?"
              clickText="Register"
              onClickPress={onRegisterPress}
            />
          </View>
        </KeyboardAvoidingView>
        <Button title="home" onPress={() => navigation.navigate('Home')} />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;
