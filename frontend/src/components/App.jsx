import { Routes, Route } from 'react-router-dom'
import Layout from '@/components/Layout/Layout'
import Chat from '@/pages/Chat'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import Page404 from '@/pages/404'
import { AuthRoute, PrivateRoute } from '@/components/common/RouteGuards'
import useCheckAuth from '@/hooks/useCheckAuth'

const App = () => {
  const isAuthChecked = useCheckAuth()
  if (!isAuthChecked) return null
  return (
    <Layout>
      <Routes>
        <Route element={<AuthRoute />}>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
        </Route>
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<Chat />} />
        </Route>
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Layout>
  )
}

export default App
