import { combineReducers, configureStore, Store } from '@reduxjs/toolkit';
import constructor from '../features/constructor-slice/constructor-slice';
import history from '../features/history-order-slice/history-order-slice';
import ingredient from '../features/ingredient-slice/ingredient-slice';
import order from '../features/order-slice/order-slice';
import user from '../features/user-slice/user-slice';

const slices = {
  constructor,
  history,
  ingredient,
  order,
  user
};

describe('rootReducer', () => {
  const reducer = combineReducers(slices);
  const store = configureStore({
    reducer
  });
  const state = store.getState();
  Object.keys(slices).forEach((name) => {
    it(`содержит слайс ${name}`, () => expect(state).toHaveProperty(name));
  });
});
