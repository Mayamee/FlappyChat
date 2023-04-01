import axios from 'axios'

const { REACT_APP_API_BASE_URL } = process.env
class AuthService {
  constructor() {
    this.service = axios.create({
      baseURL: REACT_APP_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  signup = (username, password) => {
    return this.service.post('/signup', {
      data: {
        username,
        password,
      },
    })
  }

  login = (username, password) => {
    return this.service.post('/login', {
      data: {
        username,
        password,
      },
    })
  }
}

export default new AuthService()
