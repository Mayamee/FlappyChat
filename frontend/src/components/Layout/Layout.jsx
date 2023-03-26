import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column mh100vh">
      <header>
        <Navbar className="shadow-sm" bg="white">
          <Container>
            <Navbar.Brand>Hexlet Chat</Navbar.Brand>
          </Container>
        </Navbar>
      </header>
      <main className="flex-fill d-flex">{children}</main>
    </div>
  )
}

export default Layout
