import { FC, useEffect } from 'react';

import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info';
import { useDispatch, useSelector } from '../../services/store';
import { useParams } from 'react-router-dom';
import { getOrderByNumberThunk } from '../../features/history-order-slice/history-order-slice';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const { id } = useParams<{ id: string }>();
  const orders: TOrder[] = useSelector((st) => st.history.orders);
  const feed = useSelector((st) => st.history.feed || {});
  const dispatch = useDispatch();
  useEffect(() => {
    if (id) dispatch(getOrderByNumberThunk(+id));
  }, [id]);

  const readyOrders = getOrders(orders, 'done');

  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={feed}
    />
  );
};
