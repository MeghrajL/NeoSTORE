import {
  NavigationContainer,
  createNavigationContainerRef,
} from '@react-navigation/native';
import NativeStackNavigator from './NativeStackNavigator';
import {useState} from 'react';
const Navigator = () => {
  return (
    <NavigationContainer>
      <NativeStackNavigator />
    </NavigationContainer>
  );
};
export default Navigator;
