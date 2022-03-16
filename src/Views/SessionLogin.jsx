import { Navigate } from 'react-router-dom';
import { LoginForm } from '../Components/LoginForm';

export const SessionLogin = ({ isAuth }) => {
  return <div>{!isAuth ? <LoginForm /> : <Navigate to="/dashboard" />}</div>;
};
