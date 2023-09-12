import {
  View,
  SafeAreaView,
  Image,
  Switch,
  TouchableOpacity,
  Touchable,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
  Pressable,
  Text,
} from 'react-native';
import React, {useState} from 'react';
import GenericButton from '../../components/generic/GenericButton/GenericButton';
import {styles} from './style';
import {RegisterScreenNavigationProp} from '../../navigation/type';

import GenericInput from '../../components/generic/GenericInput/GenericInput';
import GenericText from '../../components/generic/GenericText/GenericText';
import {colors} from '../../assets/colors';
const Register = ({navigation}: RegisterScreenNavigationProp) => {
  const [checkBoxChecked, setCheckBoxChecked] = useState(false);
  const [isMale, setIsMale] = useState(false);
  const [isFemale, setIsFemale] = useState(false);
  const keyboardVerticalOffset = 10;
  // console.log(checkBoxChecked);
  console.log('male', isMale, 'female', isFemale);

  function onSignInPress() {
    // navigation.navigate()
    console.log('signin');
  }
  function maleHandler() {
    setIsMale(true);
    setIsFemale(false);
  }

  function femaleHandler() {
    setIsFemale(true);
    setIsMale(false);
  }

  function checkboxHandler() {
    setCheckBoxChecked(!checkBoxChecked);
  }

  return (
    // <LinearGradient
    //   colors={['#f5ff85', colors.VIVID_GAMBOGE]}
    //   style={styles.gradient}>
    <SafeAreaView style={styles.safeAreaStyle}>
      {/* <Pressable onPress={() => navigation.navigate('MainNav')}>
          <Text>nav</Text>
        </Pressable>
        */}
      {/* <Pressable onPress={() => navigation.navigate('Onboarding')}>
        <Text>ob</Text>
      </Pressable> */}

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        // keyboardVerticalOffset={keyboardVerticalOffset}
        style={styles.containerStyle}>
        <ScrollView>
          <View style={styles.titleStyle}>
            <GenericText textType="bold" style={styles.titleStyleFirstHalf}>
              Neo
            </GenericText>
            <GenericText textType="bold" style={styles.titleStyleSecondHalf}>
              STORE
            </GenericText>
          </View>
          <View style={[styles.formView, {gap: checkBoxChecked ? 0 : 5}]}>
            <View style={styles.elementView}>
              <GenericInput
                placeholder={'First Name'}
                maxLength={20}
                inputMode={'text'}
                // onChangeText={onChangeEmail}
                icon={'human-greeting-variant'}
                // value={signInUser.email}
              />
              {checkBoxChecked && (
                <GenericText textType="medium" style={styles.errorStyle}>
                  Error
                </GenericText>
              )}
            </View>
            <View style={styles.elementView}>
              <GenericInput
                placeholder={'Last Name'}
                maxLength={20}
                inputMode={'text'}
                // onChangeText={onChangeEmail}
                icon={'human-queue'}
                // value={signInUser.email}
              />
              {checkBoxChecked && (
                <GenericText textType="medium" style={styles.errorStyle}>
                  Error
                </GenericText>
              )}
            </View>
            <View style={styles.elementView}>
              <GenericInput
                placeholder={'Email'}
                maxLength={20}
                inputMode={'email'}
                // onChangeText={onChangeEmail}
                icon={'email'}
                // value={signInUser.email}
              />
              {checkBoxChecked && (
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
              {checkBoxChecked && (
                <GenericText textType="medium" style={styles.errorStyle}>
                  Error
                </GenericText>
              )}
            </View>
            <View style={styles.elementView}>
              <GenericInput
                placeholder={'Confirm Password'}
                maxLength={20}
                inputMode={'text'}
                // onChangeText={onChangeEmail}
                icon={'account-lock'}
                // value={signInUser.email}
              />
              {checkBoxChecked && (
                <GenericText textType="medium" style={styles.errorStyle}>
                  Error
                </GenericText>
              )}
            </View>

            <GenericText textType="regular" style={styles.genderText}>
              Select Your Gender
            </GenericText>
            <View style={styles.genderContainer}>
              <TouchableWithoutFeedback onPress={maleHandler}>
                <View
                  style={[
                    styles.genderElement,
                    {borderWidth: isMale === true ? 1 : 0},
                  ]}>
                  <Image
                    source={require('../../assets/images/man.png')}
                    style={styles.imageStyle}
                  />
                  <GenericText textType="regular">Male</GenericText>
                </View>
              </TouchableWithoutFeedback>

              <TouchableWithoutFeedback onPress={femaleHandler}>
                <View
                  style={[
                    styles.genderElement,
                    {borderWidth: isFemale ? 1 : 0},
                  ]}>
                  <Image
                    source={require('../../assets/images/woman.png')}
                    style={styles.imageStyle}
                  />
                  <GenericText textType="regular">Female</GenericText>
                </View>
              </TouchableWithoutFeedback>
            </View>
            <View style={styles.elementView}>
              <GenericInput
                placeholder={'Phone Number'}
                maxLength={20}
                inputMode={'text'}
                // onChangeText={onChangeEmail}
                icon={'phone-classic'}
                // value={signInUser.email}
              />
              {checkBoxChecked && (
                <GenericText textType="medium" style={styles.errorStyle}>
                  Error
                </GenericText>
              )}
            </View>
            <View style={styles.elementView}>
              <View style={styles.agreeView}>
                <TouchableOpacity onPress={checkboxHandler}>
                  <Image
                    style={styles.checkStyle}
                    source={
                      checkBoxChecked !== true
                        ? require('../../assets/images/unchecked.png')
                        : require('../../assets/images/checked.png')
                    }
                  />
                </TouchableOpacity>
                <GenericText textType="regular" style={styles.agreeText}>
                  I agree the Terms & Conditions
                </GenericText>
              </View>

              {checkBoxChecked && (
                <GenericText textType="medium" style={styles.errorStyle}>
                  Error
                </GenericText>
              )}
            </View>

            <GenericButton
              // onPress={() => navigation.navigate('MainNav')}
              title="Register"
              fontSize={26}
              fontFamily="Gilroy-Bold"
              style={styles.buttonStyle}
              color="white"
            />

            <View style={styles.signInStyle}>
              <GenericText textType="regular">
                Already have an account?
              </GenericText>
              <TouchableOpacity onPress={onSignInPress}>
                <GenericText textType="regular" style={styles.signinStyle}>
                  Sign In
                </GenericText>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
    // </LinearGradient>
  );
};

export default Register;
