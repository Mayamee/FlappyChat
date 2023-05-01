/* eslint-disable implicit-arrow-linebreak */
import * as yup from 'yup'

export default (text = {}) =>
  yup.object().shape({
    login: yup
      .string()
      .min(3, text.login?.min || 'Длина логина должна быть минимум 3 знака')
      .max(20, text.login?.max || 'Длина логина должна быть максимум 20 знаков')
      .required(text.login?.required || 'Обязательное поле'),
    password: yup
      .string()
      .min(6, text.password?.min || 'Длина пароля должна быть минимум 6 знаков')
      .max(32, text.password?.max || 'Длина пароля должна быть максимум 32 знака')
      .required(text.password?.required || 'Обязательное поле'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], text.confirmPassword || 'Пароли должны совпадать'),
  })
