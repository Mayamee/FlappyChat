import { Form as FormikForm, Formik } from 'formik'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import FloatingField from '@UI/Form/FloatingField/FloatingField'
import loginSchema from '@validation/loginSchema'
import ErrorFocus from '@components/common/ErrorFocus/ErrorFocus'
// import Debug from '@utils/Debug/Debug'

const initialValues = {
  login: '',
  password: '',
}

const LoginForm = () => {
  const onSubmitHandler = (values, actions) => {
    setTimeout(() => {
      console.log(JSON.stringify(values, null, 2))
      actions.setSubmitting(false)
      actions.resetForm()
    }, 3000)
  }
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmitHandler}
      validationSchema={loginSchema}
      initialErrors={{
        login: '',
        password: '',
      }}
    >
      {({ isSubmitting }) => (
        <FormikForm>
          <h1 className="text-center mb-3">Войти</h1>
          <Form.Group className="mb-3 position-relative">
            <FloatingField type="text" label="Ваш ник" name="login" required />
          </Form.Group>
          <Form.Group className="mb-3 position-relative">
            <FloatingField type="password" label="Введите пароль" name="password" required />
          </Form.Group>
          <Button className="w-100" type="submit" variant="outline-primary" disabled={isSubmitting}>
            {isSubmitting && (
              <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
            )}
            {!isSubmitting && 'Войти'}
          </Button>
          <ErrorFocus />
          {/* <Debug /> */}
        </FormikForm>
      )}
    </Formik>
  )
}

export default LoginForm
