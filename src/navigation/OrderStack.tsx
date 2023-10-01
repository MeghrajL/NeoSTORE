import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {
  ChangePassword,
  OrderDetail,
  OrderList,
  Profile,
  UpdateDetails,
} from '../screens/index';
import {colors} from '../assets/colors';
import {StatusBar, Text, TouchableOpacity} from 'react-native';
import IconButton from '../components/generic/IconButton/IconButton';
import {
  OrderStackScreenNavigationProp,
  ProfileStackScreenNavigationProp,
  RootStackParamList,
} from './type';
const Stack = createNativeStackNavigator<RootStackParamList>();
const OrderStack = ({navigation}: OrderStackScreenNavigationProp) => {
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
        <Stack.Screen
          name="OrderList"
          component={OrderList}
          options={{
            headerTitle: 'My Orders',
          }}
        />
        <Stack.Screen
          name="OrderDetail"
          component={OrderDetail}
          options={{
            headerTitle: 'Order Details',
            headerLeft: () => (
              <IconButton
                icon="arrow-back-outline"
                size={28}
                onPressCustom={() => navigation.navigate('OrderList')}
                color="white"
              />
            ),
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default OrderStack;
