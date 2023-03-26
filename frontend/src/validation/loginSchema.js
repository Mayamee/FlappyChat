import * as yup from 'yup'

const passwordRules = {
  regex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
  message:
    'Пароль должен содержать по крайней мере 1 букву нижнего регистра, 1 букву верхнего, 1 число и иметь длину как минимум 8 знаков',
}
export default yup.object().shape({
  login: yup.string().min(3, 'Длина логина должна быть минимум 3 знака').required(),
  password: yup
    .string()
    .min(8, 'Длина пароля должна быть минимум 8 знаков')
    .matches(passwordRules.regex, {
      message: passwordRules.message,
    })
    .required(),
})
