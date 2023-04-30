import { Container, Row, Spinner, Col, Card, Image } from 'react-bootstrap'
import clsx from 'clsx'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import LoginImg from '@/assets/images/loginImg.jpg'
import LoginForm from '@/components/LoginForm/LoginForm'
import SkeletonImage from '@/components/common/SkeletonImage'

const Login = () => {
  const { t } = useTranslation()
  return (
    <Container fluid className="flex-fill">
      <Row className="h-100 d-flex justify-content-center align-items-center">
        <Col xxl={6} sm={10} md={8} xs={12}>
          <Card className="shadow-sm">
            <Card.Body className="py-5 my-0 my-lg-5">
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
                        src={LoginImg}
                        className={clsx('overflow-hidden', {
                          'visually-hidden': isLoading,
                        })}
                      />
                    )}
                  </SkeletonImage>
                </Col>
                <Col xs={12} lg={6} className="my-lg-0 my-3">
                  <LoginForm />
                </Col>
              </Row>
            </Card.Body>
            <Card.Footer className="text-center py-3">
              {t('loginPage.footer.text')}
              &nbsp;
              <Link to="/signup">{t('loginPage.footer.link')}</Link>
            </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
export default Login
