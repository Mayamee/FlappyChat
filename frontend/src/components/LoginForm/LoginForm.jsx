import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { useRef, useState } from 'react'
import { useFormik } from 'formik'
import { FloatingLabel, Form, Button, Spinner } from 'react-bootstrap'
import AuthService from '@/services/AuthService'
import loginSchema from '@/validation/loginSchema'
import { login } from '@/redux/slices/authSlice'

const initialValues = {
  login: '',
  password: '',
}

const LoginForm = () => {
  const [authFailed, setAuthFailed] = useState(false)
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const loginRef = useRef(null)
  const onSubmitHandler = async (values, actions) => {
    try {
      const { data } = await AuthService.login(values.login, values.password)
      if (!data.token) throw new Error('No token in response')
      localStorage.setItem('authData', JSON.stringify(data))
      dispatch(login(data.username))
    } catch (err) {
      if (err.isAxiosError && err.response.status === 401) {
        const { current: loginInput } = loginRef
        if (loginInput) {
          loginInput.focus()
          loginInput.select()
        }
        setAuthFailed(true)
        return
      }
      throw err
    } finally {
      actions.setSubmitting(false)
    }
  }
  const f = useFormik({
    initialValues,
    onSubmit: onSubmitHandler,
    validationSchema: loginSchema({
      login: t('loginPage.form.loginInput.errorText', { returnObjects: true }),
      password: t('loginPage.form.passwordInput.errorText', { returnObjects: true }),
    }),
  })
  const handleChange = (e) => {
    const { value } = e.target
    e.target.value = value.replace(/\s/g, '')
    f.handleChange(e)
  }
  return (
    <Form onSubmit={f.handleSubmit} noValidate>
      <h1 className="text-center mb-3">{t('loginPage.form.title')}</h1>
      <Form.Group className="mb-3 position-relative">
        <FloatingLabel controlId="login" label={t('loginPage.form.loginInput.placeholder')}>
          <Form.Control
            ref={loginRef}
            value={f.values.login}
            onChange={handleChange}
            isInvalid={authFailed || f.errors.login}
            name="login"
            autoComplete="off"
            type="text"
            placeholder="0"
            required
          />
          {f.errors.login && (
            <Form.Control.Feedback type="invalid" tooltip>
              {f.errors.login}
            </Form.Control.Feedback>
          )}
        </FloatingLabel>
      </Form.Group>
      <Form.Group className="position-relative mb-3">
        <FloatingLabel controlId="password" label={t('loginPage.form.passwordInput.placeholder')}>
          <Form.Control
            value={f.values.password}
            onBlur={f.handleBlur}
            onChange={handleChange}
            name="password"
            isInvalid={authFailed || f.errors.password}
            autoComplete="off"
            type="password"
            placeholder="0"
            required
          />
          <Form.Control.Feedback type="invalid" tooltip>
            {f.errors.password
              ? f.errors.password
              : t('loginPage.form.passwordInput.errorText.authFailed')}
          </Form.Control.Feedback>
        </FloatingLabel>
      </Form.Group>
      <Button className="w-100" type="submit" variant="outline-primary" disabled={f.isSubmitting}>
        {f.isSubmitting && (
          <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
        )}
        {!f.isSubmitting && t('loginPage.form.submitButton')}
      </Button>
    </Form>
  )
}

export default LoginForm
