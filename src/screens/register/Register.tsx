import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ViewStyle,
  Image,
  Pressable,
} from 'react-native';
import React from 'react';
import GenericButton from '../../components/generic/GenericButton/GenericButton';
import {styles} from './style';
import {RegisterScreenNavigationProp} from '../../navigation/type';

const Register = ({navigation}: RegisterScreenNavigationProp) => {
  return (
    <SafeAreaView>
      <View>
        <Pressable onPress={() => navigation.navigate('MainNav')}>
          <Text>nav</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Onboarding')}>
          <Text>ob</Text>
        </Pressable>
        {/*  */}
        {/* <GenericButton
          onPress={() => navigation.navigate('MainNav')}
          title="Nav"
          fontSize={26}
          fontFamily="Gilroy-Bold"
          style={styles.buttonStyle}
          color="white"
        /> */}
        {/* <GenericButton
          onPress={() => navigation.navigate('Onboarding')}
          title="Onboard"
          fontSize={26}
          fontFamily="Gilroy-Bold"
          style={styles.buttonStyle}
          color="white"
        /> */}
      </View>
    </SafeAreaView>
  );
};

export default Register;
