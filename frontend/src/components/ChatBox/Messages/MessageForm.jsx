import { useFormik } from 'formik'
import { Button, InputGroup, Form } from 'react-bootstrap'
import { SendPlus } from 'react-bootstrap-icons'
import { useTranslation } from 'react-i18next'

const MessageForm = ({ onSubmit: submitHandler }) => {
  const { t } = useTranslation()
  const formik = useFormik({
    initialValues: {
      message: '',
    },
    initialErrors: {
      message: 'required',
    },
    validate: (values) => {
      const errors = {}
      if (values.message.length === 0) {
        errors.message = 'required'
      }
      return errors
    },
    onSubmit: ({ message }, actions) => {
      submitHandler(message)
      actions.resetForm()
    },
  })
  return (
    <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
      <InputGroup>
        <Form.Control
          placeholder={t('chatPage.messages.form.placeholder')}
          aria-label="message"
          aria-describedby="submit-message"
          value={formik.values.message}
          name="message"
          onChange={formik.handleChange}
        />
        <Button type="submit" className="btn-group-vertical" variant="primary" id="submit-message">
          <SendPlus className="p-0" />
        </Button>
      </InputGroup>
    </Form>
  )
}

export default MessageForm
