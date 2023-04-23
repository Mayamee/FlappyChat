import { ToastContainer, toast } from 'react-toastify'
import { Routes, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Layout from '@/components/Layout/Layout'
import Chat from '@/pages/Chat'
import Login from '@/pages/Login'
import Signup from '@/pages/Signup'
import Page404 from '@/pages/404'
import { AuthRoute, PrivateRoute } from '@/components/common/RouteGuards'
import { login } from '@/redux/slices/authSlice'

const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const authData = localStorage.getItem('authData')
    if (authData) {
      const data = JSON.parse(authData)
      dispatch(login(data.username))
    }
  }, [])
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
      <ToastContainer position={toast.POSITION.TOP_RIGHT} />
    </Layout>
  )
}

export default App
