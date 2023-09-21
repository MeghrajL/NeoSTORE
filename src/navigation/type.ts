import {RouteProp} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Onboarding: undefined;
  Register: undefined;
  MainNav: undefined;
  Home: undefined;
  Cart: undefined;
  SignIn: undefined;
  Category: {product_category_id: number; categoryName: string};
  ProductDetail: {product_id: number};
  HomeStack: undefined;
  CartStack: undefined;
};

export type OnboardingScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Onboarding'
>;

export type RegisterScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Register'
>;

export type MainNavScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'MainNav'
>;
export type HomeStackScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'HomeStack'
>;

export type CartStackScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'CartStack'
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
