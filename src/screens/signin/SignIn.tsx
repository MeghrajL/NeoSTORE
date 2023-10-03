import {
  View,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Vibration,
} from 'react-native';
import React, {useState} from 'react';

import {SignInScreenNavigationProp} from '../../navigation/type';
import {styles} from './style';
import GenericText from '../../components/Generic/GenericText/GenericText';
import Title from '../../components/Generic/Title/Title';
import InputWithError from '../../components/Generic/InputWithError/InputWithError';
import Footer from '../../components/RegisterComponents/Footer/Footer';
import {validateEmail, validatePassword} from '../../helpers/validators';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {Button} from 'react-native';

import ButtonAnimated from '../../components/Generic/ButtonAnimated/ButtonAnimated';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {signInUser} from '../../redux/slices/authSlice/actions';

/**
 * @author Meghraj Vilas Lot
 * @param {SignInScreenNavigationProp}
 * @description allows user to sign in using email & password
 * @returns jsx for signin screen
 */

const SignIn = ({navigation}: SignInScreenNavigationProp) => {
  const [showErr, setShowErr] = useState(false);
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [isSignInDone, setSignInDone] = useState(false);

  const dispatch = useAppDispatch();
  const {isLoading} = useAppSelector(state => state.auth);

  const emailHandler = (email: string) => {
    setUser({...user, email: email.toLowerCase()});
  };

  const passwordHandler = (password: string) => {
    setUser({...user, password});
  };

  const onRegisterPress = () => {
    navigation.navigate('Register');
  };

  const onForgotPress = () => {
    navigation.navigate('ForgotPassword');
  };

  const onSignInPress = async () => {
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
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingScrollView
        bounces={false}
        scrollEventThrottle={20}
        contentContainerStyle={styles.content}>
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
      </KeyboardAvoidingScrollView>
    </TouchableWithoutFeedback>
  );
};

export default SignIn;
