import { useFormik } from 'formik'
import { useEffect } from 'react'
import { Button, InputGroup, Form } from 'react-bootstrap'
import { SendPlus } from 'react-bootstrap-icons'
import { useTranslation } from 'react-i18next'
import { MESSAGE_LIMIT } from '@/vars'

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
  useEffect(() => {
    const enterPressHandler = (e) => {
      if (e.key === 'Enter') {
        formik.handleSubmit()
      }
    }
    document.addEventListener('keydown', enterPressHandler)
    return () => {
      document.removeEventListener('keydown', enterPressHandler)
    }
  }, [formik])

  const handleChangeMessage = (e) => {
    if (e.target.value.length > MESSAGE_LIMIT) return
    formik.handleChange(e)
  }

  return (
    <Form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
      <InputGroup>
        <Form.Control
          placeholder={t('chatPage.messages.form.placeholder')}
          aria-label="Новое сообщение"
          aria-describedby="submit-message"
          value={formik.values.message}
          name="message"
          onChange={handleChangeMessage}
        />
        <Button type="submit" className="btn-group-vertical" variant="primary" id="submit-message">
          <SendPlus className="p-0" />
        </Button>
      </InputGroup>
    </Form>
  )
}

export default MessageForm
