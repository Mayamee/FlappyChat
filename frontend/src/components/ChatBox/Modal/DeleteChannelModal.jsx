import { Button, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const DeleteChannelModal = ({ show, onAction: doAction, onHide: closeHandler }) => {
  const { t } = useTranslation()
  const handleClick = () => {
    doAction()
    closeHandler()
  }
  return (
    <Modal show={show} onHide={closeHandler} centered>
      <Modal.Header closeButton>
        <Modal.Title>Вы действительно хотите удалить?</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="text-end">
          <Button onClick={handleClick} variant="danger" className="me-2">
            {t('chatPage.modals.removeModal.buttons.submit')}
          </Button>
          <Button variant="secondary" onClick={closeHandler}>
            {t('chatPage.modals.removeModal.buttons.cancel')}
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default DeleteChannelModal
