import reducer, { initialState, HistoryOrderState, getFeedsThunk} from './history-order-slice';

describe('Редьюсер для данных истории заказов', () => {
  let newstate: HistoryOrderState;
  describe('ингредиенты в процессе загрузки', () => {
    beforeAll(() => {
      const action = { type: getFeedsThunk.pending.type };
      newstate = reducer(initialState, action);
    });
    it('выставлен флаг загрузки', () => {
      expect(initialState.isLoading).toBeFalsy();
      expect(newstate.isLoading).toBeTruthy();
    });
    it('заказы пусты', () => {
      expect(newstate.orders).toEqual([]);
    });
    describe('загрузка заказов завершилась', () => {
      beforeAll(() => {
        const date = (new Date()).toISOString();
        const action = getFeedsThunk.fulfilled(
          {
            success: true,
            orders: [{
              _id: 'string',
              status: 'completed',
              name: 'string',
              createdAt: date,
              updatedAt: 'string',
              number: 1,
              ingredients: ['string','string2','string3'],
          }],
            total: 1,
            totalToday: 1
          },
          ''
        );
        newstate = reducer(newstate, action);
      });
      it('убран флаг загрузки', () => {
        expect(newstate.isLoading).toBeFalsy();
      });
      it('записанны данные заказов', () => {
        expect(newstate.orders.length).toEqual(1);
        expect(newstate.orders[0]._id).toEqual('string');
      });
      it('записанны общая статистика заказов', () => {
        expect(newstate.feed.total).toEqual(1);
        expect(newstate.feed.totalToday).toEqual(1);
      });
    });
  });
});
