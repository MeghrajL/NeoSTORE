import {NavigationContainer} from '@react-navigation/native';
import NativeStackNavigator from './NativeStackNavigator';

/**
 * @author Meghraj Vilas Lot
 * @returns jsx which contains root navigator
 */

const Navigator = () => {
  return (
    <NavigationContainer>
      <NativeStackNavigator />
    </NavigationContainer>
  );
};
export default Navigator;
