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
import GenericInput from '../../components/generic/GenericInput/GenericInput';
import GenericButton from '../../components/generic/GenericButton/GenericButton';
import {colors} from '../../assets/colors';
const SignIn = ({navigation}: SignInScreenNavigationProp) => {
  const [err, setErr] = useState(false);
  function onRegisterPress() {
    navigation.navigate('Register');
  }
  return (
    <SafeAreaView style={styles.safeAreaStyle}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.containerStyle}>
        <View style={styles.titleStyle}>
          <GenericText textType="bold" style={styles.titleStyleFirstHalf}>
            Neo
          </GenericText>
          <GenericText textType="bold" style={styles.titleStyleSecondHalf}>
            STORE
          </GenericText>
        </View>
        <View style={styles.formView}>
          <View style={styles.elementView}>
            <GenericInput
              placeholder={'Email'}
              maxLength={20}
              inputMode={'email'}
              // onChangeText={onChangeEmail}
              icon={'email'}
              // value={signInUser.email}
            />
            {err && (
              <GenericText textType="medium" style={styles.errorStyle}>
                Error
              </GenericText>
            )}
          </View>

          <View style={styles.elementView}>
            <GenericInput
              placeholder={'Password'}
              maxLength={20}
              inputMode={'text'}
              // onChangeText={onChangeEmail}
              icon={'account-lock-open'}
              // value={signInUser.email}
            />
            {err && (
              <GenericText textType="medium" style={styles.errorStyle}>
                Error
              </GenericText>
            )}
          </View>

          <GenericButton
            title="Register"
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
          <View style={styles.signInStyle}>
            <GenericText textType="regular">Don't have an account?</GenericText>
            <TouchableOpacity onPress={onRegisterPress}>
              <GenericText textType="regular" style={styles.signInStyle}>
                Register
              </GenericText>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignIn;
