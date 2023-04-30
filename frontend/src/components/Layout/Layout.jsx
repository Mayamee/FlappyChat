import { useSelector, useDispatch } from 'react-redux'
import { Button, Dropdown } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import selectAuth from '@/redux/selectors/selectAuth'
import { logout } from '@/redux/slices/authSlice'
import BgLayer from '@/assets/icons/bg-pattern.svg'

const topBarHeight = 60

const Layout = ({ children }) => {
  const isLogin = useSelector(selectAuth)
  const { t, i18n } = useTranslation()
  const dispatch = useDispatch()
  const logoutHandler = () => {
    localStorage.removeItem('authData')
    dispatch(logout())
  }
  const changeLanguage = (lng) => () => {
    i18n.changeLanguage(lng)
  }
  return (
    <div className="d-flex flex-column vh-100">
      <div id="bg-pattern">
        <img src={BgLayer} alt="" />
      </div>
      <header
        className="mb-3"
        style={{
          height: topBarHeight,
        }}
      >
        <Navbar className="shadow-sm text-decoration-none" bg="white">
          <Container>
            <Navbar.Brand as={Link} to="/">
              {t('layout.brand')}
            </Navbar.Brand>
            <div className="flex-fill" />
            <Dropdown>
              <Dropdown.Toggle variant="primary" id="change-language-menu">
                {i18n.language.toUpperCase()}
              </Dropdown.Toggle>
              <Dropdown.Menu
                style={{
                  minWidth: '5rem',
                }}
              >
                {Object.keys(i18n.store.data).map((lng) => (
                  <Dropdown.Item key={lng} onClick={changeLanguage(lng)}>
                    {lng.toUpperCase()}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
            {isLogin && (
              <Button className="ms-3" onClick={logoutHandler} variant="secondary">
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
