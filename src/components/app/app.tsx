import {
  ConstructorPage,
  ForgotPassword,
  NotFound404,
  Profile,
  ProfileOrders,
  Register,
  ResetPassword
} from '@pages';
import { Feed } from '../../pages/feed';
import '../../index.css';
import styles from './app.module.css';

import { AppHeader, IngredientDetails, Modal } from '@components';
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { loadIngredientsNogaThunk } from '../../features/ingredient-slice/ingredient-slice';
import { useDispatch } from '../../services/store';

const App = () => {
  const dispatch_noga = useDispatch();
  useEffect(() => {
    dispatch_noga(loadIngredientsNogaThunk());
  }, []);
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/register' element={<Register />} />
        <Route path='/register' element={<Register />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/reset-password' element={<ResetPassword />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/orders' element={<ProfileOrders />} />
        <Route path='/ingredients/:id' element={<IngredientDetails />} />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
      {backgroundLocation && (
        <Routes>
          <Route
            path='/ingredients/:id'
            element={
              <Modal onClose={() => 0} title={''}>
                <IngredientDetails />
              </Modal>
            }
          />
        </Routes>
      )}
    </div>
  );
};

export default App;
