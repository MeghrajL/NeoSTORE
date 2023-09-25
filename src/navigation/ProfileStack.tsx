import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {ChangePassword, Profile, UpdateDetails} from '../screens/index';
import {colors} from '../assets/colors';
import {StatusBar, Text, TouchableOpacity} from 'react-native';
import IconButton from '../components/generic/IconButton/IconButton';
import {ProfileStackScreenNavigationProp, RootStackParamList} from './type';
const Stack = createNativeStackNavigator<RootStackParamList>();
const ProfileStack = ({navigation}: ProfileStackScreenNavigationProp) => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {backgroundColor: colors.MIDNIGHT},
          headerTitleStyle: {
            fontFamily: 'Gilroy-Bold',
            color: 'white',
            fontSize: 20,
          },
        }}>
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen
          name="ChangePassword"
          component={ChangePassword}
          options={{
            headerTitle: 'Change Password',
            headerLeft: () => (
              <IconButton
                icon="arrow-back-outline"
                size={28}
                onPressCustom={() => navigation.navigate('Profile')}
                color="white"
              />
            ),
          }}
        />
        <Stack.Screen
          name="UpdateDetails"
          component={UpdateDetails}
          options={{
            headerTitle: 'Update Details',
            headerLeft: () => (
              <IconButton
                icon="arrow-back-outline"
                size={28}
                onPressCustom={() => navigation.navigate('Profile')}
                color="white"
              />
            ),
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default ProfileStack;
