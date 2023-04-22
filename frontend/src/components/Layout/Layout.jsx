import { useSelector, useDispatch } from 'react-redux'
import { Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import selectAuth from '@/redux/selectors/selectAuth'
import { logout } from '@/redux/slices/authSlice'

const topBarHeight = 60

const Layout = ({ children }) => {
  const isLogin = useSelector(selectAuth)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const logoutHandler = () => {
    localStorage.removeItem('authData')
    dispatch(logout())
  }
  return (
    <div className="d-flex flex-column vh-100">
      <header
        style={{
          height: topBarHeight,
        }}
      >
        <Navbar className="shadow-sm text-decoration-none" bg="white">
          <Container>
            <Navbar.Brand as={Link} to="/">
              {t('layout.brand')}
            </Navbar.Brand>
            {isLogin && (
              <Button onClick={logoutHandler} variant="primary">
                {t('layout.logoutButton')}
              </Button>
            )}
          </Container>
        </Navbar>
      </header>
      <main
        className="flex-fill d-flex"
        style={{
          height: `calc(100% - ${topBarHeight}px)`,
        }}
      >
        {children}
      </main>
    </div>
  )
}

export default Layout
