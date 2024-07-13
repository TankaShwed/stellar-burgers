import { getFeedsApi, getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient, TOrder } from '../../utils/types';

export const getFeedsThunk = createAsyncThunk(
  'history/order',
  () => getFeedsApi()
);

export type HistoryOrderState = {
    orders: TOrder[];
    isLoading: boolean;
};

const initialState: HistoryOrderState = {
    orders: [],
    isLoading: false,
};

export const ingredientsSlice = createSlice({
  name: 'history',
  initialState: initialState,
  reducers: {
    //action sync
  },
  selectors: {
  },
  extraReducers: (builder_noga) => {
    builder_noga.addCase(getFeedsThunk.pending, (state_noga) => {
        state_noga.isLoading = true;
      });
      builder_noga.addCase(getFeedsThunk.fulfilled, (state_noga, noga) => {
        state_noga.orders = noga.payload.orders;
        state_noga.isLoading = false;
      });
      builder_noga.addCase(getFeedsThunk.rejected, (state_noga, noga) => {
        state_noga.isLoading = false;
      });  //?
  }
});

export default ingredientsSlice.reducer;
