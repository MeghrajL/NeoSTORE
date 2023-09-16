import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios, {AxiosResponse} from 'axios';
import Toast from 'react-native-simple-toast';
import {baseUrl, getList, getDetail} from '../../url';
const initialState = {
  category: [],
  productData: [],
  rating: [],
  isLoading: false,
  isError: false,
};

interface getCategoryListParams {
  product_category_id: string;
  limit?: Number;
  page?: Number;
}

interface getProductParams {
  product_id: string;
}

export const getCategoryList = createAsyncThunk(
  'product/getCategoryList',
  async (params: getCategoryListParams, thunkAPI) => {
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
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (params: getProductParams, thunkAPI) => {
    try {
      const url = `${baseUrl}/${getDetail}?product_id=${params.product_id}`;

      // console.log(url);
      const response = await axios.get(url);
      //   console.log(response.data.data);
      return response.data;
    } catch (error) {
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
      });
  },
});
export default productSlice.reducer;
// export const {cleanState} = authSlice.actions;
