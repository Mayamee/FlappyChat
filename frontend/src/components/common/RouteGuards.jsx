import { Navigate, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'
import selectAuth from '@/redux/selectors/selectAuth'

// Redirect to login if user is not logged in
export const PrivateRoute = ({ children }) => {
  const isLogin = useSelector(selectAuth)
  const location = useLocation()
  return isLogin ? children : <Navigate to="/login" state={{ from: location }} />
}
// Redirect to home if user is logged in
export const AuthRoute = ({ children }) => {
  const isLogin = useSelector(selectAuth)
  const location = useLocation()
  return isLogin ? <Navigate to="/" state={{ from: location }} /> : children
}
