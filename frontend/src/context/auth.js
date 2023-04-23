import {
  createContext, useContext, useMemo, useState,
} from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const userSettings = useMemo(
    () => ({
      isLoggedIn,
      login: () => setLoggedIn(true),
      logout: () => {
        localStorage.removeItem('token');
        setLoggedIn(false);
      },
    }),
    [isLoggedIn],
  );
  return <AuthContext.Provider value={userSettings}>{children}</AuthContext.Provider>;
};
// Redirect to login if user is not logged in
export const PrivateRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  return isLoggedIn ? children : <Navigate to="/login" state={{ from: location }} />;
};
// Redirect to home if user is logged in
export const AuthRoute = ({ children }) => {
  const { isLoggedIn } = useAuth();
  const location = useLocation();
  return isLoggedIn ? <Navigate to="/" state={{ from: location }} /> : children;
};
