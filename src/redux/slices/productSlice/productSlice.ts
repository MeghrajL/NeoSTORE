import {createSlice} from '@reduxjs/toolkit';

import {IInitialState} from './type';

import {getCategoryList, getProduct, setProductRating} from './actions';

const initialState: IInitialState = {
  category: null,
  productData: null,
  rating: null,
  isLoading: false,
  isError: false,
  isSettingRating: false,
};

/**
 * @author Meghraj Vilas Lot
 * @description This reducer function performs changes redux state for product slice.
 * Contains builder cases for product actions.
 */

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
