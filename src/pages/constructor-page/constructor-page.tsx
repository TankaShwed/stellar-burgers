import styles from './constructor-page.module.css';

import { BurgerIngredients } from '../../components';
import { BurgerConstructor } from '../../components';
import { Preloader } from '../../components/ui';
import { FC, useEffect } from 'react';
import { loadIngredientsNogaThunk } from '../../features/ingredient-slice/ingredient-slice';
import { useDispatch, useSelector } from '../../services/store';

export const ConstructorPage: FC = () => {
  const dispatch_noga = useDispatch();
  useEffect(() => {
    dispatch_noga(loadIngredientsNogaThunk());
  }, []);
  const isIngredientsLoading = useSelector(
    (state) => state.ingredient.isIngredientsLoading
  );
  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Соберите бургер
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
