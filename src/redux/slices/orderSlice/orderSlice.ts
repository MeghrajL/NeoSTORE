import {createSlice} from '@reduxjs/toolkit';
import {IInitialState} from './type';
import {placeOrder, getOrderList, getOrderDetails} from './actions';

const initialState: IInitialState = {
  orderData: null,
  orderList: null,
  orderDetails: null,
  isLoading: false,
  isError: false,
};

/**
 * @author Meghraj Vilas Lot
 * @description This reducer function performs changes redux state for order slice.
 * Contains builder cases for order actions.
 */

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(placeOrder.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.orderData = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(getOrderList.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getOrderList.fulfilled, (state, action) => {
        state.orderList = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getOrderList.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      })
      .addCase(getOrderDetails.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getOrderDetails.fulfilled, (state, action) => {
        state.orderDetails = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(getOrderDetails.rejected, (state, action) => {
        state.isError = true;
        state.isLoading = false;
      });
  },
});
export default orderSlice.reducer;
