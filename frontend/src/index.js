import { createRoot } from 'react-dom/client'
import init from './i18n/init'
import './index.scss'

const mountNode = document.getElementById('root')
const app = async () => {
  createRoot(mountNode).render(await init())
}

app()
