import Container from 'react-bootstrap/Container'
import Navbar from 'react-bootstrap/Navbar'
import styles from './Layout.module.scss'

const Layout = ({ children }) => {
  return (
    <div className={styles.wrapper}>
      <header>
        <Navbar bg="light">
          <Container>
            <Navbar.Brand>Hexlet Chat</Navbar.Brand>
          </Container>
        </Navbar>
      </header>
      <main>{children}</main>
    </div>
  )
}

export default Layout
