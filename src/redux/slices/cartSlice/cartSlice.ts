import {createSlice} from '@reduxjs/toolkit';

import {IInitialState} from './type';
import {addToCart, getCartList, editCart, deleteCart} from './actions';
const initialState: IInitialState = {
  cart: null,
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

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(addToCart.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
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
      })
      .addCase(getCartList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCartList.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getCartList.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(editCart.pending, (state, action) => {
        state.isCartUpdating = true;
      })
      .addCase(editCart.fulfilled, (state, action) => {
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
      })
      .addCase(deleteCart.pending, (state, action) => {
        state.isCartItemDeleting = true;
      })
      .addCase(deleteCart.fulfilled, (state, action) => {
        state.status = action.payload.status;
        state.data = action.payload.data;
        state.total_carts = action.payload.total_carts;
        state.message = action.payload.message;
        state.user_msg = action.payload.user_msg;
        state.isCartItemDeleting = false;
        state.isError = false;
      })
      .addCase(deleteCart.rejected, (state, action) => {
        state.isError = true;
        state.isCartItemDeleting = false;
      });
  },
});
export default cartSlice.reducer;
