import { getFeedsApi, getIngredientsApi, getOrderByNumberApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TFeed, TIngredient, TOrder } from '../../utils/types';

export const getFeedsThunk = createAsyncThunk('history/order', () =>
  getFeedsApi()
);

export const getOrderByNumberThunk = createAsyncThunk(
  'history/orderByNumber',
  (id: number) => getOrderByNumberApi(id)
);

export type HistoryOrderState = {
  orders: TOrder[];
  isLoading: boolean;
  order?: TOrder;
  feed: TFeed;
};

const initialState: HistoryOrderState = {
  orders: [],
  isLoading: false,
  feed: { total: 0, totalToday: 0 }
};

export const ingredientsSlice = createSlice({
  name: 'history',
  initialState: initialState,
  reducers: {
    //action sync
  },
  selectors: {},
  extraReducers: (builder_noga) => {
    builder_noga.addCase(getFeedsThunk.pending, (state_noga) => {
      state_noga.isLoading = true;
    });
    builder_noga.addCase(getFeedsThunk.fulfilled, (state_noga, noga) => {
      state_noga.orders = noga.payload.orders;
      const today = new Date();
      today.setUTCHours(0,0,0,0);
      state_noga.feed = {
        total: state_noga.orders.length,
        totalToday: state_noga.orders.filter(o=>(new Date(o.createdAt).getTime()) > today.getTime()).length
      }
      state_noga.isLoading = false;
    });
    builder_noga.addCase(getFeedsThunk.rejected, (state_noga, noga) => {
      state_noga.isLoading = false;
    });
    builder_noga.addCase(getOrderByNumberThunk.pending, (state_noga) => {
      state_noga.isLoading = true;
    });
    builder_noga.addCase(
      getOrderByNumberThunk.fulfilled,
      (state_noga, noga) => {
        state_noga.order = noga.payload.orders[0];
        state_noga.isLoading = false;
      }
    );
    builder_noga.addCase(getOrderByNumberThunk.rejected, (state_noga, noga) => {
      state_noga.isLoading = false;
    });
  }
});

export default ingredientsSlice.reducer;
