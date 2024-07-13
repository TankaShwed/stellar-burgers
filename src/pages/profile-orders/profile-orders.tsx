import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { getOrdersThunk } from '../../features/history-order-slice/history-order-slice';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const orders: TOrder[] = useSelector(st=>st.history.myOrders || []);
  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(getOrdersThunk());
  },[]);
  return <ProfileOrdersUI orders={orders} />;
};
