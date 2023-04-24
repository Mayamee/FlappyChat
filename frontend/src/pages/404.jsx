import { useTranslation } from 'react-i18next'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import { Link } from 'react-router-dom'
import notFoundIcon from '@/assets/icons/404.svg'

const Page404 = () => {
  const { t } = useTranslation()
  return (
    <Container fluid>
      <Row className="h-100 justify-content-center align-items-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <div className="text-muted text-center">
            <Image src={notFoundIcon} className="w-100" />
            <h1 className="text-center h4 mt-4">{t('notFoundPage.title')}</h1>
            <p>
              {t('notFoundPage.text')}
              &nbsp;
              <Link to="/" replace>
                {t('notFoundPage.link')}
              </Link>
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Page404
