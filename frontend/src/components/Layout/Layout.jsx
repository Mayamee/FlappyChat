import { Container, Navbar } from 'react-bootstrap'
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
