import { useDispatch } from 'react-redux'
import { useRef } from 'react'
import { Form as FormikForm, Formik } from 'formik'
import FloatingLabel from 'react-bootstrap/FloatingLabel'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import signupSchema from '@/validation/signupSchema'
import AuthService from '@/services/AuthService'
import { login } from '@/redux/slices/authSlice'

const initialValues = {
  login: '',
  password: '',
  confirmPassword: '',
}

const SignupForm = () => {
  const loginRef = useRef(null)
  const dispatch = useDispatch()
  const onSubmitHandler = async (values, actions) => {
    try {
      const { data } = await AuthService.signup(values.login, values.password)
      if (!data.token) throw new Error('No token in response')
      localStorage.setItem('authData', JSON.stringify(data))
      dispatch(login(data.username))
    } catch (err) {
      if (err.isAxiosError && err.response.status === 409) {
        actions.setFieldError('login', 'Пользователь с таким именем уже существует')
        const { current: loginInput } = loginRef
        if (loginInput) {
          loginInput.focus()
          loginInput.select()
        }
        return
      }
      throw err
    } finally {
      actions.setSubmitting(false)
    }
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmitHandler}
      validationSchema={signupSchema}
    >
      {({ values, errors, touched, handleBlur, handleChange, isSubmitting }) => (
        <FormikForm>
          <h1 className="text-center mb-3">Регистрация</h1>
          <Form.Group className="mb-3">
            <FloatingLabel controlId="login" label="Имя пользователя">
              <Form.Control
                ref={loginRef}
                value={values.login}
                onBlur={handleBlur}
                onChange={handleChange}
                isInvalid={touched.login && errors.login}
                name="login"
                autoComplete="off"
                type="text"
                placeholder="0"
                required
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.login}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3 position-relative">
            <FloatingLabel controlId="password" label="Введите пароль">
              <Form.Control
                value={values.password}
                onBlur={handleBlur}
                onChange={handleChange}
                name="password"
                isInvalid={touched.password && errors.password}
                autoComplete="off"
                type="password"
                placeholder="0"
                required
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.password}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Form.Group className="mb-3 position-relative">
            <FloatingLabel controlId="password" label="Подтвердите пароль">
              <Form.Control
                value={values.confirmPassword}
                onBlur={handleBlur}
                onChange={handleChange}
                name="confirmPassword"
                isInvalid={touched.confirmPassword && errors.confirmPassword}
                autoComplete="off"
                type="password"
                placeholder="0"
                required
              />
              <Form.Control.Feedback type="invalid" tooltip>
                {errors.confirmPassword}
              </Form.Control.Feedback>
            </FloatingLabel>
          </Form.Group>
          <Button className="w-100" type="submit" variant="outline-primary" disabled={isSubmitting}>
            {isSubmitting && (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            )}
            {!isSubmitting && 'Зарегистрироваться'}
          </Button>
        </FormikForm>
      )}
    </Formik>
  )
}

export default SignupForm
