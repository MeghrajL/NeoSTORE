import {NavigationContainer} from '@react-navigation/native';
import NativeStackNavigator from './NativeStackNavigator';
const Navigator = () => {
  return (
    <NavigationContainer>
      <NativeStackNavigator />
    </NavigationContainer>
  );
};
export default Navigator;
