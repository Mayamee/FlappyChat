export default {
  translation: {
    layout: {
      logoutButton: 'Выйти',
    },
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
            alreadyExsist: 'Пользователь с таким именем уже существует',
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
