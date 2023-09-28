import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import {baseUrl, order, orderDetail, orderList} from '../../../url';
import {
  IGetOrderDetailsParams,
  IGetOrderListParams,
  IInitialState,
  IPlaceOrderParams,
} from './type';

const initialState: IInitialState = {
  orderData: null,
  orderList: null,
  orderDetails: null,
  isLoading: false,
  isError: false,
};

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (params: IPlaceOrderParams, thunkAPI) => {
    try {
      // console.log('😀', params);
      const formData = new FormData();
      formData.append('address', params.address);
      const headers = {
        access_token: params.access_token,
        'Content-Type': 'multipart/form-data',
      };
      const response = await axios.post(`${baseUrl}/${order}`, formData, {
        headers,
      });
      // console.log(response.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getOrderList = createAsyncThunk(
  'order/getOrderList',
  async (params: IGetOrderListParams, thunkAPI) => {
    try {
      // console.log('😀', params);
      const headers = {
        access_token: params.access_token,
        // 'Content-Type': 'multipart/form-data',
      };
      const response = await axios.get(`${baseUrl}/${orderList}`, {
        headers,
      });
      // console.log(response.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getOrderDetails = createAsyncThunk(
  'order/getOrderDetails',
  async (params: IGetOrderDetailsParams, thunkAPI) => {
    try {
      const url = `${baseUrl}/${orderDetail}?order_id=${params.order_id}`;

      // console.log('😀', params);
      const headers = {
        access_token: params.access_token,
        // 'Content-Type': 'multipart/form-data',
      };
      const response = await axios.get(url, {
        headers,
      });
      // console.log(response.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(placeOrder.pending, (state, action) => {
        state.isLoading = true;
        console.log('load');
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        console.log('@@@@@@@@@@@@@@@', action.payload);
        state.orderData = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        console.log('err from builder', action.payload);
      })
      .addCase(getOrderList.pending, (state, action) => {
        state.isLoading = true;
        console.log('load');
      })
      .addCase(getOrderList.fulfilled, (state, action) => {
        console.log('@@@@@@@@@@@@@@@', action.payload);
        state.orderList = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getOrderList.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        console.log('err from builder', action.payload);
      })
      .addCase(getOrderDetails.pending, (state, action) => {
        state.isLoading = true;
        console.log('load');
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        console.log('@@@@@@@@@@@@@@@', action.payload);
        state.orderDetails = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
        console.log('err from builder', action.payload);
      });
  },
});
export default orderSlice.reducer;
