import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Cart} from '../screens/index';
import {colors} from '../assets/colors';
import {StatusBar, Text, TouchableOpacity} from 'react-native';
import IconButton from '../components/generic/IconButton/IconButton';
import {CartStackScreenNavigationProp, RootStackParamList} from './type';
const Stack = createNativeStackNavigator<RootStackParamList>();
const CartStack = ({navigation}: CartStackScreenNavigationProp) => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack.Navigator
        screenOptions={{
          headerStyle: {backgroundColor: colors.MIDNIGHT},
          headerTitleStyle: {
            fontFamily: 'Gilroy-Bold',
            color: 'white',
            fontSize: 20,
          },
        }}>
        <Stack.Screen
          name="Cart"
          component={Cart}
          // options={{
          //   headerLeft: () => (
          //     <IconButton
          //       icon="arrow-back-outline"
          //       size={28}
          //       onPressCustom={() => navigation.navigate('Home')}
          //       color="white"
          //     />
          //   ),
          // }}
        />
      </Stack.Navigator>
    </>
  );
};

export default CartStack;
