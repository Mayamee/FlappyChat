import { Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { logout } from '@/redux/slices/authSlice'

const LogoutButton = ({ children }) => {
  const dispatch = useDispatch()
  const logoutHandler = () => {
    localStorage.removeItem('authData')
    dispatch(logout())
  }
  return (
    <Button className="ms-3" onClick={logoutHandler} variant="secondary">
      {children}
    </Button>
  )
}

export default LogoutButton
