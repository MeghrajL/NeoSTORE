import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {SignInScreenNavigationProp} from '../../navigation/type';
import {styles} from './style';
import GenericText from '../../components/generic/GenericText/GenericText';
import GenericButton from '../../components/generic/GenericButton/GenericButton';
import Title from '../../components/generic/Title/Title';
import InputWithError from '../../components/generic/InputWithError/InputWithError';
import Footer from '../../components/RegisterComponents/Footer/Footer';
import {validateEmail, validatePassword} from '../../helpers/validators';
const SignIn = ({navigation}: SignInScreenNavigationProp) => {
  const [err, setErr] = useState(false);
  const [showErr, setShowErr] = useState(false);

  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  function emailHandler(email: string) {
    setUser({...user, email: email.toLowerCase()});
  }

  function passwordHandler(password: string) {
    setUser({...user, password});
  }

  function onRegisterPress() {
    navigation.navigate('Register');
  }

  function onSignInPress() {
    console.log(user);
    setShowErr(true);
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
            maxLength={20}
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
            <TouchableOpacity>
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
    </SafeAreaView>
  );
};

export default SignIn;
