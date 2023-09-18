import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import {baseUrl, addCart} from '../../url';
const initialState = {
  cart: [],
  status: null,
  data: false,
  total_carts: 0,
  message: '',
  user_msg: '',
  isLoading: false,
  isError: false,
};

interface IAddToCartParams {
  access_token: string;
  product_id: number;
  quantity: number;
}

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async (params: IAddToCartParams, thunkAPI) => {
    try {
      console.log('😀', params);
      const formData = new FormData();
      formData.append('product_id', params.product_id);
      formData.append('quantity', params.quantity);
      const headers = {
        access_token: params.access_token, // Add your access token to the custom header
        'Content-Type': 'multipart/form-data', // Important for FormData
      };
      const response = await axios.post(`${baseUrl}/${addCart}`, formData, {
        headers,
      });
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addToCart.pending, (state, action) => {
        state.isLoading = true;
        console.log('load');
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        console.log('@@@@@@@@@@@@@@@', action.payload);
        state.status = action.payload.status;
        state.data = action.payload.data;
        state.total_carts = action.payload.total_carts;
        state.message = action.payload.message;
        state.user_msg = action.payload.user_msg;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        console.log(action.payload);
      });
  },
});
export default cartSlice.reducer;
// export const {cleanState} = authSlice.actions;
