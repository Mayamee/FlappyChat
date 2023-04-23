import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '@/redux/slices/authSlice'

const useCheckAuth = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const authData = localStorage.getItem('authData')
    if (authData) {
      const data = JSON.parse(authData)
      dispatch(login(data.username))
    }
  }, [])
}

export default useCheckAuth
