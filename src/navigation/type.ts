import {NativeStackScreenProps} from '@react-navigation/native-stack';

export type RootStackParamList = {
  Onboarding: undefined;
  Register: undefined;
  MainNav: undefined;
  Home: undefined;
  Explore: undefined;
  SignIn:undefined
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

export type HomeScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Home'
>;

export type ExploreScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'Explore'
>;

export type SignInScreenNavigationProp = NativeStackScreenProps<
  RootStackParamList,
  'SignIn'
>;
