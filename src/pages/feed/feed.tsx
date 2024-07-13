import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getFeedsThunk } from '../../features/history-order-slice/history-order-slice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора */
  const orders: TOrder[] = useSelector((st) => st.history.orders);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeedsThunk())
  }, []);
  if (!orders.length) {
    return <Preloader />;
  }
  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
