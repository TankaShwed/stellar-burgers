import { TIngredient } from '@utils-types';
import reducer, { initialState, loadIngredientsNogaThunk, IngredientState } from './ingredient-slice';

const ingredientResponse: TIngredient[] = [
  {
    _id: 'qwe',
    name: 'qwe',
    type: 'main',
    proteins: 1,
    fat: 1,
    carbohydrates: 1,
    calories: 2,
    price: 3,
    image: 'https://code.s3.yandex.net/react/code/meat-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/meat-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/meat-01-large.png'
  }
] as TIngredient[];

describe('Редьюсер для данных списка ингредиентов', () => {
  let newstate: IngredientState;
  describe('ингредиенты в процессе загрузки', () => {
    beforeAll(() => {
      const action = { type: loadIngredientsNogaThunk.pending.type };
      newstate = reducer(initialState, action);
    });
    it('выставлен флаг загрузки', () => {
      expect(initialState.isIngredientsLoading).toBeFalsy();
      expect(newstate.isIngredientsLoading).toBeTruthy();
    });
    it('ингредиенты пусты', () => {
      expect(newstate.ingredients).toEqual([]);
    });
    describe('загрузка ингредиентов завершилась', () => {
      let state: IngredientState;
      beforeAll(() => {
        const action = loadIngredientsNogaThunk.fulfilled(
          ingredientResponse,
          ''
        );
        state = reducer(newstate, action);
      });
      it('убран флаг загрузки', () => {
        expect(state.isIngredientsLoading).toBeFalsy();
      });
      it('записанны данные ингредиентов', () => {
        expect(state.ingredients.length).toEqual(1);
        expect(state.ingredients[0]._id).toEqual('qwe');
      });
    });
  });
});
