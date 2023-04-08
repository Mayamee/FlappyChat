import { useFormik } from 'formik'
import { useEffect, useRef } from 'react'
import { Button, Form, FormGroup, InputGroup, Modal } from 'react-bootstrap'

const AddChannelModal = ({ show, onAction: doAction, onHide: closeHandler }) => {
  const inputRef = useRef(null)
  const f = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: ({ name }) => {
      doAction(name)
      closeHandler()
    },
    validate: (values) => {
      const errors = {}
      if (values.name.length === 0) {
        errors.name = 'required'
      }
      return errors
    },
  })
  const hideHandler = () => {
    f.resetForm()
    closeHandler()
  }
  useEffect(() => {
    if (inputRef.current === null) return
    inputRef.current.focus()
  }, [show])
  return (
    <Modal show={show} onHide={hideHandler} centered>
      <Modal.Header closeButton>
        <Modal.Title>Введите имя канала</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form noValidate onSubmit={f.handleSubmit}>
          <InputGroup className="mb-3">
            <Form.Control
              ref={inputRef}
              value={f.values.name}
              onChange={f.handleChange}
              name="name"
            />
          </InputGroup>
          <FormGroup className="text-end">
            <Button type="submit" variant="primary" className="me-2">
              Добавить
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

export default AddChannelModal
