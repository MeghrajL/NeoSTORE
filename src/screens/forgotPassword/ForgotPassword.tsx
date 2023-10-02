import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import GenericButton from '../../components/generic/GenericButton/GenericButton';
import {validateEmail} from '../../helpers/validators';
import GenericText from '../../components/generic/GenericText/GenericText';
import InputWithError from '../../components/generic/InputWithError/InputWithError';
import {styles} from './style';
import {ForgotPasswordScreenNavigationProp} from '../../navigation/type';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {forgotPassword} from '../../redux/slices/authSlice/authSlice';
import Tick from '../../components/generic/Tick/Tick';
import Load from '../../components/generic/Load/Load';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import ButtonAnimated from '../../components/generic/ButtonAnimated/ButtonAnimated';
const ForgotPassword = ({navigation}: ForgotPasswordScreenNavigationProp) => {
  const [showErr, setShowErr] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSubmit, setEmailSubmit] = useState(false);
  const dispatch = useAppDispatch();

  const forgotLoading = useAppSelector(state => state.auth.isLoading);

  function emailForgotHandler(emailForgot: string): void {
    setEmail(emailForgot);
    console.log(emailForgot);
  }

  async function press() {
    //   dis(emailForgot);
    setShowErr(true);
    console.log('submit');

    if (!email.trim() || !validateEmail(email)) {
      Alert.alert('Please enter correct details');
    } else {
      try {
        await dispatch(forgotPassword(email)).unwrap();
        setEmailSubmit(true);
        setTimeout(() => {
          setEmailSubmit(false);
          setEmail('');
          navigation.navigate('SignIn');
        }, 1300);
      } catch {
        console.log('some error');
      }
    }
  }
  console.log(emailForgotHandler, email);
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingScrollView
          bounces={false}
          contentContainerStyle={styles.content}>
          <Image
            style={styles.imageStyle}
            source={require('../../assets/images/forgotpass.png')}
          />
          <View style={styles.instruction}>
            <GenericText style={styles.textStyle}>
              Enter your email for verification process.
            </GenericText>
            <GenericText style={styles.textStyle}>
              We will mail you the new password.
            </GenericText>
          </View>
          <InputWithError
            placeholder={'Email'}
            maxLength={30}
            inputMode={'email'}
            icon={'email'}
            onChangeText={emailForgotHandler}
            value={email}
            validator={validateEmail}
            showErr={showErr}
            errorText={'Please enter correct email address'}
          />

          <View style={styles.buttonContainer}>
            <ButtonAnimated
              onPress={press}
              title="Submit"
              fontSize={26}
              isDone={emailSubmit}
              isLoading={forgotLoading}
            />
          </View>
        </KeyboardAvoidingScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ForgotPassword;
