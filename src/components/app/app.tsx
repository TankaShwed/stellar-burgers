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

import { AppHeader, IngredientDetails, Modal, OrderInfo } from '@components';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
// import { ProtectedRoute } from '../protected-route/protected-route';

const App = () => {
  console.log('app');
  return (
    <div className={styles.app}>
      <AppHeader />
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<ConstructorPage />} />
          <Route path='/feed' element={<Feed />} />
          // Защищённые маршруты
          {/* <Route path='/login' element={
        <ProtectedRoute accessRoles={[ROLE.ADMIN]}>
        <Login />
      </ProtectedRoute>
        
        } /> */}
          <Route path='/register' element={<Register />} />
          <Route path='/register' element={<Register />} />
          <Route path='/forgot-password' element={<ForgotPassword />} />
          <Route path='/reset-password' element={<ResetPassword />} />
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/orders' element={<ProfileOrders />} />
          // Маршрут по умолчанию
          <Route path='/ingredients/:id' element={<IngredientDetails/>} />
          <Route path='*' element={<NotFound404 />} />
          //модалки с дополнительной информацией
          {/* <Route
          path='/feed/:number'
          сomponent={(props) => (
            <>
              {' '}
              {props.match.params.number ? (
                <Modal component={OrderInfo} />
              ) : null}
              <Feed />
            </>
          )}
        /> */}
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
