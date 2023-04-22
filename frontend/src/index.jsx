import { createRoot } from 'react-dom/client'
import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from '@/components/App'
import store from '@/redux/store'
import resources from '@/i18n'
import './index.scss'
import 'react-toastify/dist/ReactToastify.min.css'

const init = async () => {
  const i18n = i18next.createInstance()

  await i18n.use(initReactI18next).init({
    fallbackLng: 'ru',
    resources,
  })

  return (
    <I18nextProvider i18n={i18n}>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ReduxProvider>
    </I18nextProvider>
  )
}

const mountNode = document.getElementById('root')
const app = async () => {
  createRoot(mountNode).render(await init())
}

app()
