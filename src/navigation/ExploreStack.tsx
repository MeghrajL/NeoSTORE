import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  ExploreStackScreenNavigationProp,
  ProfileStackScreenNavigationProp,
  RootStackParamList,
} from './type';

import {
  ChangePassword,
  OrderDetail,
  OrderList,
  Profile,
  UpdateDetails,
} from '../screens/index';
import {colors} from '../assets/colors';
import IconButton from '../components/Generic/IconButton/IconButton';
import Explore from '../screens/Explore';

const Stack = createNativeStackNavigator<RootStackParamList>();

/**
 * @author Meghraj Vilas Lot
 * @description profile stack navigation to place different screens over another
 * @returns jsx which contains profile stack navigation
 */

const ExploreStack = ({navigation}: ExploreStackScreenNavigationProp) => {
  return (
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
      <Stack.Screen name="Explore" component={Explore} />
    </Stack.Navigator>
  );
};

export default ExploreStack;
