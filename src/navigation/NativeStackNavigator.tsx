import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import {Register} from '../screens/index';
import MaterialBottomTabNavigator from './MaterialBottomTabNavigator';
const NativeStackNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="Nav" component={MaterialBottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default NativeStackNavigator;
