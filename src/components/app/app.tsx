import {
  ConstructorPage,
  ForgotPassword,
  Login,
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
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { loadIngredientsNogaThunk } from '../../features/ingredient-slice/ingredient-slice';
import { useDispatch, useSelector } from '../../services/store';

const App = () => {
  const dispatch_noga = useDispatch();
  const user = useSelector(st=>st.user.user);
  useEffect(() => {
    dispatch_noga(loadIngredientsNogaThunk());
  }, []);
  const location = useLocation();
  const backgroundLocation = location.state?.background;
  const navigate = useNavigate();
  const onClose = ()=> navigate('/');
  return (
    <div className={styles.app}>
      <AppHeader userName={user?.name || ''} />
      <Routes location={backgroundLocation || location}>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route path='/login' element={<Login />} />
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
              <Modal onClose={onClose} title={'Детали ингредиента'}>
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
