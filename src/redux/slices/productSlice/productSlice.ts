import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios, {AxiosResponse} from 'axios';
import {baseUrl, getList, getDetail, setRating} from '../../../url';
import Toast from 'react-native-simple-toast';

import {
  IInitialState,
  IGetCategoryListParams,
  IGetProductParams,
  ISetProductRatingParams,
} from './type';

const initialState: IInitialState = {
  category: null,
  productData: null,
  rating: null,
  isLoading: false,
  isError: false,
  isSettingRating: false,
};

export const getCategoryList = createAsyncThunk(
  'product/getCategoryList',
  async (params: IGetCategoryListParams, thunkAPI) => {
    try {
      let url = `${baseUrl}/${getList}?product_category_id=${params.product_category_id}`;

      if (params.limit !== undefined) {
        url += `&limit=${params.limit}`;
      }
      if (params.page !== undefined) {
        url += `&page=${params.page}`;
      }

      // console.log(url);
      const response = await axios.get(url);
      console.log(response.data.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (params: IGetProductParams, thunkAPI) => {
    try {
      const url = `${baseUrl}/${getDetail}?product_id=${params.product_id}`;

      console.log(params.product_id);
      const response = await axios.get(url);
      //   console.log(response.data.data);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const setProductRating = createAsyncThunk(
  'product/setProductRating',
  async (params: ISetProductRatingParams, thunkAPI) => {
    try {
      console.log('😀', params);
      const {product_id, rating} = params;
      const formData = new FormData();
      formData.append('product_id', product_id);
      formData.append('rating', rating);

      const response = await axios.post(`${baseUrl}/${setRating}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      // console.log(response.data);
      Toast.show('Rating set Successfully', Toast.SHORT);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCategoryList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCategoryList.fulfilled, (state, action) => {
        state.category = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getCategoryList.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(getProduct.pending, (state, action) => {
        console.log('load');
        state.isLoading = true;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.productData = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(setProductRating.pending, (state, action) => {
        console.log('load');
        state.isSettingRating = true;
      })
      .addCase(setProductRating.fulfilled, (state, action) => {
        state.rating = action.payload;
        state.isSettingRating = false;
        state.isError = false;
      })
      .addCase(setProductRating.rejected, (state, action) => {
        state.isError = true;
        state.isSettingRating = false;
      });
  },
});
export default productSlice.reducer;
// export const {cleanState} = authSlice.actions;
