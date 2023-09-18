import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Home, Cart} from '../screens/index';
import HomeStack from './HomeStack';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createMaterialBottomTabNavigator();

const MaterialBottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: () => <Icon name="home" size={26} color={'black'} />,
        }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: () => <Icon name="search" size={26} color={'black'} />,
        }}
      />
    </Tab.Navigator>
  );
};
export default MaterialBottomTabNavigator;
