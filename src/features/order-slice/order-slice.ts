import { getIngredientsApi, orderBurgerApi } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../utils/types';

export const orderThunk = createAsyncThunk('order/order', (data: string[]) =>
  orderBurgerApi(data)
);

export type OrderState = {
  // id: TIngredient;
};

const initialState: OrderState = {
  // id: []
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  selectors: {},
  extraReducers: (builder_noga) => {
    builder_noga.addCase(orderThunk.pending, (state_noga) => {});
    builder_noga.addCase(orderThunk.fulfilled, (state_noga, noga) => {});
    builder_noga.addCase(orderThunk.rejected, (state_noga, noga) => {});
  }
});

export default orderSlice.reducer;
export const {} = orderSlice.selectors;
