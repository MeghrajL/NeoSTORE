import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import {
  baseUrl,
  addCart,
  getCart,
  editCartItem,
  deleteCartItem,
} from '../../url';
const initialState = {
  cart: [],
  status: null,
  data: false,
  total_carts: 0,
  message: '',
  user_msg: '',
  isLoading: false,
  isCartUpdating: false,
  isCartItemDeleting: false,
  isError: false,
};

interface IAddToCartParams {
  access_token: string;
  product_id: number;
  quantity: number;
}

interface IGetCartListParams {
  access_token: string;
}

interface IDeleteCartParams {
  access_token: string;
  product_id: number;
}

export const getCartList = createAsyncThunk(
  'cart/getCartList',
  async (params: IGetCartListParams, thunkAPI) => {
    try {
      // console.log('😀', params);
      const headers = {
        access_token: params.access_token, // Add your access token to the custom header
        'Content-Type': 'multipart/form-data', // Important for FormData
      };
      const response = await axios.get(`${baseUrl}/${getCart}`, {
        headers,
      });
      // console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

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

export const editCart = createAsyncThunk(
  'cart/editCart',
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
      const response = await axios.post(
        `${baseUrl}/${editCartItem}`,
        formData,
        {
          headers,
        },
      );
      console.log(response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteCart = createAsyncThunk(
  'cart/deleteCart',
  async (params: IDeleteCartParams, thunkAPI) => {
    try {
      console.log('😀', params);
      const formData = new FormData();
      formData.append('product_id', params.product_id);
      const headers = {
        access_token: params.access_token, // Add your access token to the custom header
        'Content-Type': 'multipart/form-data', // Important for FormData
      };
      const response = await axios.post(
        `${baseUrl}/${deleteCartItem}`,
        formData,
        {
          headers,
        },
      );
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
        console.log('err from builder', action.payload);
      })
      .addCase(getCartList.pending, (state, action) => {
        state.isLoading = true;
        console.log('load get cart');
      })
      .addCase(getCartList.fulfilled, (state, action) => {
        console.log('@@@@@@@@@@@@@@@', action.payload);
        state.cart = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getCartList.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        console.log('err from builder', action.payload);
      })
      .addCase(editCart.pending, (state, action) => {
        state.isCartUpdating = true;
        console.log('load edit cart');
      })
      .addCase(editCart.fulfilled, (state, action) => {
        console.log('@@@@@@@@@@@@@@@', action.payload);
        state.status = action.payload.status;
        state.data = action.payload.data;
        state.total_carts = action.payload.total_carts;
        state.message = action.payload.message;
        state.user_msg = action.payload.user_msg;
        state.isCartUpdating = false;
        state.isError = false;
      })
      .addCase(editCart.rejected, (state, action) => {
        state.isError = true;
        state.isCartUpdating = false;
        console.log('err from builder', action.payload);
      })
      .addCase(deleteCart.pending, (state, action) => {
        state.isCartItemDeleting = true;
        console.log('delete edit cart');
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        console.log('@@@@@@@@@@@@@@@', action, 'sate', state);
        state.status = action.payload.status;
        state.data = action.payload.data;
        state.total_carts = action.payload.total_carts;
        state.message = action.payload.message;
        state.user_msg = action.payload.user_msg;
        state.isCartItemDeleting = false;
        state.isError = false;
        // const newCart = state.cart.data.filter(
        //   item => item.product_id !== action.meta.arg.product_id,
        // );
        console.log('🥳', action.payload.message);
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.isError = true;
        state.isCartItemDeleting = false;
        console.log('err from builder', action.payload);
      });
  },
});
export default cartSlice.reducer;
// export const {cleanState} = authSlice.actions;
