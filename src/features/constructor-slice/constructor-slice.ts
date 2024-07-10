import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../utils/types';

export const loadConstrtuctorThunk = createAsyncThunk(
  'ingridients/load_noga',
  () => getIngredientsApi()
);

export type ConstructorState = {
  bun?: TIngredient;
  ingredients: TConstructorIngredient[];
};

const initialState: ConstructorState = {
  //   bun: { price: 0 },
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    //action sync
    addIngredient: (state, action: PayloadAction<TIngredient>) => {
      if (action.payload.type == 'bun') {
        state.bun = action.payload;
      } else {
        state.ingredients.push({
          ...action.payload,
          id: '' + state.ingredients.length
        });
      }
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      const t = state.ingredients;
      state.ingredients = [];
      for (let i = 0; i < t.length; i++) {
        if (i !== action.payload) {
          state.ingredients.push(t[i]);
        }
      }
    }
  },
  selectors: {},
  extraReducers: (builder_noga) => {}
});

export const { addIngredient, removeIngredient } = constructorSlice.actions;
export default constructorSlice.reducer;
export const {} = constructorSlice.selectors;
