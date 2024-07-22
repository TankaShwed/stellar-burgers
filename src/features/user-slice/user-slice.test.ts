import {
  combineReducers,
  configureStore,
  Store,
  UnknownAction
} from '@reduxjs/toolkit';
import reducer, { initialState, loginThunk, UserState } from './user-slice';

describe('Редьюсер для пользовательских данных', () => {
  let newstate: UserState;
  describe('пользователь в процессе загрузки', () => {
    beforeAll(() => {
      const action = { type: loginThunk.pending.type };
      newstate = reducer(initialState, action);
    });
    it('выставлен флаг загрузки', () => {
      expect(initialState.isLoading).toBeFalsy();
      expect(newstate.isLoading).toBeTruthy();
    });
    it('пользователь пуст', () => {
      expect(newstate.user).toBeNull();
    });
    it('ошибка пуста', () => {
      expect(newstate.error).toBeFalsy();
    });
    describe('загрузка пользователя завершилась', () => {
      let state: UserState;
      beforeAll(() => {
        global.localStorage = { setItem: jest.fn() } as unknown as Storage;
        const action = loginThunk.fulfilled(
          {
            refreshToken: 'string',
            accessToken: 'string',
            user: {
              email: 'test@test.test',
              name: 'name name'
            },
            success: true
          },
          '',
          {
            email: 'test@test.test',
            password: 'test@test.test'
          }
        );
        state = reducer(newstate, action);
      });
      it('убран флаг загрузки', () => {
        expect(state.isLoading).toBeFalsy();
      });
      it('записанны данные пользователя', () => {
        expect(state.user?.email).toEqual('test@test.test');
        expect(state.user?.name).toEqual('name name');
      });
    });
    describe('загрузка пользователя завершилась ошибкой', () => {
      let state: UserState;
      beforeAll(() => {
        const action = loginThunk.rejected(new Error('Error'), '', {
          email: 'test@test.test',
          password: 'test@test.test'
        });
        state = reducer(newstate, action);
      });
      it('выставлен флаг загрузки', () => {
        expect(state.isLoading).toBeFalsy();
      });
      it('пользователь пуст', () => {
        expect(state.user).toBeNull();
      });
      it('ошибка пуста', () => {
        expect(state.error).toEqual('Error');
      });
    });
  });
});
