import { Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import Layout from '@/components/Layout/Layout'
import Chat from '@/pages/Chat'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import Page404 from '@/pages/404'
import { AuthRoute, PrivateRoute, useAuth } from '@/context/auth'

const App = () => {
  const { login } = useAuth()
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      login()
    }
  }, [])
  return (
    <Layout>
      <Routes>
        <Route
          path="login"
          element={
            <AuthRoute>
              <Login />
            </AuthRoute>
          }
        />
        <Route
          path="signup"
          element={
            <AuthRoute>
              <Signup />
            </AuthRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Chat />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </Layout>
  )
}

export default App
