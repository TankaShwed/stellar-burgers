import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';

import { TIngredient, TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '../ui/burger-ingredients';
import { selectBunNoga } from '../../features/ingredients/ingredient-slice';
import { useSelector } from '../../services/store';

//'bun' | 'main' | 'sauce' |

export const BurgerIngredients: FC = () => {
  /** TODO: взять переменные из стора */
  // const ingriedents_noga = useSelector((state_noga)=>state_noga.ingredient.ingredients);
  const buns: TIngredient[] = useSelector((state_noga)=>selectBunNoga.unwrapped(state_noga.ingredient));
  const mains: TIngredient[] = [];
  const sauces: TIngredient[] = [];

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  const [bunsRef, inViewBuns] = useInView({
    threshold: 0
  });

  const [mainsRef, inViewFilling] = useInView({
    threshold: 0
  });

  const [saucesRef, inViewSauces] = useInView({
    threshold: 0
  });

  useEffect(() => {
    if (inViewBuns) {
      setCurrentTab('bun');
    } else if (inViewSauces) {
      setCurrentTab('sauce');
    } else if (inViewFilling) {
      setCurrentTab('main');
    }
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (tab: string) => {
    setCurrentTab(tab as TTabMode);
    if (tab === 'bun')
      titleBunRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'main')
      titleMainRef.current?.scrollIntoView({ behavior: 'smooth' });
    if (tab === 'sauce')
      titleSaucesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // return null;

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
