import { Button } from 'react-bootstrap'
import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import { Link } from 'react-router-dom'
import { useAuth } from '@/context/auth'

const Layout = ({ children }) => {
  const { isLoggedIn, logout } = useAuth()
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <Navbar as={Link} to="/" className="shadow-sm text-decoration-none" bg="white">
          <Container>
            <Navbar.Brand>Hexlet Chat</Navbar.Brand>
            {isLoggedIn && (
              <Button onClick={logout} variant="primary">
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
