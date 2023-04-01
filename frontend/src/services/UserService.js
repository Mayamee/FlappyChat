import axios from 'axios'

const { REACT_APP_API_BASE_URL } = process.env
class UserService {
  constructor() {
    this.service = axios.create({
      baseURL: REACT_APP_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  getChannelsData = () => {
    return this.service.get('/data')
  }
}

export default new UserService()
