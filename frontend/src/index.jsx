import { createRoot } from 'react-dom/client'
import i18next from 'i18next'
import { I18nextProvider, initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { Provider as RollBarProvider, ErrorBoundary } from '@rollbar/react'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from '@/components/App'
import store from '@/redux/store'
import resources from '@/i18n'
import { ROLLBAR_CONFIG } from '@/vars'
import './index.scss'

const init = async () => {
  const i18n = i18next.createInstance()

  await i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      supportedLngs: ['en', 'ru'],
      fallbackLng: 'en',
      resources,
      detection: {
        order: ['cookie', 'localStorage', 'navigator', 'htmlTag', 'path', 'subdomain'],
        caches: ['cookie', 'localStorage'],
      },
    })
  return (
    <I18nextProvider i18n={i18n}>
      <ReduxProvider store={store}>
        <BrowserRouter>
          <RollBarProvider config={ROLLBAR_CONFIG}>
            <ErrorBoundary>
              <App />
            </ErrorBoundary>
          </RollBarProvider>
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
