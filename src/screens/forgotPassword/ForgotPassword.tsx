import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useState} from 'react';
import GenericButton from '../../components/generic/GenericButton/GenericButton';
import {validateEmail} from '../../helpers/validators';
import GenericText from '../../components/generic/GenericText/GenericText';
import InputWithError from '../../components/generic/InputWithError/InputWithError';
import {styles} from './style';
import {ForgotPasswordScreenNavigationProp} from '../../navigation/type';
const ForgotPassword = ({navigation}: ForgotPasswordScreenNavigationProp) => {
  const [showErr, setShowErr] = useState(false);
  const [emailForgot, setEmailForgot] = useState('');

  function emailForgotHandler(emailForgot: string): void {
    setEmailForgot(emailForgot);
    console.log(emailForgot);
  }

  function press() {
    //   dis(emailForgot);
    setShowErr(true);
    console.log('submit');
    navigation.navigate('SignIn');
  }
  console.log(emailForgotHandler, emailForgot);
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior for iOS or Android
        style={styles.contentContainer}>
        <GenericText style={styles.title}>Forgot Password</GenericText>
        <Image
          style={styles.imageStyle}
          source={require('../../assets/images/forgotpass.png')}
        />
        <View style={styles.instruction}>
          <GenericText>Enter your email for verification process.</GenericText>
          <GenericText>We will mail you the new password.</GenericText>
        </View>
        <InputWithError
          placeholder={'Email'}
          maxLength={30}
          inputMode={'email'}
          icon={'email'}
          onChangeText={emailForgotHandler}
          value={emailForgot}
          validator={validateEmail}
          showErr={showErr}
          errorText={'Please enter correct email address'}
        />
        <GenericButton
          onPress={press}
          title="Submit"
          fontSize={26}
          fontFamily="Gilroy-Bold"
          style={styles.buttonStyle}
          color="white"
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ForgotPassword;
