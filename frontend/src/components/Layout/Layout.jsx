import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import selectAuth from '@/redux/selectors/selectAuth'
import BgLayer from '@/assets/icons/bg-pattern.svg'
import { useBreakPoint } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/vars'
import LanguageButton from '@/components/common/LanguageButton'
import LogoutButton from '@/components/common/LogoutButton'
import { openMenu } from '@/redux/slices/menuSlice'

const topBarHeight = 60

const Layout = ({ children }) => {
  const isLogin = useSelector(selectAuth)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const isSmallScreen = useBreakPoint(BREAKPOINTS.sm)
  const openMenuHandler = () => {
    dispatch(openMenu())
  }
  const renderLanguageButton = () => {
    if (!isLogin) {
      return <LanguageButton />
    }
    if (!isSmallScreen) {
      return <LanguageButton />
    }
    return null
  }

  return (
    <div id="chat-wrapper" className="d-flex flex-column h-100">
      <div id="bg-pattern">
        <img src={BgLayer} alt="" />
      </div>
      <header
        className={clsx({
          'mb-3': !isSmallScreen,
        })}
        style={{
          height: topBarHeight,
        }}
      >
        <Navbar className="shadow-sm text-decoration-none" bg="white" expand="sm">
          <Container>
            <Navbar.Brand as={Link} to="/">
              {t('layout.brand')}
            </Navbar.Brand>
            <div className="flex-fill" />
            {renderLanguageButton()}
            {isLogin && !isSmallScreen && <LogoutButton>{t('layout.logoutButton')}</LogoutButton>}
            {isLogin && <Navbar.Toggle onClick={openMenuHandler} aria-controls="nav" />}
          </Container>
        </Navbar>
      </header>
      <main
        className="flex-fill d-flex"
        style={{
          height: isSmallScreen
            ? `calc(100% - ${topBarHeight}px)`
            : `calc(100% - ${topBarHeight}px - 1rem)`,
        }}
      >
        {children}
      </main>
    </div>
  )
}

export default Layout
