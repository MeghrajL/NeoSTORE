import {createAsyncThunk, createSlice, nanoid} from '@reduxjs/toolkit';
import {
  IChangePasswordParams,
  IForgotPasswordParams,
  IInitialState,
  IRegistrationFormData,
  ISignInFormData,
  IUpdateDetailsFormData,
} from './type';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import {
  baseUrl,
  change,
  forgot,
  getUserData,
  register,
  signin,
  update,
} from '../../../url';
import {persistor, useAppDispatch} from '../../store';

const initialState: IInitialState = {
  user: null,
  isLoading: false,
  isError: false,
  forgotPassData: null,
  changePassData: null,
  updateDetailsData: null,
  userAccountDetails: null,
  addressData: {addressList: [], lastSelectedAddressId: ''},
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (user: IRegistrationFormData, thunkAPI) => {
    var formData = new FormData();
    formData.append('first_name', user.first_name);
    formData.append('last_name', user.last_name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('confirm_password', user.confirm_password);
    formData.append('gender', user.gender);
    formData.append('phone_no', Number(user.phone_no));
    try {
      const response = await axios.post(`${baseUrl}/${register}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Toast.show('Registration successful', Toast.SHORT);
      return response.data;
    } catch (error: any) {
      Toast.show('try again', Toast.SHORT);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async (user: ISignInFormData, thunkAPI) => {
    var formData = new FormData();
    formData.append('email', user.email);
    formData.append('password', user.password);
    try {
      const response = await axios.post(`${baseUrl}/${signin}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Toast.show('sign in successful', Toast.SHORT);

      return response.data;
    } catch (error: any) {
      Toast.show('try again', Toast.SHORT);
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const changePassword = createAsyncThunk(
  'auth/changePassword',
  async (params: IChangePasswordParams, thunkAPI) => {
    console.log(params);

    var formData = new FormData();
    formData.append('old_password', params.old_password);
    formData.append('password', params.password);
    formData.append('confirm_password', params.confirm_password);
    const headers = {
      access_token: params.access_token,
      'Content-Type': 'multipart/form-data',
    };
    try {
      const response = await axios.post(`${baseUrl}/${change}`, formData, {
        headers,
      });
      Toast.show('password changed succesfully', Toast.SHORT);
      console.log(response.data);
      return response.data;
    } catch (error: any) {
      Toast.show('try again', Toast.SHORT);
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword',
  async (email: string, thunkAPI) => {
    console.log(email);

    var formData = new FormData();
    formData.append('email', email);

    try {
      const response = await axios.post(`${baseUrl}/${forgot}`, formData);
      Toast.show('A mail has been sent to you', Toast.SHORT);
      // console.log('>>>', response.data);
      return response.data;
    } catch (error: any) {
      Toast.show('try again', Toast.SHORT);
      console.log(error);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getUserAccountDetails = createAsyncThunk(
  'auth/getUserAccountDetails',
  async (access_token: string | undefined, thunkAPI) => {
    console.log(access_token);

    const headers = {
      access_token: access_token,
    };
    try {
      const response = await axios.get(`${baseUrl}/${getUserData}`, {
        headers,
      });
      // Toast.show('password changed succesfully', Toast.SHORT);
      console.log('user data 😎', response.data);
      return response.data;
    } catch (error: any) {
      // Toast.show('try again', Toast.SHORT);
      console.log(error.message);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateDetails = createAsyncThunk(
  'auth/updateDetails',
  async (user: IUpdateDetailsFormData, thunkAPI) => {
    console.log('😀😀😀😀😀', user);
    var formData = new FormData();
    formData.append('first_name', user.first_name);
    formData.append('last_name', user.last_name);
    formData.append('email', user.email);
    formData.append('dob', user.dob);
    formData.append('profile_pic', user.profile_pic);
    formData.append('phone_no', Number(user.phone_no));
    const headers = {
      access_token: user.access_token,
      'Content-Type': 'multipart/form-data',
    };
    try {
      const response = await axios.post(`${baseUrl}/${update}`, formData, {
        headers,
      });
      Toast.show('Details updated successfully', Toast.SHORT);
      console.log(response.data);

      return response.data;
    } catch (error: any) {
      Toast.show('try again', Toast.SHORT);
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const logoutAndClearPersistedData = () => async dispatch => {
  // Dispatch the logout action
  dispatch(logout());

  // Clear the persisted data
  // Get the persistor from your setup
  await persistor.purge();
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      return {...initialState};
    },
    selectAddress: (state, action) => {
      if (state.addressData?.lastSelectedAddressId) {
        state.addressData.lastSelectedAddressId = action.payload;
      }
    },
    addAddress: (state, action) => {
      const newAddress = {
        id: nanoid(),
        address: action.payload,
      };
      console.log('>', state.addressData);
      state.addressData?.addressList.push(newAddress as never);

      state.addressData.lastSelectedAddressId = newAddress.id;
    },

    deleteAddress: (state, action) => {
      console.log('<><><>', action.payload);
      if (state.addressData?.addressList) {
        state.addressData.addressList = state.addressData?.addressList.filter(
          item => item.id !== action.payload,
        );
      }
    },

    updateAddress: (state, action) => {
      if (state.addressData?.addressList) {
        state.addressData.addressList = state.addressData?.addressList.map(
          item => (item.id === action.payload.id ? action.payload : item),
        );
        state.addressData.lastSelectedAddressId = action.payload.id;
      }
    },
  },
  extraReducers(builder) {
    builder
      .addCase(registerUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(signInUser.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(signInUser.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(changePassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(changePassword.fulfilled, (state, action) => {
        state.changePassData = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(forgotPassword.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.forgotPassData = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(getUserAccountDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getUserAccountDetails.fulfilled, (state, action) => {
        state.userAccountDetails = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getUserAccountDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(updateDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updateDetails.fulfilled, (state, action) => {
        state.user = action.payload;
        if (state.userAccountDetails?.data) {
          state.userAccountDetails.data.user_data = action.payload.data;
        }
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(updateDetails.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});
export default authSlice.reducer;
export const {logout, selectAddress, addAddress, updateAddress, deleteAddress} =
  authSlice.actions;
