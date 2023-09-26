// import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Home, Cart} from '../screens/index';
import HomeStack from './HomeStack';
import CartStack from './CartStack';
import ProfileStack from './ProfileStack';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../assets/colors';
import {useIsFocused} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackParamList} from './type';
import {Platform} from 'react-native';

const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarActiveBackgroundColor: colors.VIVID_GAMBOGE,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: '#ccc',
        tabBarItemStyle: {borderRadius: 30, margin: 5},

        tabBarStyle: {
          // justifyContent: 'center',
          // alignItems: 'center',
          // backgroundColor: 'white',
          // height: Platform.OS === 'android' ? '8%' : '10%',
          // borderTopLeftRadius: 30,
          // borderTopRightRadius: 30,
          // overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
          // position: 'absolute',
          // borderTopWidth: 0,
          // elevation: 100,
          // shadowRadius: 20,
          // shadowColor: 'black',
          // shadowOpacity: 0.4,
          // shadowOffset: {height: -10, width: 0},

          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
          height: 55,
          borderStartStartRadius: 30,
          borderStartEndRadius: 30,
          position: 'absolute',
          borderTopWidth: Platform.OS === 'android' ? 0.5 : 0,
          elevation: 4,
          shadowRadius: 20,
          shadowColor: '#ccc',
          shadowOpacity: 0.4,
          shadowOffset: {height: -10, width: 0},
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
export default BottomTabNavigator;
