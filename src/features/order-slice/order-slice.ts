import { orderBurgerApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TOrder } from '../../utils/types';

export const orderThunk = createAsyncThunk('order/order', (data: string[]) =>
  orderBurgerApi(data)
);

export type OrderState = {
  orderRequest: boolean;
  order?: TOrder;
  // id: TIngredient;
};

const initialState: OrderState = {
  orderRequest: false
  // id: []
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = undefined;
      state.orderRequest = false;
    }
  },
  selectors: {},
  extraReducers: (builder_noga) => {
    builder_noga.addCase(orderThunk.pending, (state_noga) => {
      state_noga.orderRequest = true;
    });
    builder_noga.addCase(orderThunk.fulfilled, (state_noga, noga) => {
      state_noga.order = noga.payload.order;
      state_noga.orderRequest = false;
    });
    builder_noga.addCase(orderThunk.rejected, (state_noga, noga) => {});  //?
  }
});

export default orderSlice.reducer;
export const { clearOrder } = orderSlice.actions;
export const {} = orderSlice.selectors;
