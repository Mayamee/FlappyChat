import notFoundIcon from '@icons/404.svg'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom'

const Page404 = () => {
  return (
    <Container fluid>
      <Row className="h-100 justify-content-center align-items-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <div className="text-muted text-center">
            <Image src={notFoundIcon} className="w-100" />
            <h1 className="text-center h4 mt-4">Страница не найдена</h1>
            <p>
              Но вы можете перейти&nbsp;
              <Link to="/" replace>
                на главную страницу
              </Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Page404
