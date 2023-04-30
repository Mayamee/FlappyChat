import { Container, Spinner, Row, Col, Card, Image } from 'react-bootstrap'
import clsx from 'clsx'
import RegisterImg from '@/assets/images/registerImg.jpg'
import SignupForm from '@/components/SignupForm/SignupForm'
import SkeletonImage from '@/components/common/SkeletonImage'

const Signup = () => (
  <Container fluid className="flex-fill">
    <Row className="h-100 d-flex justify-content-center align-items-center">
      <Col xxl={6} md={8} xs={12}>
        <Card className="shadow-sm">
          <Card.Body className="py-5 py-md-3 my-0 my-lg-5">
            <Row className="align-items-center px-3 px-sm-5">
              <Col xs={12} lg={6} className="d-flex align-items-center justify-content-center">
                <SkeletonImage
                  spinner={
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  }
                >
                  {(handleLoad, isLoading) => (
                    <Image
                      onLoad={handleLoad}
                      roundedCircle
                      src={RegisterImg}
                      className={clsx('overflow-hidden', {
                        'visually-hidden': isLoading,
                      })}
                    />
                  )}
                </SkeletonImage>
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

export default Signup
