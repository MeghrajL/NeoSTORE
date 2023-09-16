import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home, Category} from '../screens/index';
import {colors} from '../assets/colors';
import {StatusBar} from 'react-native';
const Stack = createNativeStackNavigator();
const HomeStack = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: colors.MIDNIGHT},
          headerTitleStyle: {
            fontFamily: 'Gilroy-Bold',
            color: 'white',
            fontSize: 20,
          },
        }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Category" component={Category} />
      </Stack.Navigator>
    </>
  );
};

export default HomeStack;
