import LoginForm from '@components/LoginForm/LoginForm'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card'
import Container from 'react-bootstrap/Container'
import LoginImg from '@images/loginImg.jpg'
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <Container fluid className="flex-fill">
      <Row className="h-100 d-flex justify-content-center align-items-center">
        <Col xxl={6} md={8} xs={12}>
          <Card className="shadow-sm">
            <Card.Body className="py-5 my-0 my-lg-5">
              <Row className="align-items-center px-3 px-sm-5">
                <Col xs={12} lg={6} className="d-flex align-items-center justify-content-center">
                  <Image roundedCircle src={LoginImg} />
                </Col>
                <Col xs={12} lg={6} className="my-lg-0 my-3">
                  <LoginForm />
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="text-center py-3">
              Нет аккаунта?&nbsp;
              <Link to="/signup">Регистрация</Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
export default Login
