import { Button, Modal } from 'react-bootstrap'

const DeleteChannelModal = ({ show, onAction: doAction, onHide: closeHandler }) => {
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
            Удалить
          </Button>
          <Button variant="secondary" onClick={closeHandler}>
            Отмена
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default DeleteChannelModal
