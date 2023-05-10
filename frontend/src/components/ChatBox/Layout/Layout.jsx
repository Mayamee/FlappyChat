import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Col, Container, Row, Offcanvas } from 'react-bootstrap'
import { useEffect } from 'react'
import { useBreakPoint } from '@/hooks/useMediaQuery'
import { BREAKPOINTS } from '@/vars'
import { closeMenu } from '@/redux/slices/menuSlice'
import LogoutButton from '@/components/common/LogoutButton'
import LanguageButton from '@/components/common/LanguageButton'

const Layout = ({ channels, messages }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const show = useSelector((state) => state.menu.isOpen)
  const handleClose = () => {
    dispatch(closeMenu())
  }
  const isSmallScreen = useBreakPoint(BREAKPOINTS.sm)
  useEffect(() => {
    if (isSmallScreen) {
      dispatch(closeMenu())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSmallScreen])
  if (isSmallScreen) {
    return (
      <Container fluid className="px-0">
        <Offcanvas
          onHide={handleClose}
          placement="end"
          show={show}
          className="bg-light"
          style={{ width: '250px' }}
        >
          <Offcanvas.Header
            closeButton
            className="d-flex justify-content-end align-items-center mt-2"
          >
            <LanguageButton />
            <div className="me-auto" />
          </Offcanvas.Header>
          <Offcanvas.Body className="p-0">{channels}</Offcanvas.Body>
          <div className="pb-2 px-2 pt-3 d-flex justify-content-end">
            <LogoutButton>{t('layout.logoutButton')}</LogoutButton>
          </div>
        </Offcanvas>

        <Col xs={12} className="h-100 bg-light p-0">
          {messages}
        </Col>
      </Container>
    )
  }
  return (
    <Container className="flex-fill py-4">
      <Row className="h-100 shadow-lg mx-auto">
        <Col xs={4} sm={3} lg={2} className="h-100 bg-light p-0 border-end">
          {channels}
        </Col>
        <Col xs={8} sm={9} lg={10} className="h-100 bg-light p-0">
          {messages}
        </Col>
      </Row>
    </Container>
  )
}

export default Layout //
