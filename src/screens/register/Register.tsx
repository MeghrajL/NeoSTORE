import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ViewStyle,
  Image,
  Pressable,
  Switch,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import GenericButton from '../../components/generic/GenericButton/GenericButton';
import {styles} from './style';
import {RegisterScreenNavigationProp} from '../../navigation/type';
import {colors} from '../../assets/colors';
import GenericInput from '../../components/generic/GenericInput/GenericInput';
import {Checkbox} from 'react-native-paper';

const Register = ({navigation}: RegisterScreenNavigationProp) => {
  const [checkBoxChecked, setCheckBoxChecked] = useState(false);
  console.log(checkBoxChecked);
  return (
    // <LinearGradient
    //   colors={['#f5ff85', colors.VIVID_GAMBOGE]}
    //   style={styles.gradient}>
    <SafeAreaView style={styles.safeAreaStyle}>
      <View style={styles.containerStyle}>
        {/* <Pressable onPress={() => navigation.navigate('MainNav')}>
          <Text>nav</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Onboarding')}>
          <Text>ob</Text>
        </Pressable> */}

        <Text>NeoSTORE</Text>
        <GenericInput
          placeholder={'First Name'}
          maxLength={20}
          inputMode={'text'}
          // onChangeText={onChangeEmail}
          icon={'human-greeting-variant'}
          // value={signInUser.email}
        />
        <GenericInput
          placeholder={'Last Name'}
          maxLength={20}
          inputMode={'text'}
          // onChangeText={onChangeEmail}
          icon={'human-queue'}
          // value={signInUser.email}
        />
        <GenericInput
          placeholder={'Email'}
          maxLength={20}
          inputMode={'email'}
          // onChangeText={onChangeEmail}
          icon={'email'}
          // value={signInUser.email}
        />

        <GenericInput
          placeholder={'Password'}
          maxLength={20}
          inputMode={'text'}
          // onChangeText={onChangeEmail}
          icon={'account-lock-open'}
          // value={signInUser.email}
        />

        <GenericInput
          placeholder={'Confirm Password'}
          maxLength={20}
          inputMode={'text'}
          // onChangeText={onChangeEmail}
          icon={'account-lock'}
          // value={signInUser.email}
        />
        <Text>Select Your Gender</Text>
        <View style={styles.genderContainer}>
          <Image
            source={require('../../assets/images/man.png')}
            style={styles.imageStyle}
          />
          <Switch></Switch>
          <Image
            source={require('../../assets/images/woman.png')}
            style={styles.imageStyle}
          />
        </View>
        <GenericInput
          placeholder={'Phone Number'}
          maxLength={20}
          inputMode={'text'}
          // onChangeText={onChangeEmail}
          icon={'phone-classic'}
          // value={signInUser.email}
        />
        <View style={styles.genderContainer}>
          <TouchableOpacity
            onPress={() => setCheckBoxChecked(!checkBoxChecked)}>
            <Image
              style={styles.checkStyle}
              source={
                checkBoxChecked !== true
                  ? require('../../assets/images/unchecked.png')
                  : require('../../assets/images/checked.png')
              }
            />
          </TouchableOpacity>
          <Text>I agree the Terms & Conditions</Text>
        </View>

        <GenericButton
          // onPress={() => navigation.navigate('MainNav')}
          title="Nav"
          fontSize={26}
          fontFamily="Gilroy-Bold"
          style={styles.buttonStyle}
          color="white"
        />
      </View>
    </SafeAreaView>
    // </LinearGradient>
  );
};

export default Register;
