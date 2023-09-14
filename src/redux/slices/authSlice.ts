import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {IInitialState} from './type';
import axios from 'axios';
const initialState = {
  user: [],
};

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (user: any) => {
    console.log('>', user);
    var formData = new FormData();
    formData.append('first_name', user.first_name);
    formData.append('last_name', user.last_name);
    formData.append('email', user.email);
    formData.append('password', user.password);
    formData.append('confirm_password', user.confirm_password);
    formData.append('gender', user.gender);
    formData.append('phone_no', Number(user.phone_no));
    try {
      const response = await axios.post(
        'http://staging.php-dev.in:8844/trainingapp/api/users/register',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('res', response.data);

      return response.data;
    } catch (error) {
      return error;
    }
  },
);

export const signInUser = createAsyncThunk(
  'auth/signInUser',
  async (user: any) => {
    console.log('>', user);
    var formData = new FormData();
    formData.append('email', user.email);
    formData.append('password', user.password);

    try {
      const response = await axios.post(
        'http://staging.php-dev.in:8844/trainingapp/api/users/login',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      console.log('res', response.data);

      return response.data;
    } catch (error) {
      return error;
    }
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(registerUser.fulfilled, (state, action) => {
        console.log('from builder', action.payload);
        // console.log('state', state);
        state.user.length = 0;
        state.user.push(action.payload);
        console.log('my state', state.user);
      })
      .addCase(signInUser.fulfilled, (state, action) => {
        console.log('from sign in builder', action.payload);
        // console.log('state', state);
        state.user.length = 0;
        state.user.push(action.payload);
        console.log('sign in state', state.user);
      });
  },
});

export default authSlice.reducer;
