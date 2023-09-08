import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView,
  ViewStyle,
  Image,
} from 'react-native';
import React from 'react';
import GenericButton from '../../components/generic/GenericButton/GenericButton';
import {styles} from './style';
const Register = ({navigation}) => {
  return (
    <SafeAreaView>
      <View>
        {/* <Text>Register</Text> */}
        <GenericButton
          onPress={() => navigation.navigate('Nav')}
          title="Nav"
          fontSize={26}
          fontFamily="Gilroy-Bold"
          style={styles.buttonStyle}
          color="white"
        />
        <GenericButton
          onPress={() => navigation.navigate('Onboarding')}
          title="Onboard"
          fontSize={26}
          fontFamily="Gilroy-Bold"
          style={styles.buttonStyle}
          color="white"
        />
      </View>
    </SafeAreaView>
  );
};

export default Register;
