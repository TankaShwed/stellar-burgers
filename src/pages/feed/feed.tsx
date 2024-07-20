import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getFeedsThunk } from '../../features/history-order-slice/history-order-slice';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const orders: TOrder[] = useSelector((st) => st.history.orders);
  const isLoading: boolean = useSelector((st) => st.history.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFeedsThunk());
  }, []);
  useEffect(() => {
    if (orders){
      const id = setTimeout(()=>dispatch(getFeedsThunk()), 3000);
      return ()=>clearTimeout(id);
    }
  }, [orders]);
  if (!orders.length) {
    return <Preloader />;
  }
  return (
    <FeedUI orders={orders} handleGetFeeds={() => dispatch(getFeedsThunk())} />
  );
};
