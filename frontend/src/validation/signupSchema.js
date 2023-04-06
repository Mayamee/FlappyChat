import * as yup from 'yup'

export default yup.object().shape({
  login: yup
    .string()
    .min(3, 'Длина логина должна быть минимум 3 знака')
    .required('Обязательное поле'),
  password: yup
    .string()
    .min(5, 'Длина пароля должна быть минимум 5 знаков')
    .required('Обязательное поле'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Пароли должны совпадать'),
})