import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {ChangePasswordScreenNavigationProp} from '../../navigation/type';
import {styles} from './style';
import GenericText from '../../components/generic/GenericText/GenericText';
import InputWithError from '../../components/generic/InputWithError/InputWithError';
import GenericButton from '../../components/generic/GenericButton/GenericButton';
import {validatePassword} from '../../helpers/validators';

const ChangePassword = ({navigation}: ChangePasswordScreenNavigationProp) => {
  const [showErr, setShowErr] = useState(false);
  const [samePass, setSamePass] = useState(false);

  const [pass, setPass] = useState({
    old_password: '',
    password: '',
    confirm_password: '',
  });

  function press() {
    //   dis(emailForgot);
    setShowErr(true);
    console.log('submit');
    // navigation.navigate('Home');
  }

  function passwordHandler(password: string) {
    setPass({...pass, password});
  }

  function confirmPasswordHandler(confirm_password: string) {
    setPass({...pass, confirm_password});
    if (pass.password === confirm_password) {
      setSamePass(true);
    } else {
      setSamePass(false);
    }
  }
  // console.log(emailForgotHandler, emailForgot);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={{flex: 1}}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={Platform.OS === 'ios' ? -70 : 70}
          enabled
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Adjust behavior for iOS or Android
          style={styles.contentContainer}>
          {/* <GenericText style={styles.title}>Forgot Password</GenericText> */}
          <View style={{gap: 30}}>
            <Image
              style={styles.imageStyle}
              source={require('../../assets/images/change.png')}
            />
            <View style={styles.instruction}>
              {/* <GenericText>Create new password</GenericText> */}
              {/* <GenericText>We will mail you the new password.</GenericText> */}
            </View>

            <InputWithError
              placeholder={'Old Password'}
              maxLength={20}
              inputMode={'text'}
              icon={'account-lock-open'}
              onChangeText={passwordHandler}
              value={pass.password}
              validator={validatePassword}
              showErr={showErr}
              errorText={'Please enter old password'}
            />

            <InputWithError
              placeholder={'Password'}
              maxLength={20}
              inputMode={'text'}
              icon={'account-lock-open'}
              onChangeText={passwordHandler}
              value={pass.password}
              validator={validatePassword}
              showErr={showErr}
              errorText={'Please enter correct password'}
            />

            <InputWithError
              placeholder={'Confirm Password'}
              maxLength={20}
              inputMode={'text'}
              icon={'account-lock'}
              onChangeText={confirmPasswordHandler}
              value={pass.confirm_password}
              validator={() => samePass}
              samePass={samePass}
              showErr={showErr}
              errorText={'Both passwords should match'}
            />
            <GenericButton
              onPress={press}
              title="Submit"
              fontSize={26}
              fontFamily="Gilroy-Bold"
              style={styles.buttonStyle}
              color="white"
            />
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePassword;
