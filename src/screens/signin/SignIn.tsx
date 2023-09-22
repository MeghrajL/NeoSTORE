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

const SignIn = ({navigation}: SignInScreenNavigationProp) => {
  // const [err, setErr] = useState(false);
  const [showErr, setShowErr] = useState(false);
  // const [isErr, setIsErr] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const dispatch = useAppDispatch();
  let status = useAppSelector(state => state.auth);
  console.log(status);

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
        navigation.navigate('MainNav');
      } catch {
        console.log('some error');
      }
    }
  }

  return (
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

          <GenericButton
            onPress={onSignInPress}
            title="Sign In"
            fontSize={26}
            fontFamily="Gilroy-Bold"
            style={styles.buttonStyle}
            color="white"
          />
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
  );
};

export default SignIn;
