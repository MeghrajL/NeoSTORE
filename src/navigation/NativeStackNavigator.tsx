import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MMKV} from 'react-native-mmkv';
import {
  Register,
  OnboardingContainer,
  SignIn,
  ForgotPassword,
  Address,
} from '../screens/index';
import BottomTabNavigator from './BottomTabNavigator';
import {useEffect, useState} from 'react';
import {
  NativeStackNavigatorScreenNavigationProp,
  RootStackParamList,
} from './type';

const Stack = createNativeStackNavigator<RootStackParamList>();
const storage = new MMKV();
import {useAppSelector} from '../redux/store';
import {colors} from '../assets/colors';
import IconButton from '../components/generic/IconButton/IconButton';
import {useNavigation} from '@react-navigation/native';
const NativeStackNavigator = () => {
  const navigation = useNavigation();
  let routeName: keyof RootStackParamList = 'Onboarding';
  const [isFirstLaunch, setIsFirstLaunch] = useState(-1);
  const authState = useAppSelector(state => state.auth);
  // const prod = useAppSelector(state => state);
  //state.auth.user.data.access_token
  console.log('from native stack', authState);
  useEffect(() => {
    if (storage.getBoolean('alreadyLaunched') === undefined) {
      storage.set('alreadyLaunched', true);
      setIsFirstLaunch(0);
      // routeName = 'Onboarding';
    } else {
      setIsFirstLaunch(1);
    }
  }, []);

  console.log(typeof authState.user?.data);
  if (isFirstLaunch === -1) {
    return null;
  } else if (isFirstLaunch === 0) {
    routeName = 'Onboarding';
  } else if (authState.user?.data === null) {
    routeName = 'SignIn';
  } else if (authState.user?.data?.access_token) {
    routeName = 'MainNav';
  }

  return (
    <Stack.Navigator
      initialRouteName={routeName}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={OnboardingContainer} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="SignIn" component={SignIn} />
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
