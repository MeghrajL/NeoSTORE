import {
  Alert,
  Image,
  Keyboard,
  SafeAreaView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';

import {forgotPassword} from '../../redux/slices/authSlice/actions';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import {ForgotPasswordScreenNavigationProp} from '../../navigation/type';

import {validateEmail} from '../../helpers/validators';
import {styles} from './style';
import GenericText from '../../components/Generic/GenericText/GenericText';
import InputWithError from '../../components/Generic/InputWithError/InputWithError';
import ButtonAnimated from '../../components/Generic/ButtonAnimated/ButtonAnimated';

/**
 * @author Meghraj Vilas Lot
 * @param {ForgotPasswordScreenNavigationProp}
 * @description allows user to see request a email which contains new password
 * @returns jsx for forgot password screen
 */

const ForgotPassword = ({navigation}: ForgotPasswordScreenNavigationProp) => {
  const [showErr, setShowErr] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSubmit, setEmailSubmit] = useState(false);
  const dispatch = useAppDispatch();

  const forgotLoading = useAppSelector(state => state.auth.isLoading);

  const emailForgotHandler = (emailForgot: string): void => {
    setEmail(emailForgot);
  };

  const onSubmitPress = async () => {
    setShowErr(true);
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
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingScrollView
          bounces={false}
          scrollEventThrottle={20}
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
              onPress={onSubmitPress}
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
