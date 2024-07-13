import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';
import { orderThunk } from '../../features/order-slice/order-slice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */
  const constructorItems = useSelector((state)=>state.constructorBurger);
  const user = useSelector(state=>state.user.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orderRequest = false;

  const orderModalData = null;

  const onOrderClick = () => {
    if (!user){
      navigate('/login');
      return;
    }
    if (!constructorItems.bun || orderRequest) return;
    dispatch(orderThunk([...constructorItems.ingredients.map(i=>i._id), constructorItems.bun._id]))
  };
  const closeOrderModal = () => {};

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  // return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
