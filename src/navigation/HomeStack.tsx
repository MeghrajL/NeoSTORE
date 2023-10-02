import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeStackScreenNavigationProp, RootStackParamList} from './type';

import {Home, Category, ProductDetail} from '../screens/index';
import {colors} from '../assets/colors';
import IconButton from '../components/generic/iconButton/IconButton';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * @author Meghraj Vilas Lot
 *  @param {navigation} props contains navigation object is used to navigate between different available screen.
 * @description home stack navigation to place different screens over another
 * @returns jsx which contains home stack navigation
 */

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
