import {
  View,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Image,
  ScrollView,
  Alert,
  Button,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import React, {useState} from 'react';
import {ChangePasswordScreenNavigationProp} from '../../navigation/type';
import {styles} from './style';
import GenericText from '../../components/generic/genericText/GenericText';
import InputWithError from '../../components/generic/inputWithError/InputWithError';
import GenericButton from '../../components/generic/genericButton/GenericButton';
import {validatePassword} from '../../helpers/validators';
import {KeyboardAvoidingScrollView} from 'react-native-keyboard-avoiding-scroll-view';
import {useAppDispatch, useAppSelector} from '../../redux/store';
import Tick from '../../components/generic/tick/Tick';
import ButtonAnimated from '../../components/generic/buttonAnimated/ButtonAnimated';
import {changePassword} from '../../redux/slices/authSlice/actions';

const ChangePassword = ({navigation}: ChangePasswordScreenNavigationProp) => {
  const [showErr, setShowErr] = useState(false);
  const [samePass, setSamePass] = useState(false);
  const [passChanged, setPassChanged] = useState(false);

  const [pass, setPass] = useState({
    old_password: '',
    password: '',
    confirm_password: '',
  });
  const dispatch = useAppDispatch();
  const access_token = useAppSelector(
    state => state.auth.user?.data?.access_token,
  );

  const changeLoading = useAppSelector(state => state.auth.isLoading);

  async function press() {
    setShowErr(true);
    console.log('submit', pass);
    if (
      !samePass ||
      !pass.old_password.trim() ||
      !pass.password.trim() ||
      !pass.confirm_password.trim() ||
      !validatePassword(pass.old_password) ||
      !validatePassword(pass.password)
    ) {
      Alert.alert('Please enter correct details');
    } else {
      try {
        await dispatch(changePassword({...pass, access_token})).unwrap();
        setPassChanged(true);
        setTimeout(() => {
          setPassChanged(false);
          setPass({
            old_password: '',
            password: '',
            confirm_password: '',
          });
          navigation.navigate('Profile');
        }, 1300);
      } catch {
        console.log('some error');
      }
    }
  }

  function old_passwordHandler(old_password: string) {
    setPass({...pass, old_password});
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
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingScrollView
        scrollEventThrottle={20}
        containerStyle={styles.contentContainer}
        contentContainerStyle={{paddingTop: 15, paddingBottom: 10}}>
        <Image
          style={styles.imageStyle}
          source={require('../../assets/images/forgotpass.png')}
        />
        <View style={styles.instruction}>
          <GenericText style={styles.textStyle}>
            Enter your old password.
          </GenericText>
          <GenericText style={styles.textStyle}>
            Create new password and confirm it.
          </GenericText>
        </View>

        <View style={styles.innerContainer}>
          <InputWithError
            placeholder={'Old Password'}
            maxLength={20}
            inputMode={'text'}
            icon={'account-lock-open'}
            onChangeText={old_passwordHandler}
            value={pass.old_password}
            validator={validatePassword}
            showErr={showErr}
            errorText={'Please enter correct old password'}
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
            errorText={'Please enter new password in correct format'}
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
          <View style={styles.buttonContainer}>
            {/* {!passChanged ? (
              <GenericButton
                disabled={changeLoading}
                onPress={press}
                title="Submit"
                fontSize={26}
                fontFamily="Gilroy-Bold"
                style={styles.buttonStyle}
                color="white"
              />
            ) : (
              <Tick />
            )} */}
            <ButtonAnimated
              onPress={press}
              title="Submit"
              fontSize={26}
              isDone={passChanged}
              isLoading={changeLoading}
            />
          </View>
        </View>
      </KeyboardAvoidingScrollView>
    </TouchableWithoutFeedback>
  );
};

export default ChangePassword;
