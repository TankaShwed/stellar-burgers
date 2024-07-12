import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';
import { loginThunk } from '../../features/user-slice/user-slice';

export const Login: FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(st=>st.user.error);
  const dispatch = useDispatch();
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(loginThunk({
      email: email,
      password: password
    }))
  };
  console.log('d1', error)
  return (
    <LoginUI
      errorText={error|| ''}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
