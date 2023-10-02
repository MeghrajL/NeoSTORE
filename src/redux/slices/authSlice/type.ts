import {CountryCode} from 'react-native-country-picker-modal';
export interface IUserData {
  id: number;
  role_id: number;
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  profile_pic: string | null;
  country_id: number | null;
  gender: 'M' | 'F';
  phone_no: string;
  dob: string | null;
  is_active: boolean;
  created: string;
  modified: string;
  access_token: string;
}

export interface IUser {
  status: number;
  data: IUserData | null;
  message: string;
  user_msg: string;
}

export interface IForgotPassData {
  status: number;
  message: string;
  user_msg: string;
}

export interface IChangePassData {
  status: number;
  data: [] | null;
  message: string;
  user_msg: string;
}

export interface IProductCategory {
  id: number;
  name: string;
  icon_image: string;
  created: string;
  modified: string;
}

interface IData {
  user_data: IUserData;
  product_categories: IProductCategory[];
  total_carts: number;
  total_orders: number;
}

export interface IUserAccountDetails {
  status: number;
  data: IData | null;
  message: string;
  user_msg: string;
}

export interface IAddress {
  firstLine: string;
  secondLine: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  countryCode: CountryCode;
  type: string;
}

export interface IAddressObj {
  id: string;
  address: IAddress;
}

export interface IAddressList {
  addressList: IAddressObj[] | [];
  lastSelectedAddressId: string;
}

export interface IInitialState {
  user: IUser | null;
  isLoading: boolean;
  isError: boolean;
  forgotPassData: IForgotPassData | null;
  changePassData: IChangePassData | null;
  updateDetailsData: IUser | null;
  userAccountDetails: IUserAccountDetails | null;
  addressData: IAddressList;
}

export interface IRegistrationFormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
  gender: string;
  phone_no: string;
}

export interface ISignInFormData {
  email: string;
  password: string;
}

export interface IChangePasswordParams {
  access_token: string | undefined;
  old_password: string;
  password: string;
  confirm_password: string;
}

export interface IForgotPasswordParams {
  password: string;
}

export interface IUpdateDetailsFormData {
  first_name: string | undefined;
  last_name: string | undefined;
  email: string | undefined;
  dob: string | null | undefined;
  profile_pic: string | null | undefined;
  phone_no: string | undefined;

  access_token: string | undefined;
}
