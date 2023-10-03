import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {baseUrl, getList, getDetail, setRating} from '../../../constants/url';
import Toast from 'react-native-simple-toast';

import {
  IGetCategoryListParams,
  IGetProductParams,
  ISetProductRatingParams,
} from './type';

/**
 * @author Meghraj Vilas Lot
 * @param {IGetCategoryListParams}
 * @description performs api call for fetching products of specific category
 * @returns category data on success or error
 */

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

      const response = await axios.get(url);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/**
 * @author Meghraj Vilas Lot
 * @param {IGetProductParams}
 * @description performs api call for fetching details of a specific product
 * @returns product data on success or error
 */

export const getProduct = createAsyncThunk(
  'product/getProduct',
  async (params: IGetProductParams, thunkAPI) => {
    try {
      const url = `${baseUrl}/${getDetail}?product_id=${params.product_id}`;

      const response = await axios.get(url);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

/**
 * @author Meghraj Vilas Lot
 * @param {ISetProductRatingParams}
 * @description performs api call for setting rating of product
 * @returns product data with updated rating on success or error
 */

export const setProductRating = createAsyncThunk(
  'product/setProductRating',
  async (params: ISetProductRatingParams, thunkAPI) => {
    try {
      const {product_id, rating} = params;
      const formData = new FormData();
      formData.append('product_id', product_id);
      formData.append('rating', rating);

      const response = await axios.post(`${baseUrl}/${setRating}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      Toast.show('Rating set Successfully', Toast.SHORT);
      return response.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getAllCategoriesData = createAsyncThunk(
  'product/getAllCategoriesData',
  async (_, thunkAPI) => {
    try {
      const allCategoriesData = [];

      for (let categoryId = 1; categoryId <= 4; categoryId++) {
        const url = `${baseUrl}/${getList}?product_category_id=${categoryId}`;

        const response = await axios.get(url);
        allCategoriesData.push(...response.data.data);
      }

      return allCategoriesData;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
