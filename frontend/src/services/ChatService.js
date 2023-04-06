import axios from 'axios'

const { REACT_APP_API_BASE_URL } = process.env
class ChatService {
  constructor() {
    this.service = axios.create({
      baseURL: REACT_APP_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  getChannelsData = (token) => {
    return this.service.get('/data', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }
}

export default new ChatService()
