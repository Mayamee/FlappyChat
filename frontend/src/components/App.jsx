import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from '@components/Layout/Layout'
import Chat from '@pages/Chat'
import Login from '@pages/Login'
import Signup from '@pages/Signup'
import Page404 from '@pages/404'

const App = () => {
  const isAuth = false
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="login" element={<Login />} />
          <Route path="signup" element={<Signup />} />
          <Route path="/" element={isAuth ? <Chat /> : <Navigate to="/login" replace />} />
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App
