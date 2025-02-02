import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginThunk } from '../../features/user-slice/user-slice';
import { useLocation, useNavigate } from 'react-router-dom';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const user = useSelector((st) => st.user.user);
  const navigate = useNavigate();
  const error = useSelector((st) => st.user.error);
  const location = useLocation();
  useEffect(() => {
    if (user) {
      const path = location.state?.from || '/'
      navigate(path);
    }
  }, [user]);
  const dispatch = useDispatch();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      loginThunk({
        email: email,
        password: password
      })
    );
  };
  return (
    <LoginUI
      errorText={error || ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
