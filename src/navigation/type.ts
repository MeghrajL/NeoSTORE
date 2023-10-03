import {RouteProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  NativeStackNavigator: undefined;
  Onboarding: undefined;
  Register: undefined;
  MainNav: undefined;
  Home: undefined;
  Cart: undefined;
  SignIn: undefined;
  Category: {
    product_category_id: number | undefined;
    categoryName: string | undefined;
  };
  ProductDetail: {product_id: number; shouldLoadSimilarProducts: boolean};
  HomeStack: undefined;
  CartStack: undefined;
  ForgotPassword: undefined;
  ProfileStack: undefined;
  ChangePassword: undefined;
  UpdateDetails: undefined;
  Profile: undefined;
  OrderList: undefined;
  OrderDetail: {order_id: number; created: string};
  Address: undefined;
  AddAddress: {id: string};
  Payment: {id: string};
  Explore: undefined;
  ExploreStack: undefined;
};

export type OnboardingScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Onboarding'
>;

export type RegisterScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Register'
>;

export type ForgotPasswordScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'ForgotPassword'
>;

export type MainNavScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'MainNav'
>;

export type NativeStackNavigatorScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'NativeStackNavigator'
>;
export type HomeStackScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'HomeStack'
>;

export type CartStackScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'CartStack'
>;

export type ProfileStackScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'ProfileStack'
>;
export type ExploreStackScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'ExploreStack'
>;

export type HomeScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

export type CartScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Cart'
>;

export type SignInScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'SignIn'
>;

export type CategoryScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Category'
>;

export type CategoryScreenRouteProp = RouteProp<RootStackParamList, 'Category'>;

export type ProductDetailScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'ProductDetail'
>;

export type ProfileScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Profile'
>;

export type ChangePasswordScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'ChangePassword'
>;
export type UpdateDetailsScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'UpdateDetails'
>;

export type OrderListScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'OrderList'
>;

export type OrderDetailScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'OrderDetail'
>;
export type AddressScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Address'
>;
export type AddAddressScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'AddAddress'
>;
export type PaymentScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Payment'
>;
export type ExploreScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Explore'
>;
