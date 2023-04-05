import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { AuthProvider } from '@/context/auth'
import store from '@/redux/store'

const Provider = ({ children }) => (
  <ReduxProvider store={store}>
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  </ReduxProvider>
)

export default Provider
