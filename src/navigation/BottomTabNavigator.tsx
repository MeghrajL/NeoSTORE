// import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import {Home, Cart} from '../screens/index';
import HomeStack from './HomeStack';
import CartStack from './CartStack';
import ProfileStack from './ProfileStack';
import Icon from 'react-native-vector-icons/Ionicons';
import {colors} from '../assets/colors';
import {
  getFocusedRouteNameFromRoute,
  useIsFocused,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {RootStackParamList} from './type';
import {Dimensions, Platform, SafeAreaView} from 'react-native';

const Tab = createBottomTabNavigator<RootStackParamList>();

const BottomTabNavigator = () => {
  const {height} = Dimensions.get('window');
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        // tabBarActiveBackgroundColor: colors.VIVID_GAMBOGE,
        tabBarActiveTintColor: colors.VIVID_GAMBOGE,
        tabBarInactiveTintColor: '#ccc',

        // tabBarItemStyle: {borderRadius: 30, margin: 5},
        tabBarStyle: {
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',

          // borderStartStartRadius: 30,
          // borderStartEndRadius: 30,
          position: 'absolute',
          borderTopWidth: 0.5,
          // elevation: 4,
          // shadowRadius: 20,
          // shadowColor: '#ccc',
          // shadowOpacity: 0.4,
          // shadowOffset: {height: -10, width: 0},
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
        // options={({route}) => ({
        //   tabBarStyle: (route => {
        //     const routeName = getFocusedRouteNameFromRoute(route) ?? '';
        //     console.log(routeName);
        //     if (routeName === 'Payment' || routeName === 'Address') {
        //       return {display: 'none', height: 0, width: 0, opacity: 0};
        //     }
        //     return;
        //   })(route),
        // })}
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
