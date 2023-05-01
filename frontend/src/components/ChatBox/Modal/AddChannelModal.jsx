import { useFormik } from 'formik'
import { useEffect, useId, useRef } from 'react'
import { Button, Form, FormGroup, InputGroup, Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const AddChannelModal = ({
  show,
  onAction: doAction,
  onHide: closeHandler,
  onValidate: validateHandler,
}) => {
  const { t } = useTranslation()
  const inputRef = useRef(null)
  const f = useFormik({
    initialValues: {
      name: '',
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
  }, [show])
  const inputId = useId()

  const handleBlur = (e) => {
    const { value } = e.target
    e.target.value = value.trim().replace(/\s+/g, ' ')
    f.handleChange(e)
    f.handleBlur(e)
  }

  return (
    <Modal show={show} onHide={hideHandler} centered>
      <Modal.Header closeButton>
        <Modal.Title>{t('chatPage.modals.addModal.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form autoComplete="off" noValidate onSubmit={f.handleSubmit}>
          <InputGroup className="mb-3" hasValidation>
            <Form.Label className="visually-hidden" htmlFor={inputId}>
              Имя канала
            </Form.Label>
            <Form.Control
              ref={inputRef}
              id={inputId}
              value={f.values.name}
              onChange={f.handleChange}
              onBlur={handleBlur}
              isInvalid={f.errors.name}
              name="name"
            />
            <Form.Control.Feedback type="invalid" tooltip>
              {f.errors.name}
            </Form.Control.Feedback>
          </InputGroup>
          <FormGroup className="text-end">
            <Button type="submit" variant="primary" className="me-2">
              {t('chatPage.modals.addModal.buttons.submit')}
            </Button>
            <Button variant="secondary" onClick={hideHandler}>
              {t('chatPage.modals.addModal.buttons.cancel')}
            </Button>
          </FormGroup>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AddChannelModal
