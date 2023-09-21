import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IInitialState, IRegistrationFormData, ISignInFormData} from './type';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import {baseUrl, register, signin} from '../../../url';

const initialState: IInitialState = {
  user: null,
  isLoading: false,
  isError: false,
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

      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    cleanState: state => {
      state = initialState;
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
      });
  },
});
export default authSlice.reducer;
export const {cleanState} = authSlice.actions;
