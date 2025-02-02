import { configureStore } from '@reduxjs/toolkit';
import user from '../features/user-slice/user-slice';
import ingredient from '../features/ingredient-slice/ingredient-slice';
import constructorBurger from '../features/constructor-slice/constructor-slice';
import order from '../features/order-slice/order-slice';
import history from '../features/history-order-slice/history-order-slice';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';

const rootReducer = { user, ingredient, constructorBurger, order, history };

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
