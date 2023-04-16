import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/auth'
import selectAuth from '@/redux/selectors/selectAuth'
import { logout } from '@/redux/slices/authSlice'

const Layout = ({ children }) => {
  const isLogin = useSelector(selectAuth)
  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <Navbar className="shadow-sm text-decoration-none" bg="white">
          <Container>
            <Navbar.Brand as={Link} to="/">
              Hexlet Chat
            </Navbar.Brand>
            {isLogin && (
              <Button onClick={logoutHandler} variant="primary">
                Выйти
              </Button>
            )}
          </Container>
        </Navbar>
      </header>
      <main className="flex-fill d-flex">{children}</main>
    </div>
  )
}

export default Layout
