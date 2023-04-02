import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import RegisterImg from '@images/registerImg.jpg'
import SignupForm from '@components/SignupForm/SignupForm'

const Signup = () => {
  return (
    <Container fluid className="flex-fill">
      <Row className="h-100 d-flex justify-content-center align-items-center">
        <Col xxl={6} md={8} xs={12}>
          <Card className="shadow-sm">
            <Card.Body className="py-5 py-md-3 my-0 my-lg-5">
              <Row className="align-items-center px-3 px-sm-5">
                <Col xs={12} lg={6} className="d-flex align-items-center justify-content-center">
                  <Image roundedCircle src={RegisterImg} />
                </Col>
                <Col xs={12} lg={6} className="my-lg-0 my-3">
                  <SignupForm />
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default Signup
