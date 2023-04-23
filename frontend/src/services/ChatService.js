import axios from 'axios'

const { REACT_APP_API_BASE_URL } = process.env || '/api/v1'
class ChatService {
  constructor() {
    this.service = axios.create({
      baseURL: REACT_APP_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }

  getChannelsData = (token, signal) => {
    // disable caching
    return this.service.get(`/data?timestamp=${Date.now()}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      signal,
    })
  }
}

export default new ChatService()
