import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import App from '@components/App'
import Provider from '@components/Provider'
import resources from './locales'

const init = async () => {
  const i18n = i18next.createInstance()

  await i18n.use(initReactI18next).init({
    resources,
    fallbackLng: 'ru',
  })

  return (
    <I18nextProvider i18n={i18n}>
      <Provider>
        <App />
      </Provider>
    </I18nextProvider>
  )
}

export default init
