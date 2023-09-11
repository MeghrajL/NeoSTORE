import {StyleSheet, Text, View, Button, SafeAreaView} from 'react-native';
import React from 'react';
import {ExploreScreenNavigationProp} from '../../navigation/type';

const Explore = ({navigation}: ExploreScreenNavigationProp) => {
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
