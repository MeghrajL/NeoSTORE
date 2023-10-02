import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import {colors} from '../assets/colors';
import {RootStackParamList} from './type';
import HomeStack from './HomeStack';
import CartStack from './CartStack';
import ProfileStack from './ProfileStack';

const Tab = createBottomTabNavigator<RootStackParamList>();

/**
 * @author Meghraj Vilas Lot
 * @description bottom tab navigation
 * @returns jsx which contains bottom tabs navigation
 */

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: colors.VIVID_GAMBOGE,
        tabBarInactiveTintColor: '#ccc',
        tabBarStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          position: 'absolute',
          borderTopWidth: 0.5,
        },
        headerShown: false,
        tabBarShowLabel: false,
      }}>
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({color}) => <Icon name="home" size={26} color={color} />,
        }}
      />

      <Tab.Screen
        name="CartStack"
        component={CartStack}
        options={{
          tabBarIcon: ({color}) => <Icon name="cart" size={26} color={color} />,
        }}
      />

      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="person" size={26} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default BottomTabNavigator;
