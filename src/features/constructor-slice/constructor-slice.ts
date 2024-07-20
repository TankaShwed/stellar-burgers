import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '../../utils/types';
import { v4 as uuid4 } from 'uuid';

export const loadConstrtuctorThunk = createAsyncThunk(
  'ingridients/load_noga',
  () => getIngredientsApi()
);

export type ConstructorState = {
  bun?: TIngredient;
  ingredients: TConstructorIngredient[];
};

const initialState: ConstructorState = {
  ingredients: []
};

export const constructorSlice = createSlice({
  name: 'constructorBurger',
  initialState,
  reducers: {
    addIngredient: {
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type == 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push({
            ...action.payload,
          });
        }
      },
      prepare: (ingredient: TIngredient) => {
        return { payload: { ...ingredient, id: uuid4() } };
      }
    },
    removeIngredient: (state, action: PayloadAction<number>) => {
      state.ingredients = state.ingredients.filter(
        (ing, ind) => ind !== action.payload
      );
    },
    moveUpIngredient: (state, action: PayloadAction<number>) => {
      let g: number = action.payload;
      let bg = state.ingredients[g];
      state.ingredients[g] = state.ingredients[g - 1];
      state.ingredients[g - 1] = bg;
    },
    moveDownIngredient: (state, action: PayloadAction<number>) => {
      let g: number = action.payload;
      let bg = state.ingredients[g];
      state.ingredients[g] = state.ingredients[g + 1];
      state.ingredients[g + 1] = bg;
    },
    cleareIngredients: (state) => {
      state.bun = undefined;
      state.ingredients = [];
    }
  },
  selectors: {},
  extraReducers: (builder_noga) => {} //?
});

export const {
  addIngredient,
  removeIngredient,
  moveUpIngredient,
  moveDownIngredient
} = constructorSlice.actions;
export default constructorSlice.reducer;
export const {} = constructorSlice.selectors;
export const { cleareIngredients } = constructorSlice.actions;
