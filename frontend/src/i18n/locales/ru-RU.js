export default {
  translation: {
    layout: {
      brand: 'Flappy Chat',
      logoutButton: 'Выйти',
    },
    notFoundPage: {
      title: 'Страница не найдена',
      text: 'Но вы можете перейти',
      link: 'на главную страницу',
    },
    chatPage: {
      toasts: {
        channelAdded: 'Канал {{name}} был успешно добавлен',
        channelRemoved: 'Канал {{name}} был успешно удален',
        channelRenamed: 'Канал {{name}} был успешно переименован',
        sessionExpired: 'Ваша сессия истекла. Пожалуйста, войдите заново',
        fetchingError: 'Ошибка при получении данных с сервера',
      },
      error: {
        text: 'Что то пошло не так. Перезагрузите страницу или повторите попытку позже.',
        button: 'Повторить попытку',
      },
      channels: {
        header: 'Каналы',
        dropMenu: {
          remove: 'Удалить',
          rename: 'Переименовать',
        },
      },
      messages: {
        header: {
          channelName: '{{name}}',
          messagesCounter_zero: 'Нет сообщений',
          messagesCounter_one: '{{count}} сообщение',
          messagesCounter_few: '{{count}} сообщения',
          messagesCounter_many: '{{count}} сообщений',
        },
        body: {
          placeholder: 'Нет сообщений',
        },
        form: {
          placeholder: 'Введите сообщение...',
        },
      },
      modals: {
        addModal: {
          header: 'Введите название канала',
          buttons: {
            submit: 'Добавить',
            cancel: 'Отмена',
          },
        },
        renameModal: {
          header: 'Введите новое название канала',
          buttons: {
            submit: 'Переименовать',
            cancel: 'Отмена',
          },
        },
        removeModal: {
          header: 'Вы действительно хотите удалить?',
          body: 'Удалить?',
          buttons: {
            submit: 'Удалить',
            cancel: 'Отмена',
          },
        },
        errors: {
          emptyLength: 'Пустое название канала',
          minLength: 'Название канала не должно превышать 20 символов',
          alreadyExist: 'Название канала не должно превышать 20 символов',
        },
      },
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
            alreadyExist: 'Пользователь с таким именем уже существует',
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
