import {useEffect, useState} from 'react';
import {
  NativeStackNavigationProp,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import {MMKV} from 'react-native-mmkv';
import BottomTabNavigator from './BottomTabNavigator';
import {useNavigation} from '@react-navigation/native';

import {RootStackParamList} from './type';
import {
  Register,
  OnboardingContainer,
  SignIn,
  ForgotPassword,
  Address,
} from '../screens/index';
import {useAppSelector} from '../redux/store';
import {colors} from '../assets/colors';
import IconButton from '../components/generic/iconButton/IconButton';

const Stack = createNativeStackNavigator<RootStackParamList>();
const storage = new MMKV();

/**
 * @author Meghraj Vilas Lot
 * @description native root stack navigation to place different screens over another which also
 * determines which screen to display initailly based user's state
 * @returns jsx which contains native root stack navigation
 */

const NativeStackNavigator = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  let routeName: keyof RootStackParamList = 'Onboarding';
  const [isFirstLaunch, setIsFirstLaunch] = useState(-1);
  const authState = useAppSelector(state => state.auth);
  console.log('from native stack', authState);

  useEffect(() => {
    if (storage.getBoolean('alreadyLaunched') === undefined) {
      storage.set('alreadyLaunched', true);
      setIsFirstLaunch(0);
    } else {
      setIsFirstLaunch(1);
    }
  }, []);
  console.log(isFirstLaunch);
  if (isFirstLaunch === -1) {
    return null;
  } else if (isFirstLaunch === 0) {
    routeName = 'Onboarding';
  } else if (authState.user === null && isFirstLaunch === 1) {
    routeName = 'SignIn';
  } else if (authState.user?.data?.access_token) {
    routeName = 'MainNav';
  }

  return (
    <Stack.Navigator
      initialRouteName={routeName}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="SignIn" component={SignIn} />

      <Stack.Screen name="Onboarding" component={OnboardingContainer} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: colors.MIDNIGHT},
          headerTitleStyle: {
            fontFamily: 'Gilroy-Bold',
            color: 'white',
            fontSize: 20,
          },
          headerTitle: 'Forgot Password',
          headerLeft: () => (
            <IconButton
              icon="arrow-back-outline"
              size={28}
              onPressCustom={() => navigation.navigate('SignIn')}
              color="white"
            />
          ),
        }}
        name="ForgotPassword"
        component={ForgotPassword}
      />
      <Stack.Screen name="MainNav" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default NativeStackNavigator;
