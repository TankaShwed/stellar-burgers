import reducer, { initialState, orderThunk, OrderState } from './order-slice';

describe('Редьюсер для данных заказа', () => {
  let newstate: OrderState;
  describe('заказ в процессе загрузки', () => {
    beforeAll(() => {
      const action = { type: orderThunk.pending.type };
      newstate = reducer(initialState, action);
    });
    it('выставлен флаг загрузки', () => {
      expect(initialState.orderRequest).toBeFalsy();
      expect(newstate.orderRequest).toBeTruthy();
    });
    it('заказ пуст', () => {
      expect(newstate.order).toBeFalsy();
    });
    describe('загрузка пользователя завершилась', () => {
      let state: OrderState;
      beforeAll(() => {
        const action = orderThunk.fulfilled(
          {
            success: false,
            order: {
              _id: 'q',
              status: 'success',
              name: 'e',
              createdAt: 'r',
              updatedAt: 't',
              number: 0,
              ingredients: ['test1', 'test2', 'test3']
            },
            name: 'q'
          },
          '',
          ['test1', 'test2', 'test3']
        );
        state = reducer(newstate, action);
      });
      it('убран флаг загрузки', () => {
        expect(state.orderRequest).toBeFalsy();
      });
      it('записанны данные заказа', () => {
        expect(state.order?.status).toEqual('success');
        expect(state.order?._id).toEqual('q');
      });
    });
  });
});
