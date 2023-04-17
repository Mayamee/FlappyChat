import { useFormik } from 'formik'
import { useEffect, useRef } from 'react'
import { Button, Form, FormGroup, InputGroup, Modal } from 'react-bootstrap'

const RenameChannelModal = ({
  name: currentName,
  show,
  onAction: doAction,
  onHide: closeHandler,
  onValidate: validateHandler,
}) => {
  const inputRef = useRef(null)
  const f = useFormik({
    initialValues: {
      name: currentName,
    },
    onSubmit: ({ name }) => {
      doAction(name)
      closeHandler()
    },
    validate: validateHandler,
  })
  const hideHandler = () => {
    f.resetForm()
    closeHandler()
  }
  useEffect(() => {
    if (inputRef.current === null) return
    inputRef.current.focus()
    inputRef.current.select()
  }, [])
  return (
    <Modal show={show} onHide={hideHandler} centered>
      <Modal.Header closeButton>
        <Modal.Title>Введите новое имя канала</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={f.handleSubmit}>
          <InputGroup className="mb-3" hasValidation>
            <Form.Control
              ref={inputRef}
              value={f.values.name}
              onChange={f.handleChange}
              isInvalid={f.errors.name}
              name="name"
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {f.errors.name}
            </Form.Control.Feedback>
          </InputGroup>
          <FormGroup className="text-end">
            <Button type="submit" variant="primary" className="me-2">
              Переименовать
            </Button>
            <Button variant="secondary" onClick={hideHandler}>
              Отмена
            </Button>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default RenameChannelModal