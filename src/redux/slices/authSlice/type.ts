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

export interface IInitialState {
  user: IUser | null;
  isLoading: boolean;
  isError: boolean;
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
