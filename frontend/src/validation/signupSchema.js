import * as yup from 'yup'

export default (text) =>
  yup.object().shape({
    login: yup
      .string()
      .min(3, text.login?.min || 'Длина логина должна быть минимум 3 знака')
      .required(text.login?.required || 'Обязательное поле'),
    password: yup
      .string()
      .min(5, text.password?.min || 'Длина пароля должна быть минимум 5 знаков')
      .required(text.password?.required || 'Обязательное поле'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], text.confirmPassword || 'Пароли должны совпадать'),
  })
