import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseUrl, order, orderList, orderDetail} from '../../../constants/url';
import {
  IPlaceOrderParams,
  IGetOrderListParams,
  IGetOrderDetailsParams,
} from './type';
import Toast from 'react-native-simple-toast';

/**
 * @author Meghraj Vilas Lot
 * @param {IPlaceOrderParams}
 * @description performs api call for placing order
 * @returns success data or error
 */

export const placeOrder = createAsyncThunk(
  'order/placeOrder',
  async (params: IPlaceOrderParams, thunkAPI) => {
    try {
      const {access_token, address} = params;
      const formattedAddress = `${address?.firstLine}, ${address?.secondLine}, ${address?.city}, ${address?.state}, ${address?.pincode}, ${address?.country}`;
      const formData = new FormData();
      formData.append('address', formattedAddress);
      const headers = {
        access_token: access_token,
        'Content-Type': 'multipart/form-data',
      };
      const response = await axios.post(`${baseUrl}/${order}`, formData, {
        headers,
      });
      Toast.show('Order Placed Successfully', Toast.SHORT);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/**
 * @author Meghraj Vilas Lot
 * @param {IGetOrderDetailsParams}
 * @description performs api call for fetching all orders list
 * @returns order list data on success or error
 */

export const getOrderList = createAsyncThunk(
  'order/getOrderList',
  async (params: IGetOrderListParams, thunkAPI) => {
    try {
      const headers = {
        access_token: params.access_token,
      };
      const response = await axios.get(`${baseUrl}/${orderList}`, {
        headers,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/**
 * @author Meghraj Vilas Lot
 * @param {IGetOrderDetailsParams}
 * @description performs api call for fetching data of a specific order
 * @returns order deatils data on success or error
 */

export const getOrderDetails = createAsyncThunk(
  'order/getOrderDetails',
  async (params: IGetOrderDetailsParams, thunkAPI) => {
    try {
      const url = `${baseUrl}/${orderDetail}?order_id=${params.order_id}`;

      const headers = {
        access_token: params.access_token,
      };
      const response = await axios.get(url, {
        headers,
      });
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
