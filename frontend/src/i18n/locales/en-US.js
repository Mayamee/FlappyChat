export default {
  translation: {
    layout: {
      brand: 'Flappy Chat',
      logoutButton: 'Logout',
    },
    notFoundPage: {
      title: 'Page not found',
      text: 'But you can go',
      link: 'on the main page',
    },
    chatPage: {
      toasts: {
        channelAdded: 'Channel {{name}} was successfully added',
        channelRemoved: 'Channel {{name}} was successfully removed',
        channelRenamed: 'Channel {{name}} was successfully renamed',
        sessionExpired: 'Your session has expired. Please log in again',
        fetchingError: 'Error while getting data from server',
      },
      error: {
        text: 'Something went wrong. Please reload the page or try again later.',
        button: 'Try again',
      },
      channels: {
        header: 'Channels',
        dropMenu: {
          remove: 'Delete',
          rename: 'Rename',
        },
      },
      messages: {
        header: {
          channelName: '{{name}}',
          messagesCounter_zero: 'No messages',
          messagesCounter_one: '{{count}} message',
          messagesCounter_other: '{{count}} messages',
        },
        body: {
          placeholder: 'No messages',
        },
        form: {
          placeholder: 'Enter message...',
        },
      },
      modals: {
        addModal: {
          header: 'Enter channel name',
          buttons: {
            submit: 'Add',
            cancel: 'Cancel',
          },
        },
        renameModal: {
          header: 'Enter new channel name',
          buttons: {
            submit: 'Rename',
            cancel: 'Cancel',
          },
        },
        removeModal: {
          header: 'Do you want to delete this channel?',
          body: 'Sure?',
          buttons: {
            submit: 'Delete',
            cancel: 'Cancel',
          },
        },
        errors: {
          emptyLength: 'Empty channel name is not allowed',
          minLength: 'Channel name must be at least 20 characters long',
          alreadyExist: 'Channel with this name already exists',
        },
      },
    },
    loginPage: {
      form: {
        title: 'Login',
        loginInput: {
          placeholder: 'Your username',
          errorText: {
            min: 'Username must be at least 3 characters long',
            max: 'Username must be less than 20 characters long',
            required: 'Field is required',
          },
        },
        passwordInput: {
          placeholder: 'Your password',
          errorText: {
            min: 'Password must be at least 5 characters long',
            max: 'Password must be less than 32 characters long',
            required: 'Field is required',
            authFailed: 'Incorrect username or password',
          },
        },
        submitButton: 'Login',
      },
      footer: {
        text: "Don't have an account?",
        link: 'Sign up',
      },
    },
    signupPage: {
      form: {
        title: 'Sign up',
        loginInput: {
          placeholder: 'Your username',
          errorText: {
            alreadyExist: 'User with this name already exists',
            min: 'Username must be at least 3 characters long',
            max: 'Username must be less than 20 characters long',
            required: 'Field is required',
          },
        },
        passwordInput: {
          placeholder: 'Your password',
          errorText: {
            min: 'Password must be at least 5 characters long',
            max: 'Password must be less than 32 characters long',
            required: 'Field is required',
          },
        },
        confirmPasswordInput: {
          placeholder: 'Confirm your password',
          errorText: 'Passwords do not match',
        },
        submitButton: 'Sign up',
      },
    },
  },
}
