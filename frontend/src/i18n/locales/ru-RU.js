export default {
  translation: {
    loginPage: {
      form: {
        title: 'Войти',
        loginInput: {
          placeholder: 'Ваш ник',
        },
        passwordInput: {
          placeholder: 'Ваш пароль',
          errorText: 'Неверный логин или пароль',
        },
        submitButton: 'Войти',
      },
      footer: {
        text: 'Нет аккаунта?',
        link: 'Регистрация',
      },
    },
    signupPage: {
      form: {
        title: 'Регистрация',
        loginInput: {
          placeholder: 'Имя пользователя',
          errorText: {
            min: 'Длина логина должна быть минимум 3 знака',
            required: 'Обязательное поле',
          },
        },
        passwordInput: {
          placeholder: 'Введите пароль',
          errorText: {
            min: 'Длина пароля должна быть минимум 5 знаков',
            required: 'Обязательное поле',
          },
        },
        confirmPasswordInput: {
          placeholder: 'Подтвердите пароль',
          errorText: 'Пароли должны совпадать',
        },
        submitButton: 'Зарегистрироваться',
      },
    },
  },
}
