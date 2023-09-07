import {StyleSheet, Text, View, Button, SafeAreaView} from 'react-native';
import React from 'react';

const Explore = ({navigation}) => {
  return (
    <SafeAreaView>
      <View>
        <Text>Explore</Text>
        <Button onPress={() => navigation.navigate('Register')} title="Nav" />
      </View>
    </SafeAreaView>
  );
};

export default Explore;

const styles = StyleSheet.create({});
