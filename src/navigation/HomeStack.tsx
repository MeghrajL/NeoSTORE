import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home, Category, ProductDetail} from '../screens/index';
import {colors} from '../assets/colors';
import {StatusBar, Text, TouchableOpacity} from 'react-native';
import IconButton from '../components/generic/IconButton/IconButton';
import {HomeStackScreenNavigationProp, RootStackParamList} from './type';
import Title from '../components/generic/Title/Title';
const Stack = createNativeStackNavigator<RootStackParamList>();
const HomeStack = ({navigation}: HomeStackScreenNavigationProp) => {
  return (
    <>
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
        <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerTitle: 'NeoSTORE',
          }}
        />
        <Stack.Screen
          name="Category"
          component={Category}
          options={{
            headerLeft: () => (
              <IconButton
                icon="arrow-back-outline"
                size={28}
                onPressCustom={() => navigation.navigate('Home')}
                color="white"
              />
            ),
          }}
        />
        <Stack.Screen
          name="ProductDetail"
          component={ProductDetail}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default HomeStack;
