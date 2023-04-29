/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable functional/no-class */
/* eslint-disable functional/no-this-expression */
import axios from 'axios'
import { API_CONFIG } from '@/vars'

class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: API_CONFIG.API_PATH,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  signup = (username, password) =>
    this.service.post('/signup', {
      username,
      password,
    })

  login = (username, password) => this.service.post('/login', { username, password })
}

export default new AuthService()
