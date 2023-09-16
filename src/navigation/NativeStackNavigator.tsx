import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MMKV} from 'react-native-mmkv';
import {Register, OnboardingContainer, SignIn} from '../screens/index';
import MaterialBottomTabNavigator from './MaterialBottomTabNavigator';
import {useEffect, useState} from 'react';
import {RootStackParamList} from './type';

const Stack = createNativeStackNavigator<RootStackParamList>();
const storage = new MMKV();
import {useAppSelector} from '../redux/store';
const NativeStackNavigator = () => {
  let routeName;
  const [isFirstLaunch, setIsFirstLaunch] = useState(-1);
  const authState = useAppSelector(state => state.auth);
  // const prod = useAppSelector(state => state);
  //state.auth.user.data.access_token
  // console.log('from native stack', prod);
  useEffect(() => {
    if (storage.getBoolean('alreadyLaunched') === undefined) {
      storage.set('alreadyLaunched', true);
      setIsFirstLaunch(0);
      // routeName = 'Onboarding';
    } else {
      setIsFirstLaunch(1);
    }
  }, []);

  if (isFirstLaunch === -1) {
    return null; // This is the 'tricky' part: The query to AsyncStorage is not finished, but we have to present something to the user. Null will just render nothing, so you can also put a placeholder of some sort, but effectively the interval between the first mount and AsyncStorage retrieving your data won't be noticeable to the user. But if you want to display anything then you can use a LOADER here
  } else if (isFirstLaunch === 0) {
    routeName = 'Onboarding';
  } else if (authState.user.length === 0) {
    routeName = 'SignIn';
  } else if (authState.user.data.access_token) {
    routeName = 'MainNav';
  }

  return (
    <Stack.Navigator
      initialRouteName={routeName}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name="Onboarding" component={OnboardingContainer} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="SignIn" component={SignIn} />
      <Stack.Screen name="MainNav" component={MaterialBottomTabNavigator} />
    </Stack.Navigator>
  );
};

export default NativeStackNavigator;
