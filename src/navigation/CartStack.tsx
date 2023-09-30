import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {AddAddress, Address, Cart, Payment} from '../screens/index';
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
          headerTitleAlign: 'center',

          headerTitleStyle: {
            fontFamily: 'Gilroy-Bold',
            color: 'white',
            fontSize: 20,
          },
        }}>
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen
          name="Address"
          component={Address}
          options={{
            headerTitle: 'Select Address',

            headerLeft: () => (
              <IconButton
                icon="arrow-back-outline"
                size={28}
                onPressCustom={() => navigation.navigate('Cart')}
                color="white"
              />
            ),
            headerRight: () => (
              <IconButton
                icon="add-outline"
                size={28}
                onPressCustom={() =>
                  navigation.navigate('AddAddress', {id: ''})
                }
                color="white"
              />
            ),
          }}
        />
        <Stack.Screen
          name="AddAddress"
          component={AddAddress}
          options={{
            headerTitle: 'Add New Address',
            headerLeft: () => (
              <IconButton
                icon="arrow-back-outline"
                size={28}
                onPressCustom={() => navigation.navigate('Address')}
                color="white"
              />
            ),
          }}
        />
        <Stack.Screen
          name="Payment"
          component={Payment}
          options={{
            headerTitle: 'Checkout',

            headerLeft: () => (
              <IconButton
                icon="arrow-back-outline"
                size={28}
                onPressCustom={() => navigation.navigate('Address')}
                color="white"
              />
            ),
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default CartStack;
