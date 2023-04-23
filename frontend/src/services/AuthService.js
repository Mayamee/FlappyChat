import axios from 'axios'
import { API_URL } from '@/vars/api'

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  signup = (username, password) => {
    return this.service.post('/signup', {
      username,
      password,
    })
  }

  login = (username, password) => {
    return this.service.post('/login', { username, password })
  }
}

export default new AuthService()
