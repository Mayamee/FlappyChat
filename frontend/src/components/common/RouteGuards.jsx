import { Outlet, Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import selectAuth from '@/redux/selectors/selectAuth';

export const PrivateRoute = () => {
  const isLogin = useSelector(selectAuth);
  const location = useLocation();
  return isLogin ? <Outlet /> : <Navigate to="/login" state={{ from: location }} />;
};

export const AuthRoute = () => {
  const isLogin = useSelector(selectAuth);
  const location = useLocation();
  return isLogin ? (
    <Navigate to={location.state?.from || '/'} state={{ from: location }} />
  ) : (
    <Outlet />
  );
};
