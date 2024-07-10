import { getIngredientsApi } from '@api';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { TIngredient } from '../../utils/types';

export const loadIngredientsNogaThunk = createAsyncThunk(
  'ingridients/load_noga',
  () => getIngredientsApi()
);

export type IngredientState = {
  isIngredientsLoading: boolean;
  ingredients: TIngredient[];
};

const initialState: IngredientState = {
  isIngredientsLoading: false,
  ingredients: []
};

export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: initialState,
  reducers: {
    //action sync
  },
  selectors: {
    loadingIngredients: (sliceState) => sliceState.isIngredientsLoading,
    selectBun: (sta)=>sta.ingredients.filter(ing=>ing.type=='bun'),
    selectMains: (sta)=>sta.ingredients.filter(ing=>ing.type=='main'),
    selectSauces: (sta)=>sta.ingredients.filter(ing=>ing.type=='sauce')
  },
  extraReducers: (builder_noga) => {
    builder_noga.addCase(loadIngredientsNogaThunk.pending, (state_noga) => {
      state_noga.isIngredientsLoading = true;
    });
    builder_noga.addCase(loadIngredientsNogaThunk.fulfilled, (state_noga, noga) => {
      state_noga.isIngredientsLoading = false;
      state_noga.ingredients = noga.payload;
    });
  }
});

// export const {init} = userSlice.actions;

export default ingredientsSlice.reducer;
export const { selectBun: selectBun } = ingredientsSlice.selectors;
export const { selectMains: selectMains } = ingredientsSlice.selectors;
export const { selectSauces: selectSauces } = ingredientsSlice.selectors;

