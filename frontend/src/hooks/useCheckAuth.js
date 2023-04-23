import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '@/redux/slices/authSlice'

const useCheckAuth = () => {
  const dispatch = useDispatch()
  const [isAuthChecked, setIsAuthChecked] = useState(false)
  useEffect(() => {
    const authData = localStorage.getItem('authData')
    if (authData) {
      const data = JSON.parse(authData)
      dispatch(login(data.username))
    }
    setIsAuthChecked(true)
  }, [])
  return isAuthChecked
}

export default useCheckAuth
