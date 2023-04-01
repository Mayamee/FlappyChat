import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '@context/auth'

const Provider = ({ children }) => (
  <BrowserRouter>
    <AuthProvider>{children}</AuthProvider>
  </BrowserRouter>
)

export default Provider
