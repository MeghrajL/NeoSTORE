import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

const Home = () => {
  return (
    <SafeAreaView>
      <View>
        <Text
          style={{fontSize: 50, color: 'black', fontFamily: 'Gilroy-Light'}}>
          Home
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
