import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import { useRef, useState } from 'react'
import { Form as FormikForm, Formik } from 'formik'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import AuthService from '@/services/AuthService'
import loginSchema from '@/validation/loginSchema'
import { login } from '@/redux/slices/authSlice'

const initialValues = {
  login: '',
  password: '',
}

const LoginForm = () => {
  const [authFailed, setAuthFailed] = useState(false)
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
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmitHandler} validationSchema={loginSchema}>
      {({ values, handleBlur, handleChange, isSubmitting }) => (
        <FormikForm>
          <h1 className="text-center mb-3">Войти</h1>
          <Form.Group className="mb-3">
            <FloatingLabel controlId="login" label="Ваш ник">
              <Form.Control
                ref={loginRef}
                value={values.login}
                onBlur={handleBlur}
                onChange={handleChange}
                isInvalid={authFailed}
                name="login"
                autoComplete="off"
                type="text"
                placeholder="0"
                required
              />
            </FloatingLabel>
          </Form.Group>
          <Form.Group
            className={clsx('position-relative', {
              'mb-3': !authFailed,
              'mb-5': authFailed,
            })}
          >
            <FloatingLabel controlId="password" label="Введите пароль">
              <Form.Control
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                name="password"
                isInvalid={authFailed}
                autoComplete="off"
                type="password"
                placeholder="0"
                required
              />
              <Form.Control.Feedback type="invalid" tooltip>
                Неверный логин или пароль
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Button className="w-100" type="submit" variant="outline-primary" disabled={isSubmitting}>
            {isSubmitting && (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            )}
            {!isSubmitting && 'Войти'}
          </Button>
        </FormikForm>
      )}
    </Formik>
  )
}

export default LoginForm
