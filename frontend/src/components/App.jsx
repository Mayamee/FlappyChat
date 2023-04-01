import { Routes, Route } from 'react-router-dom'
import Layout from '@components/Layout/Layout'
import Chat from '@pages/Chat'
import Login from '@pages/Login'
import Signup from '@pages/Signup'
import Page404 from '@pages/404'
import { PrivateRoute } from '@context/auth'
import { useEffect } from 'react'

const App = () => {
  useEffect(() => {}, [])
  return (
    <Layout>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
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
