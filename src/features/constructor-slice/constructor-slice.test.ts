import {
  UnknownAction
} from '@reduxjs/toolkit';
import reducer, {
  addIngredient,
  ConstructorState,
  initialState,
  moveUpIngredient,
  removeIngredient
} from './constructor-slice';

const protoIngridient = {
  _id: '1',
  name: 'булка-1',
  type: 'bun',
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  __v: 0
};

describe('Редьюсер для конструктора бургера', () => {
  let action: UnknownAction, newstate: ConstructorState;
  describe('добавление булки в конструктор', () => {
    beforeAll(() => {
      action = addIngredient(protoIngridient);
      newstate = reducer(initialState, action);
    });
    it('булка установлена', () => {
      expect(newstate.bun).toMatchObject(protoIngridient);
    });
    it('ингридиенты пусты', () => {
      expect(newstate.ingredients).toEqual([]);
    });
    describe('замена булки', () => {
      beforeAll(() => {
        action = addIngredient({ ...protoIngridient, _id: '2' });
        newstate = reducer(newstate, action);
      });
      it('другая булка установлена', () => {
        expect(newstate.bun!._id).toEqual('2');
      });

      it('ингридиенты пусты', () => {
        expect(newstate.ingredients).toEqual([]);
      });
    });
  });
  describe('добавление ингридиента', () => {
    const mainIngridient = { ...protoIngridient, type: 'main', _id: '3' };
    beforeAll(() => {
      action = addIngredient(mainIngridient);
      newstate = reducer(initialState, action);
    });
    it('один игридиент в списке', () => {
      expect(newstate.ingredients[0]).toMatchObject(mainIngridient);
    });
    it('булки не задана', () => {
      expect(newstate.bun).toBeUndefined();
    });
    describe('добавление второго игридиента', () => {
      let state: ConstructorState;
      beforeAll(() => {
        action = addIngredient({...mainIngridient, _id: '4'});
        state = reducer(newstate, action);
      });
      it('два ингридиента в списке', ()=>{
        expect(state.ingredients.length).toEqual(2);
      });
      it('игридиент с идентификатором 3 первый в списке', ()=>{
        expect(state.ingredients[0]._id).toEqual('3');
      });
      it('игридиент с идентификатором 4 второй в списке', ()=>{
        expect(state.ingredients[1]._id).toEqual('4');
      });
      describe('второй ингридиент поднять на верх', ()=>{
        beforeAll(() => {
            action = moveUpIngredient(1);
            state = reducer(state, action);
        });
        it('ингридент с идентификаторм 4 на первом месте',()=>{
            expect(state.ingredients[0]._id).toEqual('4');
        })
      })
    });
    describe('удаление ингридиента', () => {
      beforeAll(() => {
        action = removeIngredient(0);
        newstate = reducer(initialState, action);
      });
      it('ингридиенты пусты', () => {
        expect(newstate.ingredients).toEqual([]);
      });
    });
  });
});
