import {StyleSheet, Text, View, Button, SafeAreaView} from 'react-native';
import React from 'react';
import {colors} from '../../assets/colors';
const Register = ({navigation}) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Register</Text>
        <Button onPress={() => navigation.navigate('Nav')} title="Nav" />
      </View>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({});
