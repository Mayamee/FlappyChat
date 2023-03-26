import LoginForm from '@components/LoginForm/LoginForm'
import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'

const Login = () => {
  return (
    <Container fluid>
      <Row>
        <LoginForm />
      </Row>
    </Container>
  )
}

export default Login
