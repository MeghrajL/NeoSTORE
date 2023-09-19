// import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Home, Cart} from '../screens/index';
import HomeStack from './HomeStack';
import CartStack from './CartStack';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../assets/colors';
import {useIsFocused} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const MaterialBottomTabNavigator = () => {
  const isHomeScreenFocused = useIsFocused(); // Check if HomeScreen is focused
  const isProfileScreenFocused = useIsFocused();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveBackgroundColor: colors.VIVID_GAMBOGE,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#ccc',
        tabBarItemStyle: {borderRadius: 30},
        tabBarStyle: {
          backgroundColor: 'white',
          paddingVertical: 5,
          paddingHorizontal: 10,
        },
        headerShown: false,
        // tabBarLabelPosition: 'below-icon',
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
          tabBarIcon: ({color}) => (
            <Icon name="search" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart2"
        component={CartStack}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="search" size={26} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Cart3"
        component={CartStack}
        options={{
          tabBarIcon: ({color}) => (
            <Icon name="search" size={26} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default MaterialBottomTabNavigator;
